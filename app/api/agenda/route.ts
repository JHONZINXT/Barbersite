import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

/**
 * Proteção simples por código compartilhado — adequada pra uma barbearia
 * pequena olhar a própria agenda, mas NÃO é autenticação de verdade (não
 * distingue quem é cada barbeiro, é só uma trava de acesso). Se crescer,
 * trocar por login de verdade (ex: Supabase Auth).
 */
export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { code } = body ?? {};
  const expected = process.env.AGENDA_ACCESS_CODE;

  if (!expected) {
    return NextResponse.json({ error: "Acesso à agenda ainda não configurado." }, { status: 503 });
  }
  if (code !== expected) {
    return NextResponse.json({ error: "Código incorreto." }, { status: 401 });
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch {
    return NextResponse.json({ error: "Agendamento online ainda não configurado." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("appointments")
    .select("id, barber_slug, service_slug, customer_name, customer_phone, start_at, end_at, status")
    .eq("status", "confirmed")
    .gte("start_at", new Date().toISOString())
    .order("start_at", { ascending: true })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: "Erro ao consultar a agenda." }, { status: 500 });
  }

  const enriched = (data ?? []).map((a) => ({
    ...a,
    barber_name: siteConfig.barbers.find((b) => b.slug === a.barber_slug)?.name ?? a.barber_slug,
    service_name: siteConfig.services.find((s) => s.slug === a.service_slug)?.name ?? a.service_slug,
  }));

  return NextResponse.json({ appointments: enriched });
}

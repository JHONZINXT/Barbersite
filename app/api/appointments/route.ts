import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/config";
import { toRecifeDate } from "@/lib/timezone";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { barber: barberSlug, service: serviceSlug, date: dateStr, time: timeStr, name, phone } = body ?? {};

  if (!barberSlug || !serviceSlug || !dateStr || !timeStr || !name || !phone) {
    return NextResponse.json({ error: "Preencha todos os campos." }, { status: 400 });
  }
  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Informe um nome válido." }, { status: 400 });
  }
  if (typeof phone !== "string" || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Informe um WhatsApp válido, com DDD." }, { status: 400 });
  }

  const service = siteConfig.services.find((s) => s.slug === serviceSlug);
  const barber = siteConfig.barbers.find((b) => b.slug === barberSlug);
  if (!service || !barber) {
    return NextResponse.json({ error: "Barbeiro ou serviço inválido." }, { status: 400 });
  }

  const startAt = toRecifeDate(dateStr, timeStr);
  const endAt = new Date(startAt.getTime() + service.durationMinutes * 60_000);

  const earliestAllowed = Date.now() + siteConfig.booking.minLeadMinutes * 60_000;
  if (startAt.getTime() < earliestAllowed) {
    return NextResponse.json(
      { error: "Esse horário não atende mais a antecedência mínima. Escolha outro." },
      { status: 400 }
    );
  }

  const maxAllowed = Date.now() + siteConfig.booking.maxAdvanceDays * 24 * 60 * 60_000;
  if (startAt.getTime() > maxAllowed) {
    return NextResponse.json({ error: "Essa data está fora do período permitido pra agendar." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch {
    return NextResponse.json({ error: "Agendamento online ainda não configurado." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      barber_slug: barberSlug,
      service_slug: serviceSlug,
      customer_name: name.trim(),
      customer_phone: phone.replace(/\D/g, ""),
      start_at: startAt.toISOString(),
      end_at: endAt.toISOString(),
    })
    .select()
    .single();

  if (error) {
    // 23P01 = violação da restrição de exclusão (choque de horário) — o banco
    // pegou uma corrida entre dois clientes agendando o mesmo horário ao mesmo tempo.
    if ((error as any).code === "23P01") {
      return NextResponse.json(
        { error: "Esse horário acabou de ser reservado por outra pessoa. Escolha outro horário." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Não foi possível confirmar o agendamento." }, { status: 500 });
  }

  return NextResponse.json({ appointment: data });
}

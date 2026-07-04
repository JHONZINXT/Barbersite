import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { generateSlots } from "@/lib/booking";
import { siteConfig } from "@/lib/config";
import { toRecifeDate, weekdayOf } from "@/lib/timezone";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const barberSlug = searchParams.get("barber");
  const serviceSlug = searchParams.get("service");
  const dateStr = searchParams.get("date");

  if (!barberSlug || !serviceSlug || !dateStr) {
    return NextResponse.json({ error: "Parâmetros obrigatórios: barber, service, date." }, { status: 400 });
  }

  const service = siteConfig.services.find((s) => s.slug === serviceSlug);
  const barber = siteConfig.barbers.find((b) => b.slug === barberSlug);
  if (!service || !barber) {
    return NextResponse.json({ error: "Barbeiro ou serviço inválido." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch (e) {
    return NextResponse.json({ error: "Agendamento online ainda não configurado." }, { status: 503 });
  }

  const weekday = weekdayOf(dateStr);

  const { data: hours, error: hoursError } = await supabase
    .from("barber_hours")
    .select("start_time, end_time")
    .eq("barber_slug", barberSlug)
    .eq("weekday", weekday);

  if (hoursError) {
    return NextResponse.json({ error: "Erro ao consultar horários de trabalho." }, { status: 500 });
  }
  if (!hours || hours.length === 0) {
    return NextResponse.json({ slots: [] });
  }

  const dayStart = toRecifeDate(dateStr, "00:00");
  const dayEnd = toRecifeDate(dateStr, "23:59:59");

  const { data: appointments } = await supabase
    .from("appointments")
    .select("start_at, end_at")
    .eq("barber_slug", barberSlug)
    .eq("status", "confirmed")
    .lte("start_at", dayEnd.toISOString())
    .gte("end_at", dayStart.toISOString());

  const { data: timeOff } = await supabase
    .from("barber_time_off")
    .select("start_at, end_at")
    .eq("barber_slug", barberSlug)
    .lte("start_at", dayEnd.toISOString())
    .gte("end_at", dayStart.toISOString());

  const busy = [
    ...(appointments ?? []).map((a) => ({ start: new Date(a.start_at), end: new Date(a.end_at) })),
    ...(timeOff ?? []).map((t) => ({ start: new Date(t.start_at), end: new Date(t.end_at) })),
  ];

  let allSlots: Date[] = [];
  for (const h of hours as { start_time: string; end_time: string }[]) {
    const workStart = toRecifeDate(dateStr, h.start_time);
    const workEnd = toRecifeDate(dateStr, h.end_time);
    allSlots = allSlots.concat(
      generateSlots({
        workStart,
        workEnd,
        durationMinutes: service.durationMinutes,
        granularityMinutes: siteConfig.booking.slotGranularityMinutes,
        busy,
        now: new Date(),
        minLeadMinutes: siteConfig.booking.minLeadMinutes,
      })
    );
  }

  allSlots.sort((a, b) => a.getTime() - b.getTime());

  return NextResponse.json({ slots: allSlots.map((s) => s.toISOString()) });
}

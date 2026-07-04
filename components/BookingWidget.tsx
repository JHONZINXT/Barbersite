"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/config";
import { formatRecifeDateLabel, formatRecifeTime, nextDates } from "@/lib/timezone";

type Step = "barber" | "service" | "date" | "time" | "details" | "success" | "error";

export default function BookingWidget() {
  const [step, setStep] = useState<Step>("barber");
  const [barberSlug, setBarberSlug] = useState<string | null>(null);
  const [serviceSlug, setServiceSlug] = useState<string | null>(null);
  const [dateStr, setDateStr] = useState<string | null>(null);
  const [timeIso, setTimeIso] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slots, setSlots] = useState<string[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dates = useMemo(() => nextDates(siteConfig.booking.maxAdvanceDays), []);
  const barber = siteConfig.barbers.find((b) => b.slug === barberSlug);
  const service = siteConfig.services.find((s) => s.slug === serviceSlug);

  useEffect(() => {
    if (step !== "time" || !barberSlug || !serviceSlug || !dateStr) return;
    setLoadingSlots(true);
    setSlots(null);
    fetch(`/api/availability?barber=${barberSlug}&service=${serviceSlug}&date=${dateStr}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [step, barberSlug, serviceSlug, dateStr]);

  async function confirmBooking() {
    if (!barberSlug || !serviceSlug || !dateStr || !timeIso) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const timeStr = new Date(timeIso).toLocaleTimeString("en-GB", { timeZone: "America/Recife", hour: "2-digit", minute: "2-digit" });
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barber: barberSlug, service: serviceSlug, date: dateStr, time: timeStr, name, phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Não foi possível confirmar.");
        setStep("error");
        return;
      }
      setStep("success");
    } catch {
      setErrorMsg("Falha de conexão. Tente novamente.");
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep("barber");
    setBarberSlug(null);
    setServiceSlug(null);
    setDateStr(null);
    setTimeIso(null);
    setName("");
    setPhone("");
    setSlots(null);
    setErrorMsg(null);
  }

  const stepOrder: Step[] = ["barber", "service", "date", "time", "details"];
  const currentIndex = stepOrder.indexOf(step);

  return (
    <div className="max-w-xl mx-auto bg-card border border-amber/15 rounded-2xl p-5 md:p-7 text-left">
      {currentIndex >= 0 && (
        <div className="flex gap-1.5 mb-6">
          {stepOrder.map((s, i) => (
            <div key={s} className={`h-1 flex-1 rounded-full ${i <= currentIndex ? "bg-amber" : "bg-cream/10"}`} />
          ))}
        </div>
      )}

      {step === "barber" && (
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-amber mb-4">1. Escolha o profissional</p>
          <div className="flex flex-col gap-3">
            {siteConfig.barbers.map((b) => (
              <button
                key={b.slug}
                onClick={() => {
                  setBarberSlug(b.slug);
                  setStep("service");
                }}
                className="min-h-[64px] flex items-center gap-4 text-left px-4 rounded-xl border border-amber/15 hover:border-amber/50 active:scale-[0.99] transition-all"
              >
                <div className="w-11 h-11 rounded-full shrink-0" style={{ background: "conic-gradient(from 0deg, #E8942C, #F5B45C, #2A1E16, #E8942C)" }} />
                <div>
                  <div className="font-semibold text-sm">{b.name}</div>
                  <div className="text-xs opacity-60">{b.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "service" && (
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-amber mb-4">2. Escolha o serviço</p>
          <div className="flex flex-col gap-2">
            {siteConfig.services.map((s) => (
              <button
                key={s.slug}
                onClick={() => {
                  setServiceSlug(s.slug);
                  setStep("date");
                }}
                className="min-h-[56px] flex items-center justify-between text-left px-4 rounded-xl border border-amber/15 hover:border-amber/50 active:scale-[0.99] transition-all"
              >
                <div>
                  <div className="font-semibold text-sm">{s.name}</div>
                  <div className="text-xs opacity-60">{s.durationMinutes} min</div>
                </div>
                <div className="font-display text-amber text-lg">{s.price}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep("barber")} className="mt-4 text-xs font-mono uppercase tracking-wide opacity-60">
            ← Voltar
          </button>
        </div>
      )}

      {step === "date" && (
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-amber mb-4">3. Escolha o dia</p>
          <div className="grid grid-cols-3 gap-2">
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDateStr(d);
                  setStep("time");
                }}
                className="min-h-[56px] flex flex-col items-center justify-center rounded-xl border border-amber/15 hover:border-amber/50 active:scale-[0.97] transition-all text-xs"
              >
                {formatRecifeDateLabel(new Date(`${d}T12:00:00-03:00`))}
              </button>
            ))}
          </div>
          <button onClick={() => setStep("service")} className="mt-4 text-xs font-mono uppercase tracking-wide opacity-60">
            ← Voltar
          </button>
        </div>
      )}

      {step === "time" && (
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-amber mb-4">4. Escolha o horário</p>
          {loadingSlots && <p className="text-sm opacity-60">Consultando horários livres...</p>}
          {!loadingSlots && slots && slots.length === 0 && (
            <p className="text-sm opacity-70">Sem horários livres nesse dia. Volte e escolha outra data.</p>
          )}
          {!loadingSlots && slots && slots.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {slots.map((iso) => (
                <button
                  key={iso}
                  onClick={() => {
                    setTimeIso(iso);
                    setStep("details");
                  }}
                  className="min-h-[48px] rounded-lg border border-amber/15 hover:border-amber/50 active:scale-[0.96] transition-all text-sm font-mono"
                >
                  {formatRecifeTime(new Date(iso))}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setStep("date")} className="mt-4 text-xs font-mono uppercase tracking-wide opacity-60">
            ← Voltar
          </button>
        </div>
      )}

      {step === "details" && (
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-amber mb-4">5. Seus dados</p>
          <div className="rounded-xl bg-ink/40 border border-amber/10 p-4 mb-4 text-sm">
            <div><span className="opacity-60">Profissional:</span> {barber?.name}</div>
            <div><span className="opacity-60">Serviço:</span> {service?.name} ({service?.price})</div>
            <div><span className="opacity-60">Quando:</span> {dateStr && formatRecifeDateLabel(new Date(`${dateStr}T12:00:00-03:00`))} às {timeIso && formatRecifeTime(new Date(timeIso))}</div>
          </div>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full min-h-[48px] rounded-lg bg-ink/40 border border-amber/15 px-4 mb-3 text-sm outline-none focus:border-amber"
          />
          <input
            type="tel"
            placeholder="WhatsApp com DDD"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full min-h-[48px] rounded-lg bg-ink/40 border border-amber/15 px-4 mb-4 text-sm outline-none focus:border-amber"
          />
          {errorMsg && <p className="text-xs text-red-400 mb-3">{errorMsg}</p>}
          <button
            onClick={confirmBooking}
            disabled={submitting || name.trim().length < 2 || phone.replace(/\D/g, "").length < 10}
            className="w-full min-h-[50px] rounded-lg bg-amber text-ink font-extrabold text-sm uppercase tracking-wide disabled:opacity-40 active:scale-[0.98] transition-transform"
          >
            {submitting ? "Confirmando..." : "Confirmar agendamento"}
          </button>
          <button onClick={() => setStep("time")} className="mt-4 text-xs font-mono uppercase tracking-wide opacity-60">
            ← Voltar
          </button>
        </div>
      )}

      {step === "success" && (
        <div className="text-center py-4">
          <div className="text-2xl mb-3">✓</div>
          <p className="font-display uppercase text-xl mb-2">Agendado!</p>
          <p className="text-sm opacity-70 mb-6">
            {service?.name} com {barber?.name} — {dateStr && formatRecifeDateLabel(new Date(`${dateStr}T12:00:00-03:00`))} às {timeIso && formatRecifeTime(new Date(timeIso))}.
          </p>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              `Olá! Acabei de agendar ${service?.name} com ${barber?.name} no site, para ${dateStr && formatRecifeDateLabel(new Date(`${dateStr}T12:00:00-03:00`))} às ${timeIso && formatRecifeTime(new Date(timeIso))}. Meu nome é ${name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center px-6 rounded-lg bg-ink text-cream border border-amber/30 text-sm font-semibold"
          >
            Confirmar também no WhatsApp
          </a>
          <div>
            <button onClick={reset} className="mt-5 text-xs font-mono uppercase tracking-wide opacity-60">
              Fazer outro agendamento
            </button>
          </div>
        </div>
      )}

      {step === "error" && (
        <div className="text-center py-4">
          <p className="font-display uppercase text-xl mb-2">Ops</p>
          <p className="text-sm opacity-70 mb-6">{errorMsg}</p>
          <button
            onClick={() => setStep("time")}
            className="min-h-[48px] px-6 rounded-lg bg-amber text-ink font-extrabold text-sm uppercase tracking-wide"
          >
            Escolher outro horário
          </button>
        </div>
      )}
    </div>
  );
}

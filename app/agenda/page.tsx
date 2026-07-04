"use client";

import { useState } from "react";

type Appointment = {
  id: string;
  barber_name: string;
  service_name: string;
  customer_name: string;
  customer_phone: string;
  start_at: string;
  end_at: string;
};

export default function AgendaPage() {
  const [code, setCode] = useState("");
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erro ao carregar.");
        return;
      }
      setAppointments(data.appointments);
    } catch {
      setError("Falha de conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ background: "#14100C", color: "#F3EADE", minHeight: "100vh", padding: "60px 20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, marginBottom: 24 }}>Agenda</h1>

        {!appointments && (
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="password"
              placeholder="Código de acesso"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ flex: 1, minHeight: 44, borderRadius: 8, border: "1px solid rgba(232,148,44,.3)", background: "rgba(255,255,255,.05)", color: "#F3EADE", padding: "0 14px" }}
            />
            <button
              onClick={load}
              disabled={loading || !code}
              style={{ minHeight: 44, padding: "0 20px", borderRadius: 8, background: "#E8942C", color: "#14100C", fontWeight: 700, border: "none" }}
            >
              {loading ? "..." : "Entrar"}
            </button>
          </div>
        )}

        {error && <p style={{ color: "#f09595", marginTop: 14 }}>{error}</p>}

        {appointments && (
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {appointments.length === 0 && <p style={{ opacity: 0.6 }}>Nenhum agendamento futuro.</p>}
            {appointments.map((a) => (
              <div key={a.id} style={{ border: "1px solid rgba(232,148,44,.15)", borderRadius: 10, padding: 14, background: "#2A1E16" }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>
                  {new Date(a.start_at).toLocaleString("pt-BR", { timeZone: "America/Recife", weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </div>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>
                  {a.service_name} com {a.barber_name}
                </div>
                <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>
                  {a.customer_name} · {a.customer_phone}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

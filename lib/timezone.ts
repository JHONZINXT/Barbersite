import { siteConfig } from "./config";

// Recife (PE) não observa horário de verão desde 2019 — um offset fixo é
// seguro o ano inteiro e evita o bug clássico de servidor rodando em UTC
// interpretar "09:00" como um horário diferente do pretendido.
const OFFSET = siteConfig.booking.utcOffset;

/** Converte uma data (YYYY-MM-DD) e hora (HH:mm ou HH:mm:ss) locais de Recife num Date correto, independente do fuso do servidor. */
export function toRecifeDate(dateStr: string, timeStr: string): Date {
  const normalizedTime = timeStr.length === 5 ? `${timeStr}:00` : timeStr;
  return new Date(`${dateStr}T${normalizedTime}${OFFSET}`);
}

/** Formata um Date (UTC internamente) como horário local de Recife, ex: "14:30". */
export function formatRecifeTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", {
    timeZone: "America/Recife",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Formata um Date como data local de Recife, ex: "seg., 7 de jul." */
export function formatRecifeDateLabel(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    timeZone: "America/Recife",
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** Retorna o dia da semana (0=domingo..6=sábado) de uma data YYYY-MM-DD, no fuso de Recife. */
export function weekdayOf(dateStr: string): number {
  return toRecifeDate(dateStr, "12:00").getDay();
}

/** Gera as próximas N datas (YYYY-MM-DD) a partir de hoje, no fuso de Recife. */
export function nextDates(count: number): string[] {
  const dates: string[] = [];
  const now = new Date();
  const todayRecife = now.toLocaleDateString("en-CA", { timeZone: "America/Recife" }); // YYYY-MM-DD
  const [y, m, d] = todayRecife.split("-").map(Number);
  const base = new Date(Date.UTC(y, m - 1, d));
  for (let i = 0; i < count; i++) {
    const dt = new Date(base);
    dt.setUTCDate(dt.getUTCDate() + i);
    dates.push(dt.toISOString().slice(0, 10));
  }
  return dates;
}

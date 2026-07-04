export type TimeRange = { start: Date; end: Date };

type GenerateSlotsInput = {
  workStart: Date;
  workEnd: Date;
  durationMinutes: number;
  granularityMinutes: number;
  busy: TimeRange[];
  now: Date;
  minLeadMinutes: number;
};

/**
 * Gera os horários de início possíveis dentro de uma janela de trabalho,
 * respeitando: duração do serviço, conflito com horários já ocupados
 * (agendamentos + bloqueios de folga), e antecedência mínima a partir de agora.
 *
 * Função pura — sem I/O, sem banco, sem fuso horário embutido (os Dates de
 * entrada já devem vir corretos). Isso permite testar a regra isoladamente.
 */
export function generateSlots({
  workStart,
  workEnd,
  durationMinutes,
  granularityMinutes,
  busy,
  now,
  minLeadMinutes,
}: GenerateSlotsInput): Date[] {
  const slots: Date[] = [];
  const earliestStart = new Date(now.getTime() + minLeadMinutes * 60_000);
  const durationMs = durationMinutes * 60_000;
  const stepMs = granularityMinutes * 60_000;

  let cursor = new Date(workStart);

  while (cursor.getTime() + durationMs <= workEnd.getTime()) {
    const slotStart = new Date(cursor);
    const slotEnd = new Date(cursor.getTime() + durationMs);

    const overlapsBusy = busy.some((b) => slotStart < b.end && slotEnd > b.start);
    const isFarEnoughAhead = slotStart.getTime() >= earliestStart.getTime();

    if (!overlapsBusy && isFarEnoughAhead) {
      slots.push(slotStart);
    }

    cursor = new Date(cursor.getTime() + stepMs);
  }

  return slots;
}

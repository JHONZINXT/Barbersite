type PhotoSlotProps = {
  label: string;
  className?: string;
};

// Espaço reservado pra foto real. Quando a imagem estiver pronta,
// troque o <div> por um <Image src="/caminho.jpg" fill alt="..." />
// do next/image, mantendo a mesma div pai (ela já define proporção e cantos).
export default function PhotoSlot({ label, className = "" }: PhotoSlotProps) {
  return (
    <div
      className={`relative flex items-center justify-center text-center border-[1.5px] border-dashed border-amber/50 text-cream/50 font-mono text-[11px] uppercase tracking-wide leading-relaxed p-3 overflow-hidden ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(232,148,44,0.08) 0 10px, transparent 10px 20px)",
        backgroundColor: "#2A1E16",
      }}
    >
      <span>{label}</span>
    </div>
  );
}

import Image from "next/image";
import PhotoSlot from "./PhotoSlot";

type SlotImageProps = {
  src?: string;
  alt: string;
  placeholderLabel: string;
  className?: string;
  priority?: boolean;
};

export default function SlotImage({ src, alt, placeholderLabel, className = "", priority = false }: SlotImageProps) {
  if (!src) {
    return <PhotoSlot label={placeholderLabel} className={className} />;
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" priority={priority} />
    </div>
  );
}

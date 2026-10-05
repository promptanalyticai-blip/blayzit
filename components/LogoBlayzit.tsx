// components/LogoBlayzit.tsx
import Image from "next/image";

export default function LogoBlayzit() {
  return (
    <Image
      src="/blayzit/blayzit-logo.png"
      alt="BLAYZIT Logo"
      className="logo-inside-card"
      width={150}
      height={150}
      priority
    />
  );
}

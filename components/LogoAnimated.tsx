///components/LogoAnimated.tsx
import Image from "next/image";

export default function LogoAnimated() {
  return (
    <div className="logo-container animated-logo">
      <Image
        src="/blayzit/blayzit-logo.png"
        alt="BLAYZIT Logo"
        className="logo-inside-card"
        width={260}
        height={260}
        priority
      />
    </div>
  );
}

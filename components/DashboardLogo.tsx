//components/DashboardLogo.tsx
import Image from "next/image";

export default function DashboardLogo() {
  return (
    <div className="dashboard-logo">
      <Image
        src="/blayzit/blayzit-logo.png"
        alt="BLAYZIT Logo"
        width={140}
        height={40}
        priority
      />
    </div>
  );
}

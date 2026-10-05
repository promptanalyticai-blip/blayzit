//components/RouteTransition.tsx
import { useEffect, useState } from "react";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, [children]);

  return (
    <div className={`route-transition ${visible ? "route-transition-visible" : ""}`}>
      {children}
    </div>
  );
}

//components/DashboardModal.tsx
"use client";

import { useEffect } from "react";

interface DashboardModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function DashboardModal({ open, onClose, title, children }: DashboardModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="dashboard-modal-overlay" onClick={onClose}>
      <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
        {title && <h3 className="dashboard-modal-title">{title}</h3>}
        <div className="dashboard-modal-body">{children}</div>
        <button className="dashboard-modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

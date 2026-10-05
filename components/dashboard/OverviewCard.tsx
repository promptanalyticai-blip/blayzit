//components/dashboard/OverviewCard.tsx
"use client";

export default function OverviewCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
      <h3 className="text-slate-100 font-semibold">{title}</h3>
      <p className="text-slate-400 text-lg mt-2">{value}</p>
    </div>
  );
}

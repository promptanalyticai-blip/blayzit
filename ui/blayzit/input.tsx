// ui/blayzit/input.tsx
"use client";

export default function BlayzitInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      className="bg-slate-800 border border-slate-700 p-2 rounded w-full text-slate-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter DNIP input..."
    />
  );
}

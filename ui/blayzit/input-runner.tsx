// ui/blayzit/input-runner.tsx
"use client";

export default function InputRunner({
  onRun,
}: {
  onRun: () => void;
}) {
  return (
    <button
      onClick={onRun}
      className="mt-4 bg-blue-600 px-4 py-2 rounded text-white"
    >
      Run DNIP Engine
    </button>
  );
}

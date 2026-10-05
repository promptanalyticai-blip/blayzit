// ui/blayzit/result-viewer.tsx
"use client";

export default function ResultViewer({ result }: { result: string }) {
  return (
    <pre className="mt-4 text-slate-400 bg-slate-800 p-4 rounded-xl border border-slate-700">
      {result || "No output yet"}
    </pre>
  );
}

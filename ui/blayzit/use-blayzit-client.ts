// ui/blayzit/use-blayzit-client.ts
"use client";

export function useBlayzitClient() {
  async function run(input: string): Promise<string> {
    return `Blayzit Client processed: ${input}`;
  }

  return { run };
}

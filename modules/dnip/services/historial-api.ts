//modules/historial/api.ts
export async function saveHistory(entry: string): Promise<string> {
  return `History Saved: ${entry}`;
}

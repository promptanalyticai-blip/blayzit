//types/index.ts
export type DNIPAnalysis = {
  id: string;
  input: string;
  output: string;
  created_at: string;
};

export type DNIPEvent = {
  id: string;
  company_id: string;
  type: string;
  payload: any;
  created_at: string;
};

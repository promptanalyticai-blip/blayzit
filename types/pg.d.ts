// types/pg.d.ts
declare module "pg" {
  export class Client {
    constructor(config: any);
    connect(): Promise<void>;
    query(sql: string, params?: any[]): Promise<any>;
    end(): Promise<void>;
  }
}


// packages/shared/src/api-client.ts
// Shared API client for platform services

export interface APIClientConfig {
  baseUrl: string;
  apiKey: string;
  timeout?: number;
}

export class ClarityAPIClient {
  private config: APIClientConfig;

  constructor(config: APIClientConfig) {
    this.config = {
      ...config,
      timeout: config.timeout || 30000,
    };
  }

  async get(path: string): Promise<any> {
    console.log(`[MOCK API] GET ${this.config.baseUrl}${path}`);
    // Mock response
    return { success: true, data: {} };
  }

  async post(path: string, data: any): Promise<any> {
    console.log(`[MOCK API] POST ${this.config.baseUrl}${path}`, data);
    // Mock response
    return { success: true, data: {} };
  }

  async put(path: string, data: any): Promise<any> {
    console.log(`[MOCK API] PUT ${this.config.baseUrl}${path}`, data);
    // Mock response
    return { success: true, data: {} };
  }

  async delete(path: string): Promise<any> {
    console.log(`[MOCK API] DELETE ${this.config.baseUrl}${path}`);
    // Mock response
    return { success: true };
  }
}

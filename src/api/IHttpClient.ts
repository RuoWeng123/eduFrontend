export interface IHttpClient {
  setAuthToken(authToken: string): void;
  
  resetAuthToken(): void;
  
  restGet<TQuery, T>(url: string, query: TQuery): Promise<T[]>;
  
  restPut<TData, T>(url: string, data: TData): Promise<T>;
  
  restDelete<T>(url: string): Promise<T>;
  
  restPost<TData, T>(url: string, data: TData): Promise<T>;
  
}

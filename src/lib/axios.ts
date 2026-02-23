import axios, { AxiosInstance } from "axios";

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API || "http://localhost:8000/api/v1",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  get api(): AxiosInstance {
    return this.instance;
  }

  get<T = any>(url: string) {
    return this.instance.get<T>(url);
  }

  post<T = any>(url: string, data?: any) {
    return this.instance.post<T>(url, data);
  }

  put<T = any>(url: string, data?: any) {
    return this.instance.put<T>(url, data);
  }
}

const ApiClientInstance = new ApiClient();
export default ApiClientInstance;

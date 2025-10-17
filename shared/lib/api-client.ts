import CustomError from "@/shared/features/error/domain/custom-error";

interface PostOptions {
  isFile?: boolean;
  headers?: Record<string, string>;
}
export class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, options);
    if (!response.ok) {
      const responseObj = await response.json()
      const error = new CustomError(responseObj.message || responseObj.error?.message || 'HTTP Error', {
        code: responseObj.code || responseObj.error?.code,
      });
      throw error;
    }
    return response.json();
  }

  get<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  post<T, U>(url: string, data: U, options: PostOptions = {}): Promise<T> {
    if (options.isFile) {
      return this.request<T>(url, {
        method: 'POST',
        body: data as FormData,
      });
    }

    return this.request<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: JSON.stringify(data),
    });
  }

  put<T, U>(url: string, data: U): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  patch<T, U>(url: string, data: U): Promise<T> {
    return this.request<T>(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  delete(url: string): Promise<void> {
    return this.request<void>(url, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new APIClient('/api');

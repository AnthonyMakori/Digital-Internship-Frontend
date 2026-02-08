/**
 * Centralized API utility
 * Replace BASE_URL and mock responses with real backend endpoints
 */

const BASE_URL = '/api'; // TODO: Replace with actual API base URL

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function apiCall<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  // Simulate network delay for mock data
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 400));

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      throw new ApiError(response.statusText, response.status);
    }
    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    // For mock mode, we'll handle this in individual service functions
    throw error;
  }
}

// Export for when backend is connected
export { apiCall, ApiError, BASE_URL };
export type { ApiOptions };

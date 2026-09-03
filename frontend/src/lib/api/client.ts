const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' 
    ? (window.localStorage.getItem('ace_auth_token') || window.localStorage.getItem('ace_token')) 
    : null;
    
  // Normalize path if it starts with slash and base URL ends with /api
  const urlPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = API_BASE_URL.endsWith('/api') && urlPath.startsWith('/api/')
    ? `${API_BASE_URL.replace(/\/api$/, '')}${urlPath}`
    : `${API_BASE_URL}${urlPath}`;

  try {
    const response = await fetch(fullUrl, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.error || errData?.message || `API request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (err: any) {
    console.warn(`[API Client] Error targeting ${fullUrl}:`, err.message);
    throw err;
  }
}

export function saveAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('ace_auth_token', token);
    window.localStorage.setItem('ace_token', token);
  }
}

export function clearAuthToken() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('ace_auth_token');
    window.localStorage.removeItem('ace_token');
    window.localStorage.removeItem('ace_user_profile');
  }
}

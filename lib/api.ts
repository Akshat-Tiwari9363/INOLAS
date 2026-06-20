const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function getErrorMessage(errorData: unknown): string {
  if (!errorData || typeof errorData !== 'object') {
    return 'API Request Failed'
  }

  const detail = (errorData as { detail?: unknown }).detail

  if (typeof detail === 'string' && detail.trim()) {
    return detail
  }

  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => {
        if (typeof item === 'string') {
          return item
        }

        if (item && typeof item === 'object') {
          const record = item as { msg?: unknown; loc?: unknown }
          const msg = typeof record.msg === 'string' ? record.msg : null
          const loc = Array.isArray(record.loc) ? record.loc.join('.') : null

          if (msg && loc) {
            return `${loc}: ${msg}`
          }

          if (msg) {
            return msg
          }
        }

        return null
      })
      .filter((message): message is string => Boolean(message))

    if (messages.length > 0) {
      return messages.join(', ')
    }
  }

  if (detail && typeof detail === 'object') {
    const message = (detail as { message?: unknown }).message
    if (typeof message === 'string' && message.trim()) {
      return message
    }
  }

  const fallbackMessage = (errorData as { message?: unknown }).message
  if (typeof fallbackMessage === 'string' && fallbackMessage.trim()) {
    return fallbackMessage
  }

  return 'API Request Failed'
}

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
        ...defaultHeaders,
        ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(getErrorMessage(errorData));
  }

  return response.json();
}

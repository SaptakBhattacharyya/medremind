let API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
if (API_BASE.endsWith('/')) {
  API_BASE = API_BASE.slice(0, -1);
}
if (!API_BASE.endsWith('/api')) {
  API_BASE += '/api';
}

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export default API_BASE;

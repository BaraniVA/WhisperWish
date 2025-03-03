const API_URL = 'http://localhost:3000/api';


export const wishesApi = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/wishes`); // 5s timeout
      if (!response.ok) {
        console.error('API error:', response.status, response.statusText);
        throw new Error(`API error: ${response.status}`);
      }
      console.log('Response:', response.status, await response.clone().text()); // Log raw response
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Non-JSON response received');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error details:', error); // Enhanced logging
      throw error;
    }
  },

  // Other methods remain unchange

  create: async (content: string) => {
    console.log('wishesApi.create called with:', content);
    const response = await fetch(`${API_URL}/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    return response.json();
  },

  getRandom: async () => {
    const response = await fetch(`${API_URL}/wishes/random`);
    return response.json();
  },
  
};
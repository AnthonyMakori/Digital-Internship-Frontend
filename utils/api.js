/**
 * API helper for making requests to the backend.
 * 
 * @param {string} endpoint 
 * @param {object} options 
 * @returns {Promise<Response>} 
 */
const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  let url = endpoint;

  // If endpoint is relative, prepend the base URL from env
  if (!endpoint.startsWith('http')) {
    url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });

  return res;
};

export default api;

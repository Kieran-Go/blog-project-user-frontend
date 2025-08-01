import { useEffect, useState } from 'react';

function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(url, {
      headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    if (!res.ok) {
      // Create a custom error for 403
      if (res.status === 403) {
        const error = new Error('Forbidden');
        error.status = 403;
        throw error;
      }

      // For other errors, try to extract the actual message
      return res.json().then((body) => {
        const error = new Error(body.message || 'Fetch failed');
        error.status = res.status;
        throw error;
      });
    }
    return res.json();
  })
  .then((data) => {
    setData(data);
    setLoading(false);
  })
  .catch((err) => {
    setError(err);
    setLoading(false);
  });
  }, [url]);

  return { data, loading, error };
}

export default useFetchData;
import axios from 'axios';
import { useEffect, useState } from 'react';

export function useApi(url, ticker) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const config = {
      baseURL: (process.env.NODE_ENV === 'production')
        ? 'https://hidden-fortress-30522.herokuapp.com/api'
        : 'http://localhost:5000/api',
      method: 'get'
    }

    let isMounted = true;

    if (ticker !== '') {
      setLoading(true);
      setData(undefined);
      setError(undefined);

      config.url = url;
      config.params = {'id': ticker};
  
      axios(config)
        .then(setLoading(false))
        .then(res => (isMounted)
          ? setData(res.data)
          : undefined)
        .catch(err => {
          setLoading(false);
          setError(err);
        });
    }

    return function cleanup() {
      isMounted = false;
    }
  }, [url, ticker]);

  return [data, loading, error];
}
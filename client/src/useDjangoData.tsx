import axios from 'axios';
import { useState, useEffect } from 'react';

interface DjangoData {
  title: string;
  channel: string;
}

const useDjangoData = (url: string) => {
  const [data, setData] = useState<DjangoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    axios.get(url)
      .then(res => {
        if (mounted) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          console.log(err);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, loading };
};

export default useDjangoData;

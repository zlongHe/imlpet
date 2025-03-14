import { useState, useEffect } from 'react';
import axios from 'axios';

interface LocationData {
  province: string;
  city: string;
  district: string;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://restapi.amap.com/v3/ip', {
          params: {
            key: 'your_amap_key', // 在实际应用中应该使用环境变量
          },
        });

        if (response.data.status === '1') {
          setLocation({
            province: response.data.province,
            city: response.data.city,
            district: '' // 高德IP定位API不返回区级信息，如需要可以通过额外API获取
          });
        } else {
          setError('无法获取位置信息');
        }
      } catch (err) {
        setError('获取位置信息失败');
        console.error('Location fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading, error };
}
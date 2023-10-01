import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useURLChange = () => {
  const router = useRouter();
  const [path, setPath] = useState(router.pathname);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setPath(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return path;
};

export default useURLChange;

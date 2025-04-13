import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from './auth.store';

const Callback = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const navigate = useNavigate();

  useEffect(() => {
    async function login() {
      const accessTokenRegex = /access_token=([^&]+)/;
      const isMatch = window.location.href.match(accessTokenRegex);

      if (isMatch) {
        const accessToken = isMatch[1];
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: accessToken }),
        });
        if (response.ok) {
          const data = await response.text();
          setToken(data);
          navigate('/');
        } else {
          navigate('/login');
        }
      }
    }
    login();
  }, []);

  return <></>;
};

export default Callback;

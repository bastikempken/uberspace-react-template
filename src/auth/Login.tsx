import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from './auth.store';
import Button from '../Button';

function Login() {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleClick = () => {
    const callbackUrl = `${window.location.href}`;
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl,
    )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };

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
        }
      }
    }
    login();
  }, []);

  return (
    <div className="flex justify-center items-center text-center min-h-screen">
      <Button onClick={handleClick}>
        <div className="flex gap-3">
          <img src="src/assets/google-icon.svg" alt="google icon" />
          <p>Login with Google</p>
        </div>
      </Button>
    </div>
  );
}

export default Login;

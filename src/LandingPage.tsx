import { useState } from 'react';
import { useAuthStore, AuthStore } from './auth/auth.store';
import { useShallow } from 'zustand/react/shallow';
import Button from './Button';

interface Props {}

export const LandingPage = ({}: Props) => {
  const [token, tokenPayload] = useAuthStore(
    useShallow((state: AuthStore) => [state.token, state.tokenPayload]),
  );

  const [response, setResponse] = useState<number | null>(null);
  const [showTokenPayload, setShowTokenPayload] = useState<boolean>(false);

  const onHealthClick = async () => {
    const response = await fetch('/api/health-check', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setResponse(response.status);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Uberspace React Template</h1>
      <Button onClick={onHealthClick}>Health check</Button>

      <pre>Status Code: {response || '-'}</pre>
      <hr />
      <Button onClick={() => setShowTokenPayload(true)}>Decode JWT</Button>
      <pre>
        {showTokenPayload && JSON.stringify(tokenPayload, undefined, '\t')}
      </pre>
    </div>
  );
};

export default LandingPage;

import { Outlet, Navigate } from 'react-router';
import { useAuthStore } from './auth/auth.store';
import { useShallow } from 'zustand/react/shallow';

import './index.css';

function App() {
  const isValid = useAuthStore(useShallow((state) => state.isValid()));
  if (!isValid) {
    console.log('token not valid -> login');
    return <Navigate to={'/login'} />;
  }
  return <Outlet />;
}

export default App;

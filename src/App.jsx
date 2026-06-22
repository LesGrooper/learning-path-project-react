import React from 'react';
import { Link } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx';
import { useAuth } from '../src/hooks/useAuth';

const App = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <nav style={{ padding: '1rem' }}>
        <Link to="/">Home</Link> {' | '}
        <Link to="/books">Books</Link>
        <button onClick={logout}>
          Logout
        </button>
      </nav>
      <AppRoutes />
    </>
  )
}
export default App;
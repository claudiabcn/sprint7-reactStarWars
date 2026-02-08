import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthServiceError } from '../services/authService';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  
  const { login, loginGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/movies';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoadingEmail(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {

      if (err instanceof AuthServiceError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error logging in');
      }
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoadingGoogle(true);

    try {
      await loginGoogle();

      navigate(from, { replace: true });
    } catch (err) {

      if (err instanceof AuthServiceError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error logging in with Google');
      }
    } finally {
      setLoadingGoogle(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loadingEmail,
    loadingGoogle,
    handleSubmit,
    handleGoogleLogin,
  };
};
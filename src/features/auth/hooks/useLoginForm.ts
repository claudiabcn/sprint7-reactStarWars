import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  
  const { login, loginGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoadingEmail(true);

    try {
      await login(email, password);
      navigate('/movies');
    } catch (err: any) {
      setError(err.message || 'Error logging in');
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoadingGoogle(true);

    try {
      await loginGoogle();
      navigate('/movies');
    } catch (err: any) {
      setError(err.message || 'Error logging in with Google');
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
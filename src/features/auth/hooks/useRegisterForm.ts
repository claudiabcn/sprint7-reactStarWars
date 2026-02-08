import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthServiceError } from '../services/authService';

export const useRegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  
  const { register, loginGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/movies';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoadingEmail(true);
    try {
      await register(email, password);

      navigate(from, { replace: true });
    } catch (err) {

      if (err instanceof AuthServiceError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error creating account');
      }
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogleSignup = async () => {
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
        setError('Error signing up with Google');
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
    confirmPassword,
    setConfirmPassword,
    error,
    loadingEmail,
    loadingGoogle,
    handleSubmit,
    handleGoogleSignup,
  };
};
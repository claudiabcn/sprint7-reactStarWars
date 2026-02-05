import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useRegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  
  const { register, loginGoogle } = useAuth();
  const navigate = useNavigate();

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
      navigate('/movies');
    } catch (err: any) {
      setError(err.message || 'Error creating account');
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoadingGoogle(true);

    try {
      await loginGoogle();
      navigate('/movies');
    } catch (err: any) {
      setError(err.message || 'Error signing up with Google');
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
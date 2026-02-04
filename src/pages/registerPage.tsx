import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/Button';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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

    setLoading(true);

    try {
      await register(email, password);
      navigate('/movies');
    } catch (err: any) {
      setError(err.message || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-200">
        <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        
        <div className="h-1 w-32 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 mx-auto mb-8 rounded-full"></div>
        
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-purple-50 text-gray-800 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-purple-50 text-gray-800 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-purple-50 text-gray-800 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <Button
            onClick={() => {}}
            disabled={loading}
            variant="primary"
            className="w-full"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-gray-600 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
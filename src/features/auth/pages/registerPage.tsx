import { Link } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import { useRegisterForm } from '../hooks/useRegisterForm';
import MoviesBackground from '../../../shared/ui/MoviesBackground';

function RegisterPage() {
  const {
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
  } = useRegisterForm();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12">
      <MoviesBackground />
      
      <div className="relative max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-purple-200">
        <h2 className="text-4xl py-1 font-bold text-center mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        
        <div className="h-1 w-32 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 mx-auto mb-8 rounded-full"></div>
        
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-purple-50 text-gray-800 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-purple-50 text-gray-800 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2 text-sm">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-purple-50 text-gray-800 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="••••••••"
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            isLoading={loadingEmail}
            className="w-full"
          >
            Sign Up
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-purple-200"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-purple-200"></div>
        </div>

        <Button
          onClick={handleGoogleSignup}
          variant="secondary"
          isLoading={loadingGoogle}
          className="w-full"
        >
          Continue with Google
        </Button>

        <p className="text-gray-600 text-center mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold transition">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
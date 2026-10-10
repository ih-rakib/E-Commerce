import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import BackButton from './BackButton';

const Register = () => {
  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { isLoading: registerLoading }] =
    useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (username.trim().length < 2) {
      setMessage("Username must be at least 2 characters long.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    const data = {
      username: username.trim(), email: email.trim(), password
    }

    try {
      await registerUser(data).unwrap();
      navigate('/login')
    } catch (error) {
      setMessage(error?.data?.message || "Something went wrong!")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <BackButton className="mb-4" />
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              minLength={2}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            />
          </div>

          {
            message && <span role="alert" className='text-red-500 text-sm block mb-3'>{message}</span>
          }
          <button
            type="submit"
            disabled={registerLoading}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-60"
          >
            {registerLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className='my-5 text-sm text-center'>Already have an account? <Link to='/login' className='text-red-700 px-1'>Login </Link>here</p>
      </div>
    </div>
  );
};

export default Register;

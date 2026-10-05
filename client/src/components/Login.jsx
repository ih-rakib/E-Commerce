import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {

    const navigate = useNavigate();

    const [message, setMessage] = useState('')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation()

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!email.trim() || !password) {
            setMessage("Please enter your email and password.");
            return;
        }

        const data = {
            email: email.trim(), password
        }

        try {
            const response = await loginUser(data).unwrap();

            const { user } = response;
            dispatch(setUser({ user }))

            navigate("/")

        } catch (error) {
            setMessage(error?.data?.message || "Invalid email or password")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                        />
                    </div>

                    {
                        message && <span role="alert" className='text-red-500 text-sm block mb-3'>{message}</span>
                    }
                    <button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full bg-slate-700 text-white px-4 py-2 my-3 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-60"
                    >
                        {loginLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className='my-5 text-sm text-center'>Don&apos;t have an account? <Link to='/register' className='text-red-700 px-1'>Register </Link>here</p>
            </div>
        </div>
    );
};

export default Login;

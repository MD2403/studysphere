import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from 'axios';
import logo from '../assets/Logos/StudySphere_logo.png'; // Make sure the path to your logo is correct

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('study-sphere-psi.vercel.app/api/users/login', 
                { email, password }, 
                { withCredentials: true }); // Make sure to include withCredentials
    
            if (response.status === 200) {
                const {  accessToken, refreshToken, user } = response.data.data; 
                console.log(`id : ${response.data.data.user._id} \n\n,${accessToken}\n\n,${refreshToken}`)

                // Store tokens and user data in local storage
                localStorage.setItem('accessToken', accessToken); // Adjust according to your API response structure
                localStorage.setItem('currentUser', JSON.stringify(response.data.data.user._id)); // Store _id as currentUser
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('username',user.username)
    
                navigate('/home'); // Redirect to home
            }
        } catch (err) {
            console.error(err);
            alert('Login failed. Please check your credentials.');
        }
    
    };

    return (
        <div className='h-screen bg-cover bg-no-repeat bg-center bg-fixed'>
            <div className="max-w-lg m-auto pt-44 font-myfont">
                <div className="bg-white/ backdrop-blur-xl rounded-lg shadow-xl overflow-hidden">
                    <div className="p-8">
                        {/* Logo */}
                        <img src={logo} alt="Logo" className="h-20 mb-6 mx-auto bg-black" />
                        <h2 className="text-center text-3xl font-extrabold text-black">
                            Welcome Back
                        </h2>
                        <p className="mt-4 text-center text-gray-700">Sign in to continue</p>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <input
                                        placeholder="Email address"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        type="email"
                                        id="email"
                                    />
                                </div>
                                <div className="mt-4">
                                    <input
                                        placeholder="Password"
                                        className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                        type="password"
                                        id="password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                    <input
                                        className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                                        type="checkbox"
                                        id="remember-me"
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">Remember me</label>
                                </div>
                                <div className="text-sm">
                                    <NavLink className="font-medium text-blue-500 hover:text-blue-600" to="/forgot-password">Forgot your password?</NavLink>
                                </div>
                            </div>

                            <div>
                                <button
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-blue-500 hover:bg-indigo-600"
                                    type="submit"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="px-8 py-4 bg-white/ backdrop-blur-xl text-center">
                        <span className="text-gray-700">Don't have an account? </span>
                        <NavLink className="font-medium text-blue-500 hover:text-blue-600" to="/signup">Sign up</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

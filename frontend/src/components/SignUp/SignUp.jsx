import React from 'react'
import { FaArrowLeft, FaCheckCircle, FaEyeSlash, FaTimesCircle } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../config';

const SignUp = () => {
    const [showToast, setShowToast] = React.useState({visible:false,message:'',icon:null, isError:false});
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({username: '',email:"",password:""});
    const navigate = useNavigate();
    
    // FOR Toast
    React.useEffect(() => {
        if(showToast.visible){
            const timer = setTimeout(() => {
                setShowToast(prev => ({...prev, visible:false}));
                // Only navigate if it's a success message
                if(!showToast.isError && showToast.message === "Sign up Successful!"){
                    navigate('/login');
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast, navigate]);
    
    const toggleShowPassword = () => setShowPassword(prev => !prev); 
    
    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    
    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Sign up fired', formData);
        
        try {
            const res = await axios.post(`${backendUrl}/api/user/register`, formData);
            console.log('Register response', res.data);
            
            if(res.data.success && res.data.token){  
                localStorage.setItem('authToken', res.data.token);
                setShowToast({
                    visible: true,
                    message: 'Sign up Successful!',
                    icon: <FaCheckCircle/>,
                    isError: false
                });
                return;
            }
            
            // Handle logical errors (success: false)
            setShowToast({
                visible: true,
                message: res.data.message || 'Registration failed',
                icon: <FaTimesCircle/>,
                isError: true
            });
            
        } catch (err) {
            console.error('Registration error:', err);
            const msg = err.response?.data?.message || err.message || 'Registration failed';
            setShowToast({
                visible: true,
                message: msg,
                icon: <FaTimesCircle/>,
                isError: true
            });
        }
    };
    
    return (
        <div className='min-h-screen flex items-center justify-center bg-[#1a120b] p-4 relative'>
            {/* Toast Notification */}
            <div className={`fixed top-4 right-4 z-[9999] transition-all duration-300
                ${showToast.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
                {showToast.visible && (
                    <div className={`px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm
                        ${showToast.isError ? 'bg-red-600 text-white' : 'bg-green-400 text-white'}`}>
                        <span className='flex-shrink-0 text-lg'>
                            {showToast.icon}
                        </span>
                        <span className='font-medium'>
                            {showToast.message}
                        </span>
                    </div>
                )}
            </div>
            
            <div className='w-full max-w-md bg-gradient-to-br from-[#2d1b0e] to-[#4a372a] p-8 rounded-xl shadow-lg border-4
                border-amber-700/30 transform transition-all duration-300 hover:shadow-2xl'>
                <h1 className='text-3xl font-bold text-center bg-gradient-to-r from-amber-400 to-amber-600 
                    bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform'>
                    Create Account 
                </h1>
                
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder='Username' 
                        value={formData.username} 
                        onChange={handleChange} 
                        className='w-full px-4 py-3 rounded-lg bg-[#2d1b0e] text-amber-100 placeholder-amber-400 focus:outline-none
                            focus:ring-2 focus:ring-amber-600 transition-all duration-200 hover:scale-[1.02]' 
                        required 
                    />
                    
                    <input 
                        type="email" 
                        name="email" 
                        placeholder='Email' 
                        value={formData.email} 
                        onChange={handleChange} 
                        className='w-full px-4 py-3 rounded-lg bg-[#2d1b0e] text-amber-100 placeholder-amber-400 focus:outline-none
                            focus:ring-2 focus:ring-amber-600 transition-all duration-200 hover:scale-[1.02]' 
                        required 
                    />

                    <div className='relative'>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeholder='Password' 
                            value={formData.password} 
                            onChange={handleChange} 
                            className='w-full px-4 py-3 rounded-lg bg-[#2d1b0e] text-amber-100 placeholder-amber-400 focus:outline-none
                                focus:ring-2 focus:ring-amber-600 transition-all duration-200 hover:scale-[1.02] pr-10' 
                            required 
                        />
                        <button 
                            className='absolute inset-y-0 right-4 flex items-center text-amber-400 hover:text-amber-600 transition-all transform hover:scale-125' 
                            type='button' 
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                        </button>
                    </div>
                    
                    <button 
                        type='submit' 
                        className='w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2d1b0e] font-bold rounded-lg
                            hover:scale-105 transition-transform duration-300 hover:shadow-lg'
                    >
                        Sign Up
                    </button>
                </form>
                
                <div className='mt-6 text-center'>
                    <Link to="/login" className='group inline-flex items-center text-amber-400 hover:text-amber-600 transition-all duration-300'>
                        <FaArrowLeft className='mr-2 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300'/>
                        <span className='transform group-hover:translate-x-2 transition-all duration-300'>
                            Back To Login
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp

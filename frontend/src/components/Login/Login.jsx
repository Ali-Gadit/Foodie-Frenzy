import React from 'react'
import { FaArrowRight, FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaTimesCircle, FaUser, FaUserPlus } from 'react-icons/fa';
import { iconClass, inputBase } from '../../assets/dummydata';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../config';

const Login = ({onLoginSuccess,onClose}) => {
  const [showToast, setShowToast] = React.useState({visible:false,message:'',isError:false});
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({email: '',password: '',rememberMe:false});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("loginData");
    if(stored) {
      setFormData(JSON.parse(stored));
    }
  },[])

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Clear previous toast and token
    setShowToast({visible:false,message:'',isError:false});
    localStorage.removeItem("authToken");
    
    try {
      const res = await axios.post(`${backendUrl}/api/user/login`,{
        email:formData.email,
        password:formData.password,
      })
      
      if(res.data.success && res.data.token){
        localStorage.setItem('authToken',res.data.token);

        // Remember me
        if (formData.rememberMe) {
          localStorage.setItem("loginData",JSON.stringify(formData));
        } else {
          localStorage.removeItem("loginData");
        }

        setShowToast({visible:true,message:'Login Successful!',isError:false});
        setTimeout(()=>{
          setShowToast({visible:false,message:'',isError:false});
          onLoginSuccess(res.data.token);
          setIsSubmitting(false);
        },1500);
      }
      else {
        // backend says invalid
        console.warn("Unexpected Err",res.data);
        setShowToast({
          visible: true,
          message: res.data.message || "Invalid email or password",
          isError: true,
        });
        setTimeout(() => {
          setShowToast({ visible: false, message: "", isError: false });
          setIsSubmitting(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Axios error',err);
      const msg = err.response?.data?.message || err.message || 'Login failed';
      setShowToast({visible:true,message:msg,isError:true});
      setTimeout(()=>{
        setShowToast({visible:false,message:'',isError:false});
        setIsSubmitting(false);
      },2000);
    }
  }
  
  const handleChange = ({ target:{name,value,type,checked} }) =>
    setFormData(prev => ({...prev,[name]: type === 'checkbox' ? checked : value}));
  
  const toggleShowPassword = () => setShowPassword(prev => !prev); 
  
  return (
    <div className='space-y-6 relative'>
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300
        ${showToast.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
          {showToast.visible && (
            <div className={`px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm
              ${showToast.isError ? 'bg-red-600 text-white' : 'bg-green-400 text-white'}`}>
              {showToast.isError 
                ? <FaTimesCircle className='flex-shrink-0'/> 
                : <FaCheckCircle className='flex-shrink-0'/>}
              <span>{showToast.message}</span>
            </div>
          )}
      </div>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='relative'>
          <FaUser className={iconClass}/>
          <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange} className={ `${inputBase} pl-10 pr-4 py-3`} required/>
        </div>
        <div className='relative'>
          <FaLock className={iconClass}/>
          <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' value={formData.password} onChange={handleChange} className={ `${inputBase} pl-10 pr-10 py-3`} required/>
        <button type='button' onClick={toggleShowPassword} className=' absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400'>
        {showPassword ? <FaEyeSlash/> : <FaEye/>}
        </button>
        </div>
        <div className='flex items-center'>
          <label className='flex items-center'>
            <input type="checkbox" name='rememberMe' checked={formData.rememberMe} onChange={handleChange} 
            className='form-checkbox h-5 w-5 text-amber-600 bg-[#2d1b0e] border-amber-400 rounded focus:ring-amber-600' />
            <span className='ml-2 text-amber-100'>Remember me</span>
          </label>
        </div>
        <button type='submit' disabled={isSubmitting} className='w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2d1b0e] font-bold rounded-e-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-50'>
          {isSubmitting ? 'Signing In...' : 'Sign In'} <FaArrowRight />
        </button>
      </form>
      <div className='text-center'>
        <Link to="/signup" onClick={onClose} className='inline-flex items-center gap-2 text-amber-400
        hover:text-amber-600 transition-colors'>
          <FaUserPlus/> Create New Account
        </Link>
      </div>
    </div>
  )
}

export default Login
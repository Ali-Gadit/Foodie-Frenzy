import React, { useState } from 'react'
import { useCart } from '../../CartContext/CartContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backendUrl } from '../../config'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { toast } from 'react-hot-toast'

const CheckoutPage = () => {
    const {cartItems, totalAmount, clearCart} = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address: '', city: '', zipCode: ''
    });
    
    const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'online'
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const orderData = {
                ...formData,
                items: cartItems,
                amount: totalAmount,
                paymentMethod,
                // Add default values for required backend fields if missing in form
                subtotal: totalAmount,
                tax: 0, 
                total: totalAmount 
            };

            const token = localStorage.getItem('authToken');
            const res = await axios.post(`${backendUrl}/api/orders`, orderData, {
                headers: {Authorization: `Bearer ${token}`}
            });

            if (res.data.success || res.status === 201) {
                if (paymentMethod === 'online') {
                    // Redirect to Stripe or Payment Gateway
                    window.location.replace(res.data.checkoutUrl);
                } else {
                    // COD Success
                    clearCart();
                    navigate('/myorder');
                    toast.success("Order Placed Successfully!");
                }
            } else {
                toast.error("Failed to place order");
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
    <Navbar/>
    <div className='min-h-screen bg-[#1a120b] py-16 px-4 sm:px-6 lg:px-8 font-cinzel text-amber-100'>
        <div className='max-w-7xl mx-auto'>
            <h1 className='text-4xl font-bold text-center mb-12 text-amber-400'>Checkout</h1>
            
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                {/* Left Side: Delivery Information */}
                <div className='bg-amber-900/20 p-8 rounded-2xl border border-amber-800/30 backdrop-blur-sm'>
                    <h2 className='text-2xl font-bold mb-6 text-amber-200'>Delivery Information</h2>
                    <form onSubmit={handleSubmit} id="checkout-form" className='space-y-6'>
                        <div className='grid grid-cols-2 gap-4'>
                            <input type="text" name="firstName" placeholder='First Name' required 
                                value={formData.firstName} onChange={handleChange}
                                className='w-full bg-black/20 border border-amber-800/50 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors'/>
                            <input type="text" name="lastName" placeholder='Last Name' required 
                                value={formData.lastName} onChange={handleChange}
                                className='w-full bg-black/20 border border-amber-800/50 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors'/>
                        </div>
                        <input type="email" name="email" placeholder='Email Address' required 
                            value={formData.email} onChange={handleChange}
                            className='w-full bg-black/20 border border-amber-800/50 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors'/>
                        <input type="text" name="phone" placeholder='Phone Number' required 
                            value={formData.phone} onChange={handleChange}
                            className='w-full bg-black/20 border border-amber-800/50 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors'/>
                        
                        <div className='space-y-4'>
                            <input type="text" name="address" placeholder='Full Address' required 
                                value={formData.address} onChange={handleChange}
                                className='w-full bg-black/20 border border-amber-800/50 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors'/>
                            <div className='grid grid-cols-2 gap-4'>
                                <input type="text" name="city" placeholder='City' required 
                                    value={formData.city} onChange={handleChange}
                                    className='w-full bg-black/20 border border-amber-800/50 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors'/>
                                <input type="text" name="zipCode" placeholder='Zip Code' required 
                                    value={formData.zipCode} onChange={handleChange}
                                    className='w-full bg-black/20 border border-amber-800/50 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors'/>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Side: Order Summary & Payment */}
                <div className='space-y-8'>
                    {/* Order Summary */}
                    <div className='bg-amber-900/20 p-8 rounded-2xl border border-amber-800/30 backdrop-blur-sm'>
                        <h2 className='text-2xl font-bold mb-6 text-amber-200'>Order Summary</h2>
                        <div className='space-y-4 max-h-60 overflow-auto mb-6 custom-scrollbar'>
                            {cartItems.map(item => (
                                <div key={item._id} className='flex justify-between items-center py-2 border-b border-amber-800/20'>
                                    <div className='flex items-center gap-3'>
                                        <img src={item.item.imageUrl.startsWith('http') ? item.item.imageUrl : `${backendUrl}${item.item.imageUrl}`} 
                                             alt={item.item.name} className='w-12 h-12 object-cover rounded-md'/>
                                        <div>
                                            <p className='font-bold text-amber-100'>{item.item.name}</p>
                                            <p className='text-sm text-amber-100/60'>Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className='font-bold'>₹{item.item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>
                        <div className='space-y-2 border-t border-amber-800/50 pt-4'>
                            <div className='flex justify-between'>
                                <span>Subtotal</span>
                                <span>₹{totalAmount}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Delivery Fee</span>
                                <span>₹0.00</span>
                            </div>
                            <div className='flex justify-between text-xl font-bold text-amber-400 pt-2'>
                                <span>Total</span>
                                <span>₹{totalAmount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className='bg-amber-900/20 p-8 rounded-2xl border border-amber-800/30 backdrop-blur-sm'>
                        <h2 className='text-2xl font-bold mb-6 text-amber-200'>Payment Method</h2>
                        <div className='flex gap-4 mb-8'>
                            <button type='button' 
                                onClick={() => setPaymentMethod('cod')}
                                className={`flex-1 py-3 rounded-lg border transition-all duration-300
                                ${paymentMethod === 'cod' 
                                    ? 'bg-amber-600 text-black border-amber-600 font-bold' 
                                    : 'bg-transparent border-amber-800/50 text-amber-100/60 hover:border-amber-600'}`}>
                                Cash on Delivery
                            </button>
                            <button type='button' 
                                onClick={() => setPaymentMethod('online')}
                                className={`flex-1 py-3 rounded-lg border transition-all duration-300
                                ${paymentMethod === 'online' 
                                    ? 'bg-amber-600 text-black border-amber-600 font-bold' 
                                    : 'bg-transparent border-amber-800/50 text-amber-100/60 hover:border-amber-600'}`}>
                                Stripe (Online)
                            </button>
                        </div>
                        
                        <button type="submit" form="checkout-form" disabled={loading}
                            className='w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-bold text-lg rounded-xl
                            hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-amber-900/50 disabled:opacity-50 disabled:cursor-not-allowed'>
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default CheckoutPage
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../config'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { FaBox, FaCircle } from 'react-icons/fa'

const MyOrderPage = () => {
    const [data, setData] = useState([]);
    
    const fetchOrders = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;
        
        try {
            const res = await axios.get(`${backendUrl}/api/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(res.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'delivered': return 'text-green-400';
            case 'out for delivery': return 'text-blue-400';
            default: return 'text-amber-400';
        }
    }

    return (
        <>
            <Navbar />
            <div className='min-h-screen bg-[#1a120b] py-16 px-4 sm:px-6 lg:px-8 font-cinzel text-amber-100'>
                <div className='max-w-5xl mx-auto'>
                    <h1 className='text-4xl font-bold text-center mb-12 text-amber-400'>Order History</h1>

                    <div className='space-y-8'>
                        {data.map((order, i) => (
                            <div key={i} className='bg-amber-900/10 rounded-xl border border-amber-800/30 overflow-hidden hover:border-amber-600/50 transition-all shadow-lg'>
                                {/* Order Header */}
                                <div className='bg-amber-900/30 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-800/30'>
                                    <div className='flex items-center gap-4'>
                                        <div className='p-3 bg-amber-500/10 rounded-lg'>
                                            <FaBox className='text-2xl text-amber-500' />
                                        </div>
                                        <div>
                                            <p className='text-sm text-amber-100/60'>Order ID</p>
                                            <p className='font-mono text-amber-100'>#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col sm:items-end'>
                                        <div className='flex items-center gap-2'>
                                            <FaCircle className={`text-[10px] ${getStatusColor(order.status)} animate-pulse`} />
                                            <span className={`font-bold uppercase tracking-wider text-sm ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className='text-sm text-amber-100/60 mt-1'>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className='p-4 sm:p-6 space-y-4'>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className='flex items-center gap-4 py-2 first:pt-0 last:pb-0'>
                                            <img
                                                src={item.item.imageUrl.startsWith('http') ? item.item.imageUrl : `${backendUrl}${item.item.imageUrl}`}
                                                alt={item.item.name}
                                                className='w-16 h-16 object-cover rounded-lg border border-amber-800/30'
                                            />
                                            <div className='flex-1 min-w-0'>
                                                <h3 className='font-bold text-amber-100 truncate'>{item.item.name}</h3>
                                                <p className='text-sm text-amber-100/60'>
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <div className='text-right'>
                                                <p className='font-bold text-amber-200'>₹{item.item.price * item.quantity}</p>
                                                {item.quantity > 1 && (
                                                    <p className='text-xs text-amber-100/40'>₹{item.item.price} each</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer */}
                                <div className='bg-black/20 p-4 sm:p-6 flex justify-between items-center border-t border-amber-800/30'>
                                    <div className='text-sm text-amber-100/60'>
                                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} Items
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <span className='text-amber-100/60'>Total Amount:</span>
                                        <span className='text-xl font-bold text-amber-400'>₹{(order.total || order.amount).toFixed(2)}</span>
                                    </div>
                                </div>
                                
                                <div className='px-4 sm:px-6 pb-6 pt-4 flex justify-start'>
                                     <button onClick={fetchOrders} className='bg-amber-900/40 border border-amber-800/50 text-amber-100 px-6 py-2 rounded-lg text-sm uppercase tracking-widest hover:bg-amber-800/60 hover:border-amber-500 transition-all duration-300 active:scale-95 cursor-pointer shadow-lg'>
                                        Refresh Status
                                    </button>
                                </div>
                            </div>
                        ))}

                        {data.length === 0 && (
                            <div className='text-center py-20 bg-amber-900/10 rounded-2xl border border-amber-800/30'>
                                <p className='text-amber-100/50 text-xl'>You haven't placed any orders yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyOrderPage

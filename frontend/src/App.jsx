import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

// Lazy Load Pages
const Home = React.lazy(() => import('./pages/Home/Home'));
const ContactPage = React.lazy(() => import('./pages/ContactPage/ContactPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'));
const Menu = React.lazy(() => import('./pages/Menu/Menu'));
const Cart = React.lazy(() => import('./pages/Cart/Cart'));
const SignUp = React.lazy(() => import('./components/SignUp/SignUp'));
const VerifyPaymentPage = React.lazy(() => import('./pages/VerifyPaymentPage/VerifyPaymentPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage/CheckoutPage'));
const MyOrderPage = React.lazy(() => import('./pages/MyOrderPage/MyOrderPage'));

const App = () => {
  return (
   <Suspense fallback={
     <div className="min-h-screen flex items-center justify-center bg-[#1a120b] text-amber-400 font-cinzel text-xl">
       Loading Deliciousness...
     </div>
   }>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/login' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />

      {/* Payment Verification */}
      <Route path='/myorder/verify' element={<VerifyPaymentPage/> }/>

      <Route path='/cart' element={
        <PrivateRoute>
        <Cart /> 
        </PrivateRoute>}/>

      <Route path='/checkout' element={
        <PrivateRoute>
        <CheckoutPage /> 
        </PrivateRoute>}/>
        <Route path='/myorder' element={<PrivateRoute><MyOrderPage/></PrivateRoute>}/>
     </Routes>
   </Suspense>
  )
}

export default App

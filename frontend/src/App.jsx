import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import SingleService from './components/services/SingleService';
import Services from './pages/services/Services';
import ServicesByCategory from './components/populerservice/ServicesByCategory';
import CustomerDashboard from './protectedPages/customer/profile/CustomerDashboard';
import BookingPage from './protectedPages/customer/booking/BookingPage';
import SuccessPage from './protectedPages/customer/booking/SuccessPage';
import ProviderDashboard from './protectedPages/provider/dashboard/ProviderDashboard';
import Service from './protectedPages/provider/dashboard/Service';
import AddService from './protectedPages/provider/dashboard/AddService';
import ServiceDetail from './protectedPages/provider/dashboard/ServiceDetail';
import ProviderBookings from './protectedPages/provider/dashboard/ProviderBookings';
import BookingDetail from './protectedPages/provider/dashboard/BookingDetail';
import Earning from './protectedPages/provider/dashboard/Earning';
import Settings from './protectedPages/provider/dashboard/Settings';
import Dashboard from './protectedPages/provider/dashboard/Dashboard';
import ServiceEdit from './protectedPages/provider/dashboard/ServiceEdit';
import ProviderProfile from './protectedPages/provider/dashboard/ProviderProfile';
import EditProfile from './protectedPages/provider/dashboard/EditProfile';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyOtp from './pages/auth/VerifyOtp';
import ResetPassword from './pages/auth/ResetPassword';
import AuthCustomer from './pages/auth/AuthCustomer';
import ContactPage from './pages/contact/ContactPage';
import AllServices from './pages/services/AllServices';
import ChatPage from './pages/chating/ChatPage';
import Chatlist from './pages/chating/Chatlist';
import { useEffect } from 'react';
import socketService from './socket/Socket';
import useSocket from './socket/useSocket';




function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  useSocket({ userId: user._id });
  
  useEffect(() => {
    if (!user?._id) return;
    socketService.connect(user._id);
    return () => {
      socketService.disconnect();
    };
  }, [user?._id]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<AllServices />} />
        <Route path='/service/:id' element={<SingleService />} />
        <Route path='/category/:service' element={<ServicesByCategory />} />

        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='/contact' element={<ContactPage />} />
        <Route path='/message' element={<Chatlist />} />





        <Route element={<AuthCustomer />}>
          <Route path='/customer/profile' element={<CustomerDashboard />} />
          <Route path='/booking' element={<BookingPage />} />
          <Route path='/success' element={<SuccessPage />} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />


        <Route path='/dashboard' element={<ProviderDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path='service' element={<Service />} />
          <Route path='service/add' element={<AddService />} />
          <Route path='service/:id' element={<ServiceDetail />} />
          <Route path='service/edit/:id' element={<ServiceEdit />} />
          <Route path='booking' element={<ProviderBookings />} />
          <Route path='booking/:id' element={<BookingDetail />} />
          <Route path='earning' element={<Earning />} />
          <Route path='settings' element={<Settings />} />
          <Route path='profile' element={<ProviderProfile />} />
          <Route path='profile/edit' element={<EditProfile />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default App

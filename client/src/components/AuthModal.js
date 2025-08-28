import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const AuthModal = ({ showModal, setShowModal }) => {
  const [step, setStep] = useState('login');
  const [formData, setFormData] = useState({});
  const [emailToVerify, setEmailToVerify] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      setEmailToVerify(formData.email);
      setStep('otp');
      setError('');
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/verify-otp', { email: emailToVerify, otp: formData.otp });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const { data } = await api.post('/auth/login', formData);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
    } catch (err) {
        setError(err.response.data.msg);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-2xl">&times;</button>
        {error && <p className="text-red-500 bg-red-100 border border-red-400 p-2 rounded-md mb-4">{error}</p>}
        
        {step === 'login' && (
            <form onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-4 bg-gray-700 rounded" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 bg-gray-700 rounded" required />
                <button type="submit" className="w-full bg-cyan-500 p-2 rounded">Login</button>
                <p className="mt-4 text-sm">New here? <button type="button" onClick={() => setStep('register')} className="text-cyan-400 hover:underline">Create an account</button></p>
            </form>
        )}

        {step === 'register' && (
            <form onSubmit={handleRegister}>
                <h2 className="text-2xl font-bold mb-4">Create Account</h2>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 mb-4 bg-gray-700 rounded" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-4 bg-gray-700 rounded" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 bg-gray-700 rounded" required />
                <button type="submit" className="w-full bg-cyan-500 p-2 rounded">Register</button>
                <p className="mt-4 text-sm">Already have an account? <button type="button" onClick={() => setStep('login')} className="text-cyan-400 hover:underline">Login</button></p>
            </form>
        )}

        {step === 'otp' && (
            <form onSubmit={handleVerify}>
                <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
                <p className="mb-4 text-gray-400">An OTP has been sent to {emailToVerify}</p>
                <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} className="w-full p-2 mb-4 bg-gray-700 rounded" required />
                <button type="submit" className="w-full bg-cyan-500 p-2 rounded">Verify & Login</button>
            </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;

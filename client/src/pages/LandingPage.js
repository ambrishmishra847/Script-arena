import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

const FeatureCard = ({ title, description, icon }) => (
    <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg border border-gray-700 text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="text-cyan-400 mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const featuresSectionRef = useRef(null);
  const joinSectionRef = useRef(null); // Ref for the join section
  const navigate = useNavigate();

  const scrollToJoin = () => {
    joinSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGuestLogin = () => {
    localStorage.setItem('token', 'guest-token');
    navigate('/dashboard');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
              Script<span className="text-cyan-400">-Arena</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Your ultimate playground to master algorithms, solve challenges, and forge your coding path.
            </p>
            <button
              onClick={scrollToJoin} // Updated this to point to the join section
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20">
              <video
                src="/video.mp4"
                autoPlay loop muted playsInline className="w-full h-full object-cover"
              ></video>
            </div>
          </div>
        </div>
      </div>

      <div ref={featuresSectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
        <video 
            src="/video2.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
        ></video>
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <div className="container mx-auto px-6 text-center relative z-20">
            <h2 className="text-4xl font-bold mb-12">Why Script Arena?</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard 
                    title="Structured Learning" 
                    description="Follow guided learning paths to build skills from the ground up, just like a pro."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 01.553-.894L9 4m0 16v-8m0 8h12l-5.447-2.724A1 1 0 0015 16.382V7.618a1 1 0 00-.553-.894L9 4m0 0V3a1 1 0 011-1h4a1 1 0 011 1v1m-6 0h6" /></svg>}
                />
                <FeatureCard 
                    title="Competitive Arena" 
                    description="Solve problems in a LeetCode-style environment and prepare for technical interviews."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
                />
                <FeatureCard 
                    title="AI-Powered Assistance" 
                    description="Get hints, debug your code, and generate test cases with an integrated AI assistant."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                />
            </div>
        </div>
      </div>

      <div ref={joinSectionRef} className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <h2 className="text-4xl font-bold mb-12">Join the Arena</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <button onClick={handleGuestLogin} className="bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white font-bold py-4 px-12 rounded-lg text-xl transition duration-300">
            Continue as Guest
          </button>
          <button onClick={() => setShowAuthModal(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-12 rounded-lg text-xl transition duration-300">
            Login or Sign Up
          </button>
        </div>
      </div>
      <AuthModal showModal={showAuthModal} setShowModal={setShowAuthModal} />
    </div>
  );
};

export default LandingPage;

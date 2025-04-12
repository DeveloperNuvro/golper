import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import logo from '../assets/logo.png'; 

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown logic
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate email and phone number
    if (!email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!phoneNumber) {
      toast.error('Please enter a valid phone number.');
      return;
    }
  
    // Replace these entry IDs with the correct ones from Google Form
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfq0de5TGD7Y2Eu5M_qC5-yKt5bXLfeoWyb2x10vWKdyfzIYQ/formResponse';
    
    const formData = new FormData();
    formData.append('entry.914538286', email); // Correct entry ID for the email
    formData.append('entry.402855719', phoneNumber); // Correct entry ID for the phone number
  
    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Forms doesn't support CORS, so this prevents errors
        body: formData,
      });
      toast.success('Thanks for subscribing!');
      setEmail('');
      setPhoneNumber('');
    } catch {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0078a3] via-[#004f68] to-[#002f40] min-h-screen flex items-center justify-center text-white px-4 relative overflow-hidden">
      <Toaster />

      {/* Soft confetti background dots */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('/confetti.svg')] bg-cover bg-center z-0" />

      <div className="relative z-10 max-w-xl w-full text-center space-y-8">
        {/* Logo with hover effect and shadow */}
        <img
          src={logo}
          alt="Golper Box"
          className="mx-auto w-40 drop-shadow-xl transition-transform transform hover:scale-110 hover:brightness-110 duration-300"
        />

        {/* Headline */}
        <h1 className="text-5xl font-bold tracking-tight">Coming Soon</h1>
        <p className="text-xl text-gray-100 italic">
          Every box has a different story 🎁
        </p>

        {/* Early Subscribers Section */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-4 text-lg font-semibold text-gray-100">
          <p>✨ Early subscribers get a 10% bonus on their first box! 🎉</p>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 text-white font-mono text-sm sm:text-lg">
          {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
            <div key={unit} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 shadow-md">
              <div className="text-2xl font-semibold">
                {timeLeft[unit as keyof typeof timeLeft]}
              </div>
              <div className="uppercase tracking-widest text-xs">{unit}</div>
            </div>
          ))}
        </div>

        {/* Email and Phone Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-5 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder-white w-full sm:w-72 focus:outline-none shadow-md"
          />
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="px-5 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder-white w-full sm:w-72 focus:outline-none shadow-md"
          />
          <button
            type="submit"
            className="bg-white cursor-pointer text-[#006F94] font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-all shadow-md"
          >
            Notify Me
          </button>
        </form>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-6 text-white text-xl">
          <a href="https://www.facebook.com/golperbox" target="_blank" rel="noreferrer" className="hover:text-gray-300">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/golperbox" target="_blank" rel="noreferrer" className="hover:text-gray-300">
            <FaInstagram />
          </a>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-300 pt-4">&copy; {new Date().getFullYear()} Golper Box. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ComingSoon;

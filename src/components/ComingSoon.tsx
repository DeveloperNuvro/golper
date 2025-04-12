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

  useEffect(() => {
    const targetDate = new Date('2025-04-30T00:00:00');

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!phoneNumber) {
      toast.error('Please enter a valid phone number.');
      return;
    }

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfq0de5TGD7Y2Eu5M_qC5-yKt5bXLfeoWyb2x10vWKdyfzIYQ/formResponse';

    const formData = new FormData();
    formData.append('entry.914538286', email);
    formData.append('entry.402855719', phoneNumber);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
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
    <div className="bg-gradient-to-br from-[#0078a3] via-[#004f68] to-[#002f40] min-h-screen flex items-center justify-center text-white px-4 py-10 relative overflow-hidden">
      <Toaster />
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('/confetti.svg')] bg-cover bg-center z-0" />

      <div className="relative z-10 max-w-3xl w-full text-center space-y-8">
        <img
          src={logo}
          alt="Golper Box"
          className="mx-auto w-40 drop-shadow-xl transition-transform hover:scale-110 hover:brightness-110 duration-300"
        />

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Coming Soon</h1>
        <p className="text-lg sm:text-xl text-gray-100 italic">
          Every box has a different story 🎁
        </p>

        <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-4 text-lg font-semibold text-gray-100">
          <p>✨ Early subscribers get a 10% bonus on their first box! 🎉</p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-4 text-white font-mono text-sm sm:text-lg">
          {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
            <div key={unit} className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 shadow-md w-full text-center">
              <div className="text-2xl font-semibold">
                {timeLeft[unit as keyof typeof timeLeft]}
              </div>
              <div className="uppercase tracking-widest text-xs">{unit}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
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
            className="bg-white text-[#006F94] font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-all shadow-md"
          >
            Notify Me
          </button>
        </form>

        {/* Golper Box Description */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 text-left text-sm sm:text-base leading-relaxed text-white space-y-4 mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center">🌟 গোলপের বক্স কী?</h2>
          <p>
            Golper Box মানে হলো প্রতি মাসে একটি সারপ্রাইজে ভরা উপহারের বাক্স — যেখানে থাকে আনন্দ, আবিষ্কার, আর গল্প! 🎁✨
          </p>
          <p>
            প্রতিটি বাক্সে আমরা বেছে নিই দারুণ কিছু প্রিমিয়াম পণ্য — যেমন ছোট গ্যাজেট, বিউটি প্রোডাক্ট, লোকাল হ্যান্ডমেইড আইটেম, সেলফ-কেয়ার জিনিসপত্র ও মজার কিছু চমক! প্রতিটি বক্স যেন একটি নতুন গল্প বলার মতোই।
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>🎉 প্রতি মাসে নতুন চমক</li>
            <li>🌙 ঋতু ও উৎসবভিত্তিক থিম</li>
            <li>💌 আপনার পছন্দ অনুযায়ী কাস্টমাইজড</li>
            <li>🤝 লোকাল ক্রিয়েটিভদের সাপোর্ট</li>
            <li>💎 প্রিমিয়াম, কিন্তু সাশ্রয়ী — শুরু মাত্র ১২৯৯ টাকায়!</li>
          </ul>
          <p className="text-center font-semibold text-yellow-300">
            📦 চলুন, সারপ্রাইজের জগতে যাত্রা শুরু হোক!
            আজই Golper Box ফ্যামিলিতে যুক্ত হন। কারণ, জীবন মানেই তো ছোট ছোট আনন্দে ভরা গল্প! 💛
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-6 text-white text-xl">
          <a href="https://www.facebook.com/golperbox" target="_blank" rel="noreferrer" className="hover:text-gray-300">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/golperbox" target="_blank" rel="noreferrer" className="hover:text-gray-300">
            <FaInstagram />
          </a>
        </div>

        <p className="text-sm text-gray-300 pt-4">&copy; {new Date().getFullYear()} Golper Box. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ComingSoon;

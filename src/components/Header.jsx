import React from 'react';
import { Phone, Calendar, MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-600 text-white grid place-items-center font-bold">CS</div>
          <div>
            <p className="text-lg font-semibold leading-none">ClearSound Clinic</p>
            <p className="text-xs text-slate-500 leading-none mt-1">Ear, Speech & Hearing Care</p>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#services" className="text-slate-700 hover:text-sky-700">Services</a>
          <a href="#book" className="text-slate-700 hover:text-sky-700">Book</a>
          <a href="#contact" className="text-slate-700 hover:text-sky-700">Contact</a>
        </nav>
        <div className="hidden lg:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-slate-600"><MapPin className="h-4 w-4"/>Downtown Medical Plaza</div>
          <a href="#book" className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"><Calendar className="h-4 w-4"/>Book Now</a>
          <a href="tel:+1234567890" className="inline-flex items-center gap-2 text-slate-700 hover:text-sky-700"><Phone className="h-4 w-4"/>+1 (234) 567-890</a>
        </div>
        <a href="#book" className="md:hidden inline-flex items-center gap-2 bg-sky-600 text-white px-3 py-2 rounded-lg"><Calendar className="h-4 w-4"/>Book</a>
      </div>
    </header>
  );
};

export default Header;

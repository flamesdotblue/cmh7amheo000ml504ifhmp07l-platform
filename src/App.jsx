import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AppointmentForm from './components/AppointmentForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-800">
      <Header />
      <main>
        <Hero />
        <Services />
        <AppointmentForm />
      </main>
      <footer className="border-t mt-16">
        <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} ClearSound Ear & Speech Clinic. All rights reserved.</p>
          </div>
          <div className="flex justify-start md:justify-end gap-6 text-sm text-slate-600">
            <a href="#services" className="hover:text-slate-900">Services</a>
            <a href="#book" className="hover:text-slate-900">Book Appointment</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

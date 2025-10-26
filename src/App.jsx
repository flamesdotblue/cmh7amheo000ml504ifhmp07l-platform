import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingWizard from './components/BookingWizard';

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const route = useMemo(() => {
    const clean = hash.replace(/^#/, '') || '/';
    return clean;
  }, [hash]);
  return route;
}

function App() {
  const route = useHashRoute();
  const isBooking = route.startsWith('/book');

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-800">
      <Header />
      <main>
        {isBooking ? (
          <section className="py-10">
            <div className="max-w-7xl mx-auto px-6">
              <BookingWizard />
            </div>
          </section>
        ) : (
          <>
            <Hero />
            <Services />
          </>
        )}
      </main>
      <footer className="border-t mt-16">
        <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} ClearSound Ear & Speech Clinic. All rights reserved.</p>
          </div>
          <div className="flex justify-start md:justify-end gap-6 text-sm text-slate-600">
            <a href="#/" className="hover:text-slate-900">Home</a>
            <a href="#/book" className="hover:text-slate-900">Book Appointment</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

import React from 'react';
import { CheckCircle, Phone, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-100 blur-3xl"/>
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-100 blur-3xl"/>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Comprehensive Care for Ear, Speech and Hearing</h1>
          <p className="mt-5 text-lg text-slate-600">From hearing evaluations to speech therapy, our specialists provide personalized treatment plans for children and adults.</p>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5"/>Certified audiologists and speech-language pathologists</li>
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5"/>Latest diagnostic equipment and therapy methods</li>
            <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5"/>Family-friendly, accessible clinic</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#book" className="inline-flex items-center justify-center gap-2 bg-sky-600 text-white px-5 py-3 rounded-xl hover:bg-sky-700 transition">Book an Appointment</a>
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-slate-700 hover:bg-slate-50 transition"><Phone className="h-4 w-4"/>Call us</a>
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-slate-700 hover:bg-slate-50 transition"><Mail className="h-4 w-4"/>Email</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-white border shadow-sm overflow-hidden">
            <div className="h-full w-full grid place-items-center p-8">
              <div className="text-center">
                <div className="mx-auto h-28 w-28 rounded-full bg-sky-50 border grid place-items-center text-sky-600 text-4xl font-bold">CS</div>
                <p className="mt-6 text-slate-700 text-lg">Your hearing and voice matter. We’re here to help you connect clearly.</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white border shadow rounded-xl p-4 hidden md:block">
            <p className="text-sm font-medium text-slate-700">Open: Mon–Sat</p>
            <p className="text-xs text-slate-500">9:00 AM – 6:00 PM</p>
          </div>
        </div>
      </div>
      <div id="contact" className="max-w-7xl mx-auto px-6 pb-2 grid md:grid-cols-3 gap-4">
        <a href="tel:+1234567890" className="flex items-center gap-3 bg-white border rounded-xl p-4 hover:shadow-sm">
          <Phone className="h-5 w-5 text-sky-600"/>
          <div>
            <p className="text-sm font-medium">Call</p>
            <p className="text-xs text-slate-500">+1 (234) 567-890</p>
          </div>
        </a>
        <a href="mailto:hello@clearsoundclinic.com" className="flex items-center gap-3 bg-white border rounded-xl p-4 hover:shadow-sm">
          <Mail className="h-5 w-5 text-sky-600"/>
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-xs text-slate-500">hello@clearsoundclinic.com</p>
          </div>
        </a>
        <div className="flex items-center gap-3 bg-white border rounded-xl p-4">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">•</span>
          <div>
            <p className="text-sm font-medium">Same-week appointments</p>
            <p className="text-xs text-slate-500">Subject to availability</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

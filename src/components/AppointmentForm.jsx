import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const AppointmentForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const services = [
    'Hearing Evaluation',
    'Speech & Language Therapy',
    'Hearing Aids & Fittings',
    'Newborn & School Screenings'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!/^\+?[0-9\-\s]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number.';
    if (!form.service) e.service = 'Select a service.';
    if (!form.date) e.date = 'Choose a preferred date.';
    if (!form.time) e.time = 'Choose a preferred time.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length === 0) {
      setSubmitted(true);
      // Simulate sending to backend
      setTimeout(() => {
        alert(`Thank you, ${form.name}! We\n\nService: ${form.service}\nPreferred: ${form.date} at ${form.time}\n\nWe will contact you at ${form.email}.`);
      }, 200);
    }
  };

  return (
    <section id="book" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-slate-900">Book an appointment</h2>
          <p className="mt-3 text-slate-600">Share your details and preferred time. Our team will confirm your visit shortly.</p>
        </div>
        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white border rounded-2xl p-6 grid gap-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.name ? 'border-rose-400' : 'border-slate-200'}`} placeholder="Jane Doe"/>
                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.email ? 'border-rose-400' : 'border-slate-200'}`} placeholder="you@example.com"/>
                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone</label>
                <input id="phone" name="phone" value={form.phone} onChange={handleChange} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.phone ? 'border-rose-400' : 'border-slate-200'}`} placeholder="+1 234 567 890"/>
                {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-700">Service</label>
                <select id="service" name="service" value={form.service} onChange={handleChange} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.service ? 'border-rose-400' : 'border-slate-200'}`}>
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && <p className="mt-1 text-xs text-rose-600">{errors.service}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700">Preferred date</label>
                <input id="date" type="date" name="date" value={form.date} onChange={handleChange} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.date ? 'border-rose-400' : 'border-slate-200'}`} />
                {errors.date && <p className="mt-1 text-xs text-rose-600">{errors.date}</p>}
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-slate-700">Preferred time</label>
                <input id="time" type="time" name="time" value={form.time} onChange={handleChange} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.time ? 'border-rose-400' : 'border-slate-200'}`} />
                {errors.time && <p className="mt-1 text-xs text-rose-600">{errors.time}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">Additional notes</label>
              <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Tell us about symptoms or goals (optional)" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">By booking, you agree to our scheduling policies.</p>
              <button type="submit" className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-3 rounded-xl hover:bg-sky-700 transition"><Calendar className="h-4 w-4"/>Request Appointment</button>
            </div>
            {submitted && (
              <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">Your request has been received. We will reach out shortly to confirm.</p>
            )}
          </form>
          <aside className="bg-gradient-to-br from-sky-50 to-white border rounded-2xl p-6">
            <h3 className="text-lg font-medium text-slate-900">Clinic hours</h3>
            <ul className="mt-3 text-sm text-slate-700 space-y-1">
              <li>Mon – Sat: 9:00 AM – 6:00 PM</li>
              <li>Sun: Closed</li>
            </ul>
            <h3 className="mt-6 text-lg font-medium text-slate-900">Location</h3>
            <p className="mt-2 text-sm text-slate-700">Suite 305, Downtown Medical Plaza<br/>123 Wellness Street, River City</p>
            <div className="mt-6 rounded-xl overflow-hidden border">
              <iframe title="map" className="w-full h-56" src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1357%2C51.509%2C-0.087%2C51.529&layer=mapnik" />
            </div>
            <h3 className="mt-6 text-lg font-medium text-slate-900">Insurance & Payments</h3>
            <p className="mt-2 text-sm text-slate-700">We accept major insurance plans and offer flexible payment options. Contact us for details.</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;

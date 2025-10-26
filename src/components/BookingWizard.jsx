import React, { useMemo, useState } from 'react';
import { Calendar, CreditCard, User, CheckCircle } from 'lucide-react';

const services = [
  'Hearing Evaluation',
  'Speech & Language Therapy',
  'Hearing Aids & Fittings',
  'Newborn & School Screenings'
];

const StepIndicator = ({ step }) => {
  const steps = [
    { id: 1, label: 'Personal details', icon: <User className="h-4 w-4"/> },
    { id: 2, label: 'Date & time', icon: <Calendar className="h-4 w-4"/> },
    { id: 3, label: 'Payment', icon: <CreditCard className="h-4 w-4"/> },
  ];
  return (
    <ol className="flex flex-col md:flex-row md:items-center gap-4">
      {steps.map((s, idx) => {
        const active = step === s.id;
        const complete = step > s.id;
        return (
          <li key={s.id} className="flex items-center gap-3">
            <span className={`h-8 w-8 rounded-full grid place-items-center text-xs font-medium border ${complete ? 'bg-emerald-600 text-white border-emerald-600' : active ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-600 border-slate-200'}`}>
              {complete ? <CheckCircle className="h-4 w-4"/> : s.icon}
            </span>
            <span className={`text-sm ${active ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{s.label}</span>
            {idx < steps.length - 1 && <span className="hidden md:inline-block mx-4 h-px w-12 bg-slate-200"/>}
          </li>
        );
      })}
    </ol>
  );
};

const Summary = ({ data }) => {
  return (
    <aside className="bg-gradient-to-br from-sky-50 to-white border rounded-2xl p-6">
      <h3 className="text-lg font-medium text-slate-900">Summary</h3>
      <dl className="mt-4 text-sm text-slate-700 space-y-2">
        <div className="flex justify-between"><dt>Name</dt><dd className="font-medium">{data.name || '-'}</dd></div>
        <div className="flex justify-between"><dt>Email</dt><dd>{data.email || '-'}</dd></div>
        <div className="flex justify-between"><dt>Phone</dt><dd>{data.phone || '-'}</dd></div>
        <div className="flex justify-between"><dt>Service</dt><dd>{data.service || '-'}</dd></div>
        <div className="flex justify-between"><dt>Date</dt><dd>{data.date || '-'}</dd></div>
        <div className="flex justify-between"><dt>Time</dt><dd>{data.time || '-'}</dd></div>
      </dl>
      <div className="mt-6 p-4 rounded-xl border bg-white">
        <p className="text-sm text-slate-700">Consultation fee</p>
        <p className="text-2xl font-semibold text-slate-900 mt-1">$65</p>
        <p className="text-xs text-slate-500 mt-1">Billed once at booking; applied to visit.</p>
      </div>
    </aside>
  );
};

const BookingWizard = () => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});

  const setField = (name, value) => setData((d) => ({ ...d, [name]: value }));

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!data.name.trim()) e.name = 'Enter your full name';
      if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'Enter a valid email';
      if (!/^\+?[0-9\-\s]{7,15}$/.test(data.phone)) e.phone = 'Enter a valid phone';
    } else if (s === 2) {
      if (!data.service) e.service = 'Select a service';
      if (!data.date) e.date = 'Choose a date';
      if (!data.time) e.time = 'Choose a time';
    } else if (s === 3) {
      if (!data.cardName.trim()) e.cardName = 'Name on card is required';
      const digits = data.cardNumber.replace(/\s+/g, '');
      if (!/^\d{12,19}$/.test(digits)) e.cardNumber = 'Enter a valid card number';
      if (!/^\d{2}\/\d{2}$/.test(data.expiry)) e.expiry = 'Use MM/YY';
      if (!/^\d{3,4}$/.test(data.cvc)) e.cvc = '3–4 digits';
      if (!e.expiry) {
        const [mm, yy] = data.expiry.split('/');
        const month = Number(mm);
        const year = 2000 + Number(yy);
        const now = new Date();
        const exp = new Date(year, month);
        if (month < 1 || month > 12 || exp <= now) e.expiry = 'Card expired';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const maskCard = (v) => v.replace(/[^\d]/g, '').slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  const normalizeExpiry = (v) => {
    const digits = v.replace(/[^\d]/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + '/' + digits.slice(2);
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
  };
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const handlePay = async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSuccess(true);
  };

  const StepOne = (
    <div className="grid gap-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">Full name</label>
          <input value={data.name} onChange={(e)=>setField('name', e.target.value)} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.name ? 'border-rose-400' : 'border-slate-200'}`} placeholder="Jane Doe" />
          {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Phone</label>
          <input value={data.phone} onChange={(e)=>setField('phone', e.target.value)} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.phone ? 'border-rose-400' : 'border-slate-200'}`} placeholder="+1 234 567 890" />
          {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input type="email" value={data.email} onChange={(e)=>setField('email', e.target.value)} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.email ? 'border-rose-400' : 'border-slate-200'}`} placeholder="you@example.com" />
        {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Notes (optional)</label>
        <textarea rows={4} onChange={(e)=>setField('notes', e.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Tell us about symptoms or goals" />
      </div>
    </div>
  );

  const StepTwo = (
    <div className="grid gap-5">
      <div>
        <label className="block text-sm font-medium text-slate-700">Service</label>
        <select value={data.service} onChange={(e)=>setField('service', e.target.value)} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.service ? 'border-rose-400' : 'border-slate-200'}`}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-xs text-rose-600">{errors.service}</p>}
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">Preferred date</label>
          <input type="date" value={data.date} onChange={(e)=>setField('date', e.target.value)} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.date ? 'border-rose-400' : 'border-slate-200'}`} />
          {errors.date && <p className="mt-1 text-xs text-rose-600">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Preferred time</label>
          <input type="time" value={data.time} onChange={(e)=>setField('time', e.target.value)} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.time ? 'border-rose-400' : 'border-slate-200'}`} />
          {errors.time && <p className="mt-1 text-xs text-rose-600">{errors.time}</p>}
        </div>
      </div>
      <p className="text-xs text-slate-500">We’ll confirm availability by email or phone shortly after booking.</p>
    </div>
  );

  const StepThree = (
    <div className="grid gap-5">
      <div>
        <label className="block text-sm font-medium text-slate-700">Name on card</label>
        <input value={data.cardName} onChange={(e)=>setField('cardName', e.target.value)} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.cardName ? 'border-rose-400' : 'border-slate-200'}`} placeholder="Jane Doe" />
        {errors.cardName && <p className="mt-1 text-xs text-rose-600">{errors.cardName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Card number</label>
        <input inputMode="numeric" value={data.cardNumber} onChange={(e)=>setField('cardNumber', maskCard(e.target.value))} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.cardNumber ? 'border-rose-400' : 'border-slate-200'}`} placeholder="4242 4242 4242 4242" />
        {errors.cardNumber && <p className="mt-1 text-xs text-rose-600">{errors.cardNumber}</p>}
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">Expiry (MM/YY)</label>
          <input inputMode="numeric" value={data.expiry} onChange={(e)=>setField('expiry', normalizeExpiry(e.target.value))} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.expiry ? 'border-rose-400' : 'border-slate-200'}`} placeholder="MM/YY" />
          {errors.expiry && <p className="mt-1 text-xs text-rose-600">{errors.expiry}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">CVC</label>
          <input inputMode="numeric" value={data.cvc} onChange={(e)=>setField('cvc', e.target.value.replace(/[^\d]/g, '').slice(0,4))} className={`mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.cvc ? 'border-rose-400' : 'border-slate-200'}`} placeholder="123" />
          {errors.cvc && <p className="mt-1 text-xs text-rose-600">{errors.cvc}</p>}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">Your payment is processed securely.</p>
        <button onClick={handlePay} disabled={submitting} className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-3 rounded-xl hover:bg-sky-700 transition disabled:opacity-60">
          {submitting ? 'Processing…' : 'Pay & Confirm'}
        </button>
      </div>
    </div>
  );

  const content = useMemo(() => {
    if (success) {
      return (
        <div className="bg-white border rounded-2xl p-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center">
            <CheckCircle className="h-7 w-7"/>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Appointment confirmed</h2>
          <p className="mt-2 text-slate-600">Thank you, {data.name}. We’ve sent a confirmation to {data.email}. See you on {data.date} at {data.time}.</p>
          <a href="#/" className="mt-6 inline-block px-5 py-2 rounded-lg border hover:bg-slate-50">Back to home</a>
        </div>
      );
    }
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-900">Book an appointment</h1>
            <span className="text-sm text-slate-500">Step {step} of 3</span>
          </div>
          <div className="mt-6">
            <StepIndicator step={step} />
          </div>
          <div className="mt-8">
            {step === 1 && StepOne}
            {step === 2 && StepTwo}
            {step === 3 && StepThree}
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button onClick={handleBack} disabled={step === 1} className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50 disabled:opacity-50">Back</button>
            {step < 3 && (
              <button onClick={handleNext} className="px-5 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">Continue</button>
            )}
          </div>
        </div>
        <Summary data={data} />
      </div>
    );
  }, [StepOne, StepTwo, StepThree, data, step, success]);

  return (
    <div>
      {content}
    </div>
  );
};

export default BookingWizard;

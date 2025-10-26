import React from 'react';
import { Mic, Headphones, Calendar } from 'lucide-react';

const services = [
  {
    icon: <Headphones className="h-6 w-6 text-sky-600" />,
    title: 'Hearing Evaluation',
    desc: 'Comprehensive audiometry, tympanometry, and otoacoustic emissions for adults and children.'
  },
  {
    icon: <Mic className="h-6 w-6 text-sky-600" />,
    title: 'Speech & Language Therapy',
    desc: 'Evidence-based therapy for articulation, fluency, language delays, and voice disorders.'
  },
  {
    icon: <Headphones className="h-6 w-6 text-sky-600" />,
    title: 'Hearing Aids & Fittings',
    desc: 'Device selection, real-ear measurements, fittings, and follow-up tuning for optimal outcomes.'
  },
  {
    icon: <Calendar className="h-6 w-6 text-sky-600" />,
    title: 'Newborn & School Screenings',
    desc: 'On-site hearing and speech screening programs for early identification and intervention.'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-slate-900">Services we offer</h2>
          <p className="mt-3 text-slate-600">We provide end-to-end ear and speech care with a gentle, patient-first approach.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div key={i} className="bg-white border rounded-2xl p-6 hover:shadow-sm transition">
              <div className="h-10 w-10 rounded-lg bg-sky-50 grid place-items-center mb-4">
                {s.icon}
              </div>
              <h3 className="font-medium text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

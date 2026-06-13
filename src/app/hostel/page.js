import { Home, Shield, Wifi, Coffee, BookOpen, Users, CheckCircle2 } from 'lucide-react';

export default function Hostel() {
  const features = [
    { icon: Home, title: 'Comfortable Rooms', desc: 'Well-maintained residential rooms with premium bedding, ample storage, and quiet study spaces.' },
    { icon: Shield, title: 'Student Support & Security', desc: '24/7 supervision, security personnel, health support, and structured routines for a healthy hostel life.' },
    { icon: Wifi, title: 'High-Speed Wi-Fi', desc: 'Seamless internet connectivity in common areas to support research and digital learning.' },
    { icon: BookOpen, title: 'Study Zones', desc: 'Supervised study halls and library access to ensure a focused academic environment.' }
  ];

  const inclusions = [
    'Separate wings for boys and girls',
    'Nutritious meals (Breakfast, Lunch, Dinner, Snacks)',
    'Laundry and housekeeping support',
    'Recreational spaces for indoor games',
    'Regular health checkups and on-call doctor'
  ];

  return (
    <section className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Section */}
      <div className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">SORA Hostel Facilities</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Experience a home away from home. Safe, comfortable student housing with dedicated support, modern amenities, and a vibrant community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          
          {/* Left Column: Features */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Coffee className="w-7 h-7 text-schoolBlue" />
                Living & Learning
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {features.map((item, i) => (
                  <div key={i} className="group p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-schoolBlue/20">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-schoolBlue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inclusions & Stats */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                What's Included
              </h3>
              <ul className="space-y-4">
                {inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-orange-100 text-schoolOrange flex items-center justify-center mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-slate-900">500+</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Capacity</div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-slate-900">24/7</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Security</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

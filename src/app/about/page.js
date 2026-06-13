import { Target, Eye, Award, Book, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function About() {
  const values = [
    { icon: Book, title: 'Academic Excellence', desc: 'A rigorous curriculum designed to challenge and inspire.' },
    { icon: Heart, title: 'Compassionate Leadership', desc: 'Fostering empathy, teamwork, and social responsibility.' },
    { icon: ShieldCheck, title: 'Secure Student Support', desc: 'Providing a safe and nurturing environment for all.' }
  ];

  return (
    <section className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-schoolBlue text-white py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-schoolBlue to-blue-800"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">About SORA Maheikol</h1>
          <p className="text-lg md:text-xl text-blue-100 font-light leading-relaxed">
            Combining modern curriculum, strong academic support, and vibrant campus life to help students thrive in examinations and excel in life.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 -mt-16 relative z-20">
        
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-blue-50 text-schoolBlue rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              To empower each student with knowledge, confidence, and strong values so they can succeed academically and socially. We strive to provide a holistic education that caters to the intellectual, physical, and emotional development of our students.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-orange-50 text-schoolOrange rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              To create an inclusive, innovative learning environment that prepares students for academic excellence, leadership opportunities, and lifelong growth. We envision our graduates as responsible global citizens who contribute meaningfully to society.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 mb-16 shadow-2xl text-center grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">25+</div>
            <div className="text-slate-400 font-medium text-sm uppercase tracking-wider">Years of Excellence</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">1000+</div>
            <div className="text-slate-400 font-medium text-sm uppercase tracking-wider">Active Students</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">80+</div>
            <div className="text-slate-400 font-medium text-sm uppercase tracking-wider">Expert Teachers</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">100%</div>
            <div className="text-slate-400 font-medium text-sm uppercase tracking-wider">Success Rate</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* Core Values */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Core Values</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((val, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
                  <div className="w-12 h-12 mx-auto bg-slate-50 text-schoolBlue rounded-full flex items-center justify-center mb-4">
                    <val.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{val.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-schoolOrange" />
              <h3 className="text-xl font-bold text-slate-900">Why Choose Us?</h3>
            </div>
            <ul className="space-y-5">
              {[
                'Seamless exam registration and admit card delivery',
                'Real-time fee tracking with responsive support',
                'A complete portal for students, teachers, and admins',
                'State-of-the-art hostel & campus facilities'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

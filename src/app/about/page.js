export const metadata = {
  title: "About Springfield School | Springfield School Portal",
  description: "Learn about Springfield School of Excellence's mission, vision, and core values.",
};

export default function About() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="rounded-[2rem] bg-white p-10 shadow-soft">
          <h2 className="text-3xl font-semibold text-slate-900">About Springfield School</h2>
          <p className="mt-4 text-slate-600">Springfield School of Excellence combines modern curriculum, strong academic support, and campus life activities to help students thrive in exams and beyond.</p>
          <div className="mt-10 grid gap-6">
            <div className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900">Our Mission</h3>
              <p className="mt-4 text-slate-600">Empower each student with knowledge, confidence, and strong values so they can succeed academically and socially.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900">Our Vision</h3>
              <p className="mt-4 text-slate-600">Create an inclusive learning environment that prepares students for exams, leadership opportunities, and lifelong growth.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-schoolBlue p-8 text-white shadow-soft">
            <h3 className="text-2xl font-semibold">Core Values</h3>
            <ul className="mt-6 space-y-4 text-sm leading-7">
              <li>• Academic Excellence</li>
              <li>• Compassionate Leadership</li>
              <li>• Secure Student Support</li>
            </ul>
          </div>
          <div className="rounded-[2rem] bg-slate-50 p-8 shadow-soft">
            <h3 className="text-2xl font-semibold text-slate-900">Why Choose Us?</h3>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li>• Seamless exam registration and admit card delivery.</li>
              <li>• Real-time fee tracking with responsive support.</li>
              <li>• A complete portal for students, teachers, and admins.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

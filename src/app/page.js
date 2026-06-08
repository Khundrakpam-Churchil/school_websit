import Link from 'next/link';
import InfoCards from '@/components/InfoCards';
import Slider from '@/components/Slider';

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full bg-schoolBlue/10 px-4 py-2 text-sm font-semibold text-schoolBlue">
            Welcome to the Springfield Exam Portal
          </div>
          <h1 className="mt-8 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Manage exam registration, fees, and campus notices in one modern school portal.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Secure student login, dynamic announcement boards, fee tracking, admit card downloads, and an interactive gallery — all built to keep students and staff connected.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/registration" className="rounded-full bg-schoolBlue px-6 py-3 text-white shadow-lg shadow-schoolBlue/10 hover:bg-blue-600">
              Start Registration
            </Link>
            <Link href="/notice" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-700 hover:border-schoolBlue hover:text-schoolBlue">
              Latest Notices
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-schoolOrange">Active</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">420+</p>
              <p className="mt-2 text-sm text-slate-600">Students registered</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-schoolBlue">Trusted</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">150+</p>
              <p className="mt-2 text-sm text-slate-600">Notices published</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-schoolGreen">Secure</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">100%</p>
              <p className="mt-2 text-sm text-slate-600">Uptime for portal access</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-gradient-to-br from-schoolBlue to-schoolOrange p-1 shadow-soft">
            <div className="rounded-[2rem] bg-white p-8">
              <h2 className="text-2xl font-semibold text-slate-900">School Portal Benefits</h2>
              <ul className="mt-6 space-y-4 text-slate-600">
                <li>• Faster exam registration with one secure login.</li>
                <li>• Fee tracking, admit card downloads, and live notifications.</li>
                <li>• Beautiful campus gallery for students and parents.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-slate-900">Portal Quick Links</h3>
            <div className="mt-6 grid gap-4">
              <Link href="/dashboard" className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 hover:border-schoolBlue hover:text-schoolBlue">Student Dashboard</Link>
              <Link href="/academics" className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 hover:border-schoolBlue hover:text-schoolBlue">Admit Card & Exams</Link>
              <Link href="/notice" className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 hover:border-schoolBlue hover:text-schoolBlue">Notice Board</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Slider />
      </div>

      <div className="mt-16">
        <InfoCards />
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Notice Board</h3>
          <p className="mt-4 text-slate-600">Stay up to date with exam schedules, campus news, and student announcements.</p>
          <Link href="/notice" className="mt-6 inline-flex items-center text-schoolBlue font-medium">Open Notices</Link>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Fee & Admit Card</h3>
          <p className="mt-4 text-slate-600">Check your fee status and download the admit card as soon as your payment clears.</p>
          <Link href="/fee" className="mt-6 inline-flex items-center text-schoolBlue font-medium">Check Fee Status</Link>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Campus Gallery</h3>
          <p className="mt-4 text-slate-600">Explore campus life through photos of events, classrooms, and hostel facilities.</p>
          <Link href="/gallery" className="mt-6 inline-flex items-center text-schoolBlue font-medium">Browse Gallery</Link>
        </div>
      </div>
    </section>
  );
}

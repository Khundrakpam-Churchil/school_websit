import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Springfield School</h3>
          <p className="text-slate-400">A modern exam portal for students, staff, and administrators with fast access to registration, fees, admit cards, and campus information.</p>
          <p className="text-sm text-slate-500">© 2026 Springfield School. All rights reserved.</p>
        </div>

        <div className="grid gap-4">
          <h4 className="font-semibold text-white">Quick Links</h4>
          <Link to="/registration" className="text-slate-300 hover:text-schoolBlue">Registration</Link>
          <Link to="/notice" className="text-slate-300 hover:text-schoolBlue">Notices</Link>
          <Link to="/gallery" className="text-slate-300 hover:text-schoolBlue">Gallery</Link>
          <Link to="/fee" className="text-slate-300 hover:text-schoolBlue">Fee Status</Link>
        </div>

        <div className="grid gap-4">
          <h4 className="font-semibold text-white">Contact</h4>
          <p className="text-slate-300">Springfield School of Excellence</p>
          <p className="text-slate-300">Phone: +1 (555) 123-4567</p>
          <p className="text-slate-300">Email: admin@springfieldschool.edu</p>
        </div>
      </div>
    </footer>
  );
}

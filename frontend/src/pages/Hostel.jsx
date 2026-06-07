export default function Hostel() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-10 shadow-soft">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Hostel Facilities</h2>
            <p className="mt-4 text-slate-600">Experience safe, comfortable student housing with dedicated support, study zones, and modern amenities.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-semibold text-slate-900">Comfortable Rooms</h3>
                <p className="mt-4 text-slate-600">Well-maintained residential rooms with bedding, storage, and quiet study spaces.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-semibold text-slate-900">Student Support</h3>
                <p className="mt-4 text-slate-600">24/7 supervision, health support, and structured routines for a healthy hostel life.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-schoolBlue/5 p-8">
            <h3 className="text-2xl font-semibold text-slate-900">What’s included</h3>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li>• Separate wings for boys and girls.</li>
              <li>• High-speed Wi-Fi in common areas.</li>
              <li>• Supervised study halls and recreational spaces.</li>
              <li>• Nutritious meals and laundry support.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

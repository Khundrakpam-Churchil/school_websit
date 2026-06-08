export const metadata = {
  title: "Student Registration | Springfield School Portal",
  description: "Learn how to register as a student, submit documents, and gain portal access.",
};

export default function Registration() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-10 shadow-soft">
        <h2 className="text-3xl font-semibold text-slate-900">Student Registration</h2>
        <p className="mt-4 text-slate-600">Follow the portal guidance to register as a new student and access exam resources quickly.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 text-slate-600">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">How to register</h3>
              <p className="mt-4">New admissions begin by connecting with the administration office and submitting required documents. After approval, you will receive a registration number and portal access.</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h4 className="text-lg font-semibold text-slate-900">Required documents</h4>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Birth certificate</li>
                <li>Previous academic records</li>
                <li>Identity proof and address proof</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] bg-schoolBlue p-8 text-white">
            <h3 className="text-xl font-semibold">Need help?</h3>
            <p className="mt-4 text-slate-100">Contact our admissions office for step-by-step support and portal access information.</p>
            <div className="mt-6 space-y-4 text-sm text-slate-200">
              <p>Phone: +1 (555) 123-4567</p>
              <p>Email: admissions@springfieldschool.edu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

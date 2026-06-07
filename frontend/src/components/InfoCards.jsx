import { Link } from 'react-router-dom';

const cards = [
  {
    title: "Director's Message",
    summary: 'Our school prepares each student to thrive with values, leadership, and academic confidence.',
    link: '/about',
  },
  {
    title: "Principal's Message",
    summary: 'We build a supportive learning community that blends discipline, creativity, and compassion.',
    link: '/about',
  },
  {
    title: 'About School',
    summary: 'Springfield School offers modern curriculum, strong exam support, and enrichment programs.',
    link: '/about',
  },
];

export default function InfoCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {cards.map((card) => (
        <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-schoolBlue/10 text-schoolBlue text-xl font-semibold">•</div>
          <h3 className="mt-5 text-xl font-semibold text-slate-900">{card.title}</h3>
          <p className="mt-4 text-slate-600">{card.summary}</p>
          <Link to={card.link} className="mt-6 inline-flex items-center text-schoolBlue font-medium">
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}

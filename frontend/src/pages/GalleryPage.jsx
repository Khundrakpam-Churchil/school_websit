import { useEffect, useState } from 'react';

const categories = ['All', 'Campus', 'Classrooms', 'Sports', 'Hostel', 'Events'];

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setGallery(data.gallery);
      });
  }, []);

  const filteredGallery = activeCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-10 shadow-soft">
        <h2 className="text-3xl font-semibold text-slate-900">Gallery</h2>
        <p className="mt-4 text-slate-600">Browse photos from school life, classrooms, events, sports, and hostel facilities.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeCategory === category ? 'bg-schoolBlue text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGallery.length > 0 ? (
            filteredGallery.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img src={item.image_url} alt={item.caption} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-5 text-left">
                  <p className="text-lg font-semibold text-slate-900">{item.caption}</p>
                  <p className="mt-2 text-sm text-slate-500">{item.category}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
              No images available for this category.
            </div>
          )}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 py-10">
          <div className="max-w-4xl w-full overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">{selected.caption}</h3>
                <p className="text-sm text-slate-500">Category: {selected.category}</p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                Close
              </button>
            </div>
            <img src={selected.image_url} alt={selected.caption} className="h-[460px] w-full object-cover" />
          </div>
        </div>
      )}
    </section>
  );
}

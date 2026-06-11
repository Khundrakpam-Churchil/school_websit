import { useState } from 'react';
import { Images, X, ZoomIn } from 'lucide-react';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop', title: 'Graduation Day 2025', category: 'Events' },
  { id: 2, src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop', title: 'Campus Library', category: 'Campus' },
  { id: 3, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop', title: 'Advanced Science Lab', category: 'Academics' },
  { id: 4, src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop', title: 'Annual Sports Day', category: 'Sports' },
  { id: 5, src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop', title: 'Modern Classroom', category: 'Academics' },
  { id: 6, src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop', title: 'Art Exhibition', category: 'Arts' },
  { id: 7, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop', title: 'Music Room', category: 'Arts' },
  { id: 8, src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop', title: 'Study Session', category: 'Academics' },
  { id: 9, src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop', title: 'Computer Lab', category: 'Academics' },
];

const categories = ['All', 'Events', 'Campus', 'Academics', 'Sports', 'Arts'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Campus Gallery</h1>
        <p className="text-slate-500">Explore moments from our vibrant school life.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-schoolBlue text-white shadow-lg shadow-blue-500/25' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-schoolBlue hover:text-schoolBlue'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <div 
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="group relative aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
          >
            <img 
              src={image.src} 
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full mb-2">
                {image.category}
              </span>
              <h3 className="text-white font-bold text-lg">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={selectedImage.src} 
            alt={selectedImage.title}
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
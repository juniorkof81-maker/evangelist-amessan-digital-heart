import { useState } from 'react';
import { X } from 'lucide-react';
import churchInterior from '@/assets/church-interior.jpg';
import gospelChoir from '@/assets/gospel-choir.jpg';
import crossSunset from '@/assets/cross-sunset.jpg';
import bibleStudy from '@/assets/bible-study.jpg';
import jacquesAmes1 from '@/assets/jacques-amessan-1.jpg';
import jacquesAmes2 from '@/assets/jacques-amessan-2.jpg';
import jacquesAmes3 from '@/assets/jacques-amessan-3.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: jacquesAmes1,
      alt: "Évangéliste Jacques Amessan - Portrait officiel",
      title: "Évangéliste Jacques Amessan"
    },
    {
      src: jacquesAmes2,
      alt: "Jacques Amessan lors d'un enseignement",
      title: "Enseignement Spirituel"
    },
    {
      src: jacquesAmes3,
      alt: "La Croissance Spirituelle de Jésus-Christ homme",
      title: "Conférence: La Croissance Spirituelle"
    },
    {
      src: churchInterior,
      alt: "Intérieur de l'église - Service avec le Collectif",
      title: "Service avec le Collectif des Frères"
    },
    {
      src: gospelChoir,
      alt: "Troupe des Prophètes Musiciens (TPM)",
      title: "Collaboration avec TPM"
    },
    {
      src: crossSunset,
      alt: "Croix au coucher du soleil",
      title: "Symbole de Foi"
    },
    {
      src: bibleStudy,
      alt: "Session Puiser la sagesse des proverbes",
      title: "Étude Matinale des Proverbes"
    }
  ];

  return (
    <section id="galerie" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Galerie{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Multimédia
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez à travers ces images l'essence du ministère et l'atmosphère spirituelle 
            qui caractérise le service de l'Évangéliste Jacques Amessan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item group"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Image agrandie"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
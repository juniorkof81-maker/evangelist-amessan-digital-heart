import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimony {
  id: number;
  name: string;
  location: string;
  content: string;
  rating: number;
  image?: string;
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimony[] = [
    {
      id: 1,
      name: "Aminata Kone",
      location: "Abidjan, Côte d'Ivoire",
      content: "Les enseignements de l'Évangéliste Jacques Amessan ont transformé ma vie. Sa sagesse biblique et son approche pratique m'ont aidée à traverser mes moments les plus difficiles.",
      rating: 5
    },
    {
      id: 2,
      name: "Kouadio Michel",
      location: "Bouaké, Côte d'Ivoire",
      content: "Grâce aux prières et à l'accompagnement spirituel de l'Évangéliste, j'ai retrouvé la paix intérieure et la direction divine dans ma vie professionnelle.",
      rating: 5
    },
    {
      id: 3,
      name: "Marie-Claire Ouattara",
      location: "Yamoussoukro, Côte d'Ivoire",
      content: "Les sessions 'Puiser la sagesse des proverbes' ont révolutionné ma compréhension des Écritures. C'est un don de Dieu pour notre génération.",
      rating: 5
    },
    {
      id: 4,
      name: "Ibrahim Traoré",
      location: "San-Pédro, Côte d'Ivoire",
      content: "L'Évangéliste Jacques Amessan porte une onction particulière. Ses messages touchent directement le cœur et apportent une vraie transformation spirituelle.",
      rating: 5
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Témoignages{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Inspirants
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment Dieu agit à travers le ministère de l'Évangéliste Jacques Amessan
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimony) => (
                <div key={testimony.id} className="w-full flex-shrink-0">
                  <Card className="mx-4 bg-card/80 backdrop-blur-sm border-primary/20 shadow-[var(--shadow-soft)]">
                    <CardContent className="p-8 text-center">
                      {/* Quote icon */}
                      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Quote className="h-8 w-8 text-primary" />
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center gap-1 mb-6">
                        {renderStars(testimony.rating)}
                      </div>

                      {/* Content */}
                      <blockquote className="text-lg md:text-xl text-foreground mb-8 italic leading-relaxed">
                        "{testimony.content}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-3">
                          <span className="text-white font-bold text-lg">
                            {testimony.name.charAt(0)}
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground">{testimony.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimony.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-white"
          >
            <ChevronLeft size={20} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-white"
          >
            <ChevronRight size={20} />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-primary/30 hover:bg-primary/60'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              {isAutoPlaying ? 'Défilement automatique' : 'Défilement pausé'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
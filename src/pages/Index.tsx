import { useEffect } from 'react';
import EducationalBanner from '@/components/EducationalBanner';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import Gallery from '@/components/Gallery';
import MusicSection from '@/components/MusicSection';
import VideoSection from '@/components/VideoSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import ChatBot from '@/components/ChatBot';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  useEffect(() => {
    // Animation observer for fade-in effects
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <EducationalBanner />
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <Gallery />
        <MusicSection />
        <VideoSection />
        <TestimonialsCarousel />
        <FAQSection />
        <ContactSection />
      </main>
      
      {/* Floating Action Buttons */}
      <ChatBot />
      <WhatsAppButton />
      
      {/* Footer */}
      <footer className="bg-accent text-accent-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Évangéliste Jacques Amessan</h3>
            <p className="text-accent-foreground/80 mb-6 max-w-2xl mx-auto">
              Serviteur de Dieu dédié à l'évangélisation et à la transformation des vies 
              par la Parole de Dieu en Côte d'Ivoire et au-delà.
            </p>
            
            <div className="border-t border-accent-foreground/20 pt-6">
              <p className="text-sm text-accent-foreground/60">
                © 2024 Évangéliste Jacques Amessan. Tous droits réservés.
              </p>
              <p className="text-xs text-accent-foreground/50 mt-2">
                Portfolio créé à des fins éducatives et de présentation
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
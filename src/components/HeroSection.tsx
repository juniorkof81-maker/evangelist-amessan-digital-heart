import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import heroImage from '@/assets/jacques-amessan-1.jpg';

const HeroSection = () => {
  const scrollToGallery = () => {
    const element = document.getElementById('galerie');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="hero-gradient min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Évangéliste{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Jacques Amessan
              </span>
            </h1>
            
            <div className="mb-4 fade-in">
              <span className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium">
                ✨ Sessions "Puiser la sagesse des proverbes" - Mardi-Vendredi 04h45 GMT
              </span>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              Serviteur de Dieu avec le <strong>Collectif des Frères en Christ</strong> • Côte d'Ivoire
            </p>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border/50">
              <p className="text-foreground/80 leading-relaxed">
                Bienvenue sur le portfolio officiel de l'Évangéliste Jacques Amessan. 
                Découvrez son ministère à travers une collection multimédia de sermons, 
                musiques gospel et moments spirituels qui touchent les cœurs et transforment les vies.
              </p>
              <p className="text-sm text-muted-foreground mt-3 italic">
                *Présentation bio complète disponible avec l'intégration OpenAI
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={scrollToGallery}
                className="btn-divine text-lg px-8 py-3"
              >
                Découvrir le Portfolio
                <ArrowDown className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-3 border-2"
              >
                Prendre Contact
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg"></div>
              <img
                src={heroImage}
                alt="Évangéliste Jacques Amessan"
                className="relative w-full h-auto rounded-xl shadow-[var(--shadow-divine)] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
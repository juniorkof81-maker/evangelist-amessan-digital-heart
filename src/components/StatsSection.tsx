import { useEffect, useState } from 'react';
import { Users, Heart, Calendar, Globe } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
}

const StatsSection = () => {
  const [counters, setCounters] = useState({ lives: 0, prayers: 0, years: 0, countries: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const stats: StatItem[] = [
    { icon: Heart, value: counters.lives, label: "Vies Transformées", suffix: "+" },
    { icon: Users, value: counters.prayers, label: "Prières Exaucées", suffix: "+" },
    { icon: Calendar, value: counters.years, label: "Années de Ministère" },
    { icon: Globe, value: counters.countries, label: "Pays Touchés" }
  ];

  // Animation counter effect
  useEffect(() => {
    const targets = { lives: 5000, prayers: 12000, years: 15, countries: 8 };
    
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const interval = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounters({
          lives: Math.floor(targets.lives * progress),
          prayers: Math.floor(targets.prayers * progress),
          years: Math.floor(targets.years * progress),
          countries: Math.floor(targets.countries * progress)
        });
        
        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            L'Impact de{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Notre Ministère
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez l'impact transformateur de l'Évangéliste Jacques Amessan à travers ces chiffres inspirants.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center fade-in bg-card/50 backdrop-blur-sm rounded-xl p-6 hover:bg-card/80 transition-all duration-300 hover:shadow-[var(--shadow-soft)] ${
                isVisible ? 'animate-scale-in' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value.toLocaleString()}{stat.suffix || ''}
              </div>
              
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative text-center py-12">
            <blockquote className="text-xl md:text-2xl font-medium text-foreground max-w-4xl mx-auto italic">
              "Car mes pensées ne sont pas vos pensées, et vos voies ne sont pas mes voies, dit l'Éternel."
            </blockquote>
            <cite className="block mt-4 text-muted-foreground">Ésaïe 55:8</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
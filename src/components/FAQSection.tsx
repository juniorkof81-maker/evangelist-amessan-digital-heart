import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Clock, MapPin, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data, error } = await supabase
          .from('faq')
          .select('*')
          .eq('active', true)
          .order('order_index', { ascending: true });

        if (error) throw error;
        setFaqs(data || []);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  // Fallback FAQs if database is empty
  const fallbackFAQs: FAQ[] = [
    {
      id: '1',
      question: 'Quels sont les horaires des sessions "Puiser la sagesse des proverbes" ?',
      answer: 'Les sessions se déroulent tous les mardis, mercredis, jeudis et vendredis à 04h45 GMT sur Zoom. C\'est un moment privilégié d\'étude biblique matinale pour commencer la journée dans la sagesse divine.',
      category: 'general',
      order_index: 1
    },
    {
      id: '2',
      question: 'Comment puis-je rejoindre les sessions de prière et d\'enseignement ?',
      answer: 'Vous pouvez nous contacter via WhatsApp ou email pour recevoir les liens Zoom et Facebook Live. Les sessions sont ouvertes à tous ceux qui cherchent à grandir spirituellement.',
      category: 'general',
      order_index: 2
    },
    {
      id: '3',
      question: 'L\'Évangéliste Jacques Amessan se déplace-t-il pour des missions ?',
      answer: 'Oui, l\'Évangéliste effectue régulièrement des missions à l\'intérieur de la Côte d\'Ivoire et parfois dans d\'autres pays. Contactez-nous pour discuter des possibilités de mission dans votre région.',
      category: 'general',
      order_index: 3
    },
    {
      id: '4',
      question: 'Qu\'est-ce que le Collectif des Frères en Christ ?',
      answer: 'Le Collectif des Frères en Christ est un mouvement spirituel basé à Abidjan avec lequel l\'Évangéliste Jacques Amessan collabore fréquemment pour l\'évangélisation et l\'enseignement biblique.',
      category: 'general',
      order_index: 4
    },
    {
      id: '5',
      question: 'Comment recevoir des prières personnalisées ?',
      answer: 'Vous pouvez soumettre vos demandes de prière via le formulaire de contact ou directement par WhatsApp. Chaque demande est traitée avec confidentialité et intercession.',
      category: 'general',
      order_index: 5
    }
  ];

  const displayFAQs = faqs.length > 0 ? faqs : fallbackFAQs;

  const quickInfoCards = [
    {
      icon: Clock,
      title: 'Horaires de Prière',
      content: 'Mardi-Vendredi 04h45 GMT',
      action: 'Sessions matinales sur Zoom'
    },
    {
      icon: MapPin,
      title: 'Localisation',
      content: 'Abidjan, Côte d\'Ivoire',
      action: 'Missions nationales et internationales'
    },
    {
      icon: Phone,
      title: 'Contact Urgent',
      content: '+225 01 02 03 04 05',
      action: 'WhatsApp disponible 24h/7j'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Fréquentes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez rapidement les réponses aux questions les plus courantes sur le ministère et les activités spirituelles.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Info Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Informations Rapides</h3>
            {quickInfoCards.map((card, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 fade-in">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <card.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{card.title}</h4>
                      <p className="text-foreground font-semibold text-sm mb-1">{card.content}</p>
                      <p className="text-xs text-muted-foreground">{card.action}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Questions & Réponses</span>
                  {loading && (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="space-y-2">
                    {displayFAQs.map((faq) => (
                      <AccordionItem 
                        key={faq.id} 
                        value={faq.id}
                        className="border border-primary/10 rounded-lg px-4 data-[state=open]:border-primary/30 transition-colors"
                      >
                        <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}

                {!loading && displayFAQs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune FAQ disponible pour le moment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center fade-in">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Vous ne trouvez pas votre réponse ?</h3>
              <p className="text-muted-foreground mb-6">
                N'hésitez pas à nous contacter directement pour toute question spécifique concernant 
                les enseignements, les sessions de prière ou les demandes personnelles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact" 
                  className="btn-divine inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Nous Contacter
                </a>
                <a 
                  href="https://wa.me/2250102030405" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-sacred inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  WhatsApp Direct
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
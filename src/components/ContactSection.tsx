import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Calendar, MessageCircle, Send, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder for form submission
    // In real implementation, this would connect to Supabase
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message envoyé !",
        description: "Votre message a été envoyé avec succès. Nous vous répondrons rapidement.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const phoneNumber = "0102030405";
  const email = "jacques.amessan@exemple.ci";
  const whatsappNumber = phoneNumber.replace(/\D/g, '');
  
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prendre{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Contact
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            N'hésitez pas à nous contacter pour toute question, prière ou collaboration spirituelle.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="fade-in">
            <div className="contact-form">
              <h3 className="text-2xl font-semibold mb-6">Envoyer un Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nom complet
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Adresse e-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full resize-none"
                    placeholder="Écrivez votre message ici..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-divine w-full py-3 text-lg"
                >
                  {isSubmitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le Message
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Note :</strong> Formulaire à connecter à Supabase pour le stockage des données
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info & Quick Actions */}
          <div className="space-y-6 fade-in">
            {/* Contact Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Informations de Contact</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-muted-foreground">{phoneNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-muted-foreground">{email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Localisation</p>
                      <p className="text-muted-foreground">Côte d'Ivoire</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Actions Rapides</h3>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => window.open(`https://wa.me/225${whatsappNumber}`, '_blank')}
                    className="btn-sacred w-full justify-start"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    WhatsApp Direct
                  </Button>

                  <Button
                    onClick={() => window.open(`mailto:${email}`, '_blank')}
                    variant="outline"
                    className="w-full justify-start border-2"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    E-mail Direct
                  </Button>

                  <Button
                    onClick={() => {
                      toast({
                        title: "Calendly à configurer",
                        description: "Intégration Calendly requise pour la prise de rendez-vous",
                      });
                    }}
                    variant="outline"
                    className="w-full justify-start border-2"
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    Prendre Rendez-vous
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Calendly :</strong> URL/API à configurer pour les rendez-vous
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Chatbot placeholder */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Assistant IA</h3>
                <p className="text-muted-foreground mb-4">
                  Chatbot intelligent pour répondre à vos questions et vous guider.
                </p>
                <Button
                  onClick={() => {
                    toast({
                      title: "Chatbot à configurer",
                      description: "Intégration OpenAI requise pour l'assistant IA",
                    });
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ouvrir le Chat IA
                </Button>
                <div className="mt-3 p-2 bg-muted/30 rounded text-xs text-center text-muted-foreground">
                  Nécessite clé API OpenAI
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
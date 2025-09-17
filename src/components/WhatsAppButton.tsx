import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone } from 'lucide-react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "2250102030405"; // Format international pour la Côte d'Ivoire
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Bonjour Évangéliste Jacques Amessan, j'aimerais prendre contact avec vous concernant vos enseignements spirituels."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group bg-[#25D366] hover:bg-[#20B954] text-white h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
      >
        <MessageCircle 
          size={24} 
          className="transition-transform duration-300 group-hover:scale-110" 
        />
      </Button>
      
      {/* Tooltip */}
      <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-200 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}>
        <div className="bg-card text-card-foreground px-3 py-2 rounded-lg shadow-lg border text-sm whitespace-nowrap">
          <div className="font-medium">WhatsApp Direct</div>
          <div className="text-xs text-muted-foreground">+225 01 02 03 04 05</div>
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card"></div>
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></div>
    </div>
  );
};

export default WhatsAppButton;
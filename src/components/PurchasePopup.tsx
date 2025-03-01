
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Check, Phone } from "lucide-react";

interface PurchasePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PricingPlan {
  duration: string;
  price: number;
  highlight?: boolean;
}

const pricingPlans: PricingPlan[] = [
  { duration: "30 дней", price: 99 },
  { duration: "90 дней", price: 280, highlight: true },
  { duration: "180 дней", price: 555 },
  { duration: "360 дней", price: 1050 },
];

export const PurchasePopup: React.FC<PurchasePopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const phoneNumber = "+79888151561";
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=Здравствуйте! Хочу приобрести VPN.`, "_blank");
  };

  const handlePhoneClick = () => {
    window.open(`tel:${phoneNumber}`);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div 
        className="bg-gradient-to-br from-vpn-dark to-vpn-blue/30 rounded-xl shadow-2xl max-w-md w-full border border-white/10 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-vpn-blue/20 rounded-full -mr-16 -mt-16 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
        
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="bg-gradient-to-r from-vpn-blue to-purple-500 bg-clip-text text-transparent">
              Приобрести VPN
            </span>
          </h2>
          
          <p className="text-white/80 mb-6 text-sm">
            Выберите подходящий тарифный план и свяжитесь с нами
          </p>
          
          {/* Pricing Plans */}
          <div className="space-y-3 mb-6">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`flex justify-between items-center p-3 rounded-lg ${
                  plan.highlight 
                    ? "bg-gradient-to-r from-vpn-blue/30 to-purple-600/30 border border-vpn-blue/50" 
                    : "bg-white/5 border border-white/10"
                } transition-all hover:bg-white/10`}
              >
                <div className="flex items-center gap-2">
                  {plan.highlight && <Check className="h-4 w-4 text-vpn-blue" />}
                  <span className="font-medium text-white">{plan.duration}</span>
                </div>
                <span className="text-lg font-bold text-white">{plan.price} ₽</span>
              </div>
            ))}
          </div>
          
          {/* Contact Section */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-white text-center mb-4">📞 Номер для покупки</h3>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5" 
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Button>
              
              <div 
                onClick={handlePhoneClick}
                className="text-center font-medium text-white hover:text-vpn-blue cursor-pointer transition-colors p-2"
              >
                <span className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  +7 (988) 815-15-61
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

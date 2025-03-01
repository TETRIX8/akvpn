
import React, { useState, useEffect } from "react";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { HorrorText } from "@/components/HorrorText";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SupportForm } from "@/components/SupportForm";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { PurchasePopup } from "@/components/PurchasePopup";
import { VPNKeys } from "@/components/VPNKeys";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isPurchasePopupOpen, setIsPurchasePopupOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisited', 'true');
      
      const timer = setTimeout(() => {
        setIsFirstVisit(false);
        setIsLoading(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setIsFirstVisit(false);
      setIsLoading(false);
    }
  }, []);

  const openPurchasePopup = () => {
    setIsPurchasePopupOpen(true);
  };

  const closePurchasePopup = () => {
    setIsPurchasePopupOpen(false);
  };

  if (isFirstVisit || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-vpn-dark relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/lovable-uploads/f086c916-cb2f-4633-88ad-f94621e7f7ba.png)',
            backgroundSize: 'cover',
            opacity: 0.4
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-vpn-dark via-vpn-blue/20 to-vpn-dark opacity-80" />
      </div>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 relative z-10">
        <section className="text-center space-y-4 mb-8 md:mb-12">
          <AnimatedTitle />
          <h2 className="text-lg md:text-3xl font-light animate-fade-in text-white/90 px-2">
            Настройте VPN за 2 простых шага
          </h2>
          <HorrorText />
          
          {/* Purchase VPN Button */}
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={openPurchasePopup}
              className="bg-gradient-to-r from-vpn-blue to-purple-600 hover:opacity-90 text-white font-medium px-6 py-3 rounded-full animate-pulse shadow-lg shadow-vpn-blue/20"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Приобрести VPN
            </Button>
          </div>
        </section>

        <div className="space-y-8 md:space-y-12 max-w-4xl mx-auto">
          {/* VPN Keys */}
          <VPNKeys />

          {/* Technical Support */}
          <section className="mt-12 space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white">
              Техническая поддержка
            </h2>
            <p className="text-white/80 text-center">
              Если у вас возникли проблемы, напишите нам, и мы поможем вам решить их
            </p>
            <SupportForm />
          </section>
        </div>

        <footer className="mt-12 md:mt-16 text-center space-y-3 md:space-y-4">
          <p className="text-white/80 text-xs md:text-sm">
            Разработано <span className="font-semibold text-vpn-blue">TETRIXUNO</span>
          </p>
          <a 
            href="https://t.me/TETRIX_UNO" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs md:text-sm bg-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-white/20"
          >
            <svg className="w-3 md:w-4 h-3 md:h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.12.13.145.309.164.433-.001.061.018.181.003.334z"/>
            </svg>
            @TETRIX_UNO
          </a>
        </footer>
      </div>
      
      {/* Purchase Popup */}
      <PurchasePopup isOpen={isPurchasePopupOpen} onClose={closePurchasePopup} />
    </div>
  );
};

export default Index;

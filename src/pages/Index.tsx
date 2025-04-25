
import React, { useState, useEffect } from "react";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTelegramClick = () => {
    window.open('https://t.me/WidumVPN_bot?start=TETRIX_UNO', '_blank');
    toast({
      title: "Переход в Telegram",
      description: "Открываем бота в новой вкладке",
    });
  };

  return (
    <div className="min-h-screen bg-vpn-dark relative overflow-hidden">
      <BackgroundAnimation className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/lovable-uploads/f086c916-cb2f-4633-88ad-f94621e7f7ba.png)',
            backgroundSize: 'cover',
            opacity: 0.2
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-vpn-dark via-vpn-blue/10 to-vpn-dark opacity-80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
        <AnimatedTitle />
        
        <div 
          className={`
            mt-12 text-center max-w-2xl mx-auto
            transform transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
            Наш VPN на постоянной основе перенесен
          </h2>
          
          <div className="mt-8 space-y-4">
            <Button
              onClick={handleTelegramClick}
              className="bg-vpn-blue hover:bg-vpn-blue/90 text-white px-8 py-6 rounded-xl text-lg md:text-xl font-semibold transform transition-all duration-300 hover:scale-105 animate-float"
            >
              Подключиться через Telegram
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
          
          <div 
            className={`
              mt-8 text-white/80 text-sm md:text-base
              transform transition-all duration-1000 delay-300
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            Нажмите на кнопку выше, чтобы перейти к нашему Telegram боту
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

import React, { useEffect, useState } from "react";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { SetupInstructions } from "@/components/SetupInstructions";
import { VPNKeys } from "@/components/VPNKeys";
import { FAQ } from "@/components/FAQ";
import { HorrorText } from "@/components/HorrorText";
import { LoadingScreen } from "@/components/LoadingScreen";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const [visitors, setVisitors] = useState(0);
  const [keyStats, setKeyStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    const storedVisitors = parseInt(localStorage.getItem('visitorCount') || '0');
    setVisitors(storedVisitors + 1);
    localStorage.setItem('visitorCount', (storedVisitors + 1).toString());

    const stats = JSON.parse(localStorage.getItem('keyStats') || '{}');
    setKeyStats(stats);

    return () => clearTimeout(timer);
  }, []);

  const handleStartSetup = () => {
    localStorage.removeItem('onboardingStep');
    localStorage.removeItem('onboardingCompleted');
    setShowOnboarding(true);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-vpn-dark relative overflow-hidden">
      {!isMobile && showOnboarding && <OnboardingFlow />}
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-vpn-dark via-vpn-blue/20 to-vpn-dark opacity-50" />
        <div className="grid grid-cols-8 gap-4 absolute inset-0 opacity-10">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-full bg-vpn-blue/30 animate-pulse"
              style={{
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{visitors} посетителей</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(keyStats).map(([key, count], index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-vpn-blue rounded-full" />
                  <span>Ключ {index + 1}: {count} выборов</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <section className="text-center space-y-4 mb-12">
          <AnimatedTitle />
          <h2 className="text-xl md:text-3xl font-light animate-fade-in text-white/90" style={{ animationDelay: "0.5s" }}>
            Настройте VPN за 2 простых шага
          </h2>
          <HorrorText />
          <div className="flex justify-center mt-8">
            {isMobile ? (
              <Sheet>
                <SheetTrigger>
                  <Button
                    onClick={handleStartSetup}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full animate-pulse text-lg"
                    style={{
                      textShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
                      boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                    }}
                  >
                    Начать настройку
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh] bg-vpn-dark border-t border-white/10">
                  <SheetHeader>
                    <SheetTitle className="text-white">Настройка VPN</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <OnboardingFlow />
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Button
                onClick={handleStartSetup}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full animate-pulse text-lg"
                style={{
                  textShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
                  boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                }}
              >
                Начать настройку
              </Button>
            )}
          </div>
        </section>

        <div className="space-y-12 max-w-4xl mx-auto">
          <SetupInstructions />
          <VPNKeys onKeySelect={(key) => {
            const stats = JSON.parse(localStorage.getItem('keyStats') || '{}');
            stats[key] = (stats[key] || 0) + 1;
            localStorage.setItem('keyStats', JSON.stringify(stats));
            setKeyStats(stats);
          }} />

          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-vpn-blue/20 to-purple-600/20 p-8 border border-white/10">
            <div className="absolute inset-0 bg-vpn-dark/40 backdrop-blur-sm" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left space-y-4 flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Получите VIP доступ
                </h3>
                <p className="text-white/80 text-lg">
                  Улучшенная скорость и стабильность работы, премиум сервера и приоритетная поддержка
                </p>
                <ul className="text-white/70 space-y-2 text-left list-disc list-inside">
                  <li>Максимальная скорость соединения</li>
                  <li>Доступ к премиум серверам</li>
                  <li>Приоритетная техническая поддержка</li>
                  <li>Без ограничений трафика</li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://t.me/akvpnn_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/25 animate-pulse"
                  style={{
                    textShadow: '0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.4)',
                    boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.12.13.145.309.164.433-.001.061.018.181.003.334z"/>
                  </svg>
                  Получить VIP доступ
                </a>
              </div>
            </div>
          </section>

          <FAQ />
        </div>

        <footer className="mt-16 text-center space-y-4">
          <p className="text-white/80 text-sm">
            Разработано <span className="font-semibold text-vpn-blue">TETRIXUNO</span>
          </p>
          <a 
            href="https://t.me/TETRIX_UNO" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.12.13.145.309.164.433-.001.061.018.181.003.334z"/>
            </svg>
            @TETRIX_UNO
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;
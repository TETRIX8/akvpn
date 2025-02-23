
import React, { useState, useEffect } from "react";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { SetupInstructions } from "@/components/SetupInstructions";
import { VPNKeys } from "@/components/VPNKeys";
import { FAQ } from "@/components/FAQ";
import { HorrorText } from "@/components/HorrorText";
import { LoadingScreen } from "@/components/LoadingScreen";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { SupportForm } from "@/components/SupportForm";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { Smartphone, Laptop, Monitor, Shield, Zap, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const platforms = [
  {
    name: "iOS и macOS",
    icon: <Laptop className="w-5 h-5" />,
    app: "streisand",
  },
  {
    name: "Android",
    icon: <Smartphone className="w-5 h-5" />,
    app: "v2raytun",
  },
  {
    name: "Windows",
    icon: <Monitor className="w-5 h-5" />,
    app: "hiddify",
  },
];

const features = [
  {
    icon: <Shield className="w-8 h-8 text-blue-400" />,
    title: "Безопасность",
    description: "Ваши данные надежно защищены современными протоколами шифрования"
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Высокая скорость",
    description: "Быстрое и стабильное соединение для комфортного использования"
  },
  {
    icon: <Globe className="w-8 h-8 text-green-400" />,
    title: "Доступ без границ",
    description: "Свободный доступ к любым сайтам и сервисам"
  }
];

const Index = () => {
  const [visitors, setVisitors] = useState(0);
  const [keyStats, setKeyStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

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

    const storedVisitors = parseInt(localStorage.getItem('visitorCount') || '0');
    setVisitors(storedVisitors + 1);
    localStorage.setItem('visitorCount', (storedVisitors + 1).toString());

    const stats = JSON.parse(localStorage.getItem('keyStats') || '{}');
    setKeyStats(stats);

    const savedKey = localStorage.getItem('selectedVPNKey');
    if (savedKey) {
      setSelectedKey(savedKey);
    }

    // Show toast notification about new Outline connection
    toast({
      title: "Новый способ подключения!",
      description: "Теперь доступно подключение через Outline VPN",
      duration: 2000,
      className: "animate-fade-in",
    });
  }, [toast]);

  const handleKeySelect = (key: string) => {
    setSelectedKey(key);
    localStorage.setItem('selectedVPNKey', key);
  };

  const handleConnect = (app: string) => {
    if (!selectedKey) {
      return;
    }
    const encodedKey = encodeURIComponent(selectedKey);
    const url = `https://ragimov700.ru/redirect/?app=${app}&config_url=${encodedKey}`;
    window.open(url, "_blank");
  };

  const handleOutlineConnect = () => {
    const url = "http://77.238.225.250:43234/red?url=Y2hhY2hhMjAtaWV0Zi1wb2x5MTMwNTpWNlg0RHE1VXA4MXZ0MEk4T2Q3QlNH@77.238.231.123:31546/?outline=1&name=🇳🇱Нидерланды%20-%20Ak";
    window.open(url, "_blank");
  };

  if (isFirstVisit || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vpn-dark via-vpn-dark/95 to-vpn-dark relative">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/f086c916-cb2f-4633-88ad-f94621e7f7ba.png')] bg-repeat opacity-5 animate-pulse" />

      {/* Header with stats */}
      <header className="relative z-10 w-full bg-black/40 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{visitors} онлайн</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(keyStats).map(([key, count], index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-vpn-blue rounded-full" />
                  <span>Ключ {index + 1}: {count} использований</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero section */}
        <section className="text-center space-y-6 mb-16">
          <AnimatedTitle />
          <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto">
            Быстрый и безопасный VPN сервис для доступа к любым сайтам
          </p>
          
          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Main content */}
        <div className="space-y-12 max-w-4xl mx-auto">
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
              Как начать пользоваться VPN?
            </h2>
            <SetupInstructions />
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
              Выберите VPN ключ
            </h2>
            <VPNKeys onKeySelect={handleKeySelect} />
          </section>

          {selectedKey && (
            <section className="space-y-6 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
                Выберите приложение для подключения
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {platforms.map((platform) => (
                  <Card 
                    key={platform.name} 
                    className="p-6 bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white">
                        {platform.icon}
                        <h3 className="font-semibold">{platform.name}</h3>
                      </div>
                      <Button
                        onClick={() => handleConnect(platform.app)}
                        className="w-full bg-vpn-blue hover:bg-vpn-blue/90"
                      >
                        Подключиться
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-6 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
              Outline VPN - Новый способ подключения
            </h2>
            <Card className="p-6 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-500/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32">
                  <img 
                    src="/lovable-uploads/6b411e54-6efa-4898-a7b8-67efaa004402.png" 
                    alt="Outline VPN" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-4">
                    Outline VPN
                  </h3>
                  <p className="text-white/80 mb-6">
                    Быстрый и надежный VPN клиент с улучшенной безопасностью
                  </p>
                  <Button
                    onClick={handleOutlineConnect}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    Подключиться через Outline
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          <FAQ />

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
              Нужна помощь?
            </h2>
            <SupportForm />
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center space-y-4">
          <p className="text-white/60">
            Разработано <span className="font-semibold text-vpn-blue">TETRIXUNO</span>
          </p>
          <a 
            href="https://t.me/TETRIX_UNO" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.12.13.145.309.164.433-.001.061.018.181.003.334z"/>
            </svg>
            @TETRIX_UNO
          </a>
        </footer>
      </main>

      {/* Loading screen */}
      {(isFirstVisit || isLoading) && <LoadingScreen />}
    </div>
  );
};

export default Index;

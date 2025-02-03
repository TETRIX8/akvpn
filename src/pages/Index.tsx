import React, { useEffect, useState } from "react";
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
import { Smartphone, Laptop, Monitor } from "lucide-react";
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

      <div className="relative z-10 w-full bg-black/40 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-3 md:px-4 py-2">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-2 md:gap-4 text-xs md:text-sm text-white/80">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-1 md:gap-2">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{visitors} посетителей</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {Object.entries(keyStats).map(([key, count], index) => (
                <div key={index} className="flex items-center gap-1 md:gap-2">
                  <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-vpn-blue rounded-full" />
                  <span>Ключ {index + 1}: {count} выборов</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 relative z-10">
        <section className="text-center space-y-4 mb-8 md:mb-12">
          <AnimatedTitle />
          <h2 className="text-lg md:text-3xl font-light animate-fade-in text-white/90 px-2">
            Настройте VPN за 2 простых шага
          </h2>
          <HorrorText />
        </section>

        <div className="space-y-8 md:space-y-12 max-w-4xl mx-auto">
          <SetupInstructions />
          <VPNKeys onKeySelect={handleKeySelect} />

          {selectedKey && (
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-vpn-blue/20 to-purple-600/20 p-4 md:p-8 border border-white/10 animate-fade-in">
              <div className="absolute inset-0 bg-vpn-dark/40 backdrop-blur-sm" />
              <div className="relative z-10">
                <h2 className="text-2xl font-horror text-red-600 text-center mb-6"
                    style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}>
                  Подключение
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {platforms.map((platform) => (
                    <Card key={platform.name} className="p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white">
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
              </div>
            </section>
          )}

          <FAQ />

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

        <section className="mt-12 space-y-6 max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-600/20 p-4 md:p-8 border border-white/10 animate-fade-in">
            <div className="absolute inset-0 bg-vpn-dark/40 backdrop-blur-sm" />
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32">
                  <img 
                    src="/lovable-uploads/6b411e54-6efa-4898-a7b8-67efaa004402.png" 
                    alt="Outline VPN" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">
                    Outline VPN
                  </h2>
                  <p className="text-white/80 mb-4">
                    Новый способ подключения через Outline - быстрый и надежный VPN клиент
                  </p>
                  <Button
                    onClick={handleOutlineConnect}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                  >
                    Подключиться через Outline
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

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
    </div>
  );
};

export default Index;

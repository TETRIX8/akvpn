import React, { useEffect, useState } from "react";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { SetupInstructions } from "@/components/SetupInstructions";
import { VPNKeys } from "@/components/VPNKeys";
import { FAQ } from "@/components/FAQ";

const Index = () => {
  const [visitors, setVisitors] = useState(0);
  const [keyStats, setKeyStats] = useState<Record<string, number>>({});

  useEffect(() => {
    // Get visitor count from localStorage or initialize
    const storedVisitors = parseInt(localStorage.getItem('visitorCount') || '0');
    setVisitors(storedVisitors + 1);
    localStorage.setItem('visitorCount', (storedVisitors + 1).toString());

    // Get key selection stats
    const stats = JSON.parse(localStorage.getItem('keyStats') || '{}');
    setKeyStats(stats);
  }, []);

  return (
    <div className="min-h-screen bg-vpn-dark relative overflow-hidden">
      {/* Animated background */}
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

      {/* Stats Bar */}
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

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Hero Section */}
        <section className="text-center space-y-4 mb-12">
          <AnimatedTitle />
          <h2 className="text-xl md:text-3xl font-light animate-fade-in text-white/90" style={{ animationDelay: "0.5s" }}>
            Настройте VPN за 2 простых шага
          </h2>
        </section>

        {/* Main Content */}
        <div className="space-y-12 max-w-4xl mx-auto">
          <SetupInstructions />
          <VPNKeys onKeySelect={(key) => {
            const stats = JSON.parse(localStorage.getItem('keyStats') || '{}');
            stats[key] = (stats[key] || 0) + 1;
            localStorage.setItem('keyStats', JSON.stringify(stats));
            setKeyStats(stats);
          }} />
          <FAQ />
        </div>

        {/* Developer Credit */}
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
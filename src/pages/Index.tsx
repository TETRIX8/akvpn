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
      </div>
    </div>
  );
};

export default Index;
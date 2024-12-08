import React from "react";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { SetupInstructions } from "@/components/SetupInstructions";
import { VPNKeys } from "@/components/VPNKeys";
import { FAQ } from "@/components/FAQ";

const Index = () => {
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
          <VPNKeys />
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default Index;
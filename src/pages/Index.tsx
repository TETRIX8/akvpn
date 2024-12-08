import React from "react";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { SetupInstructions } from "@/components/SetupInstructions";
import { VPNKeys } from "@/components/VPNKeys";
import { FAQ } from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vpn-dark to-vpn-blue text-white">
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <AnimatedTitle />
          <h2 className="text-2xl md:text-3xl font-light animate-fade-in" style={{ animationDelay: "0.5s" }}>
            Настройте VPN за 2 простых шага
          </h2>
        </section>

        {/* Main Content */}
        <div className="space-y-16 max-w-4xl mx-auto">
          <SetupInstructions />
          <VPNKeys />
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default Index;
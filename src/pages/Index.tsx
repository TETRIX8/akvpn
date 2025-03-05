import React, { useState, useEffect } from "react";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { SetupInstructions } from "@/components/SetupInstructions";
import { FAQ } from "@/components/FAQ";
import { VPNKeys } from "@/components/VPNKeys";
import { SupportForm } from "@/components/SupportForm";
import { trackConnectionClick } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Index = () => {
  const [showSupport, setShowSupport] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (showSupport && !(e.target as HTMLElement).closest('#support-form')) {
        setShowSupport(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showSupport]);

  const handleConnectionClick = async (platform: string, keyId: string) => {
    setSelectedPlatform(platform);
    setSelectedKeyId(keyId);
    setShowSupport(true);
    await trackConnectionClick(platform, keyId);
  };
  
  return (
    <div className="min-h-screen bg-vpn-dark text-white">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-vpn-dark/30 to-vpn-dark"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-vpn-blue/20 rounded-full filter blur-3xl opacity-30 animate-pulse-glow"></div>
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-ramadan-gold/10 rounded-full filter blur-3xl opacity-20 animate-pulse-glow" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-20 right-1/4 w-56 h-56 bg-ramadan-purple/10 rounded-full filter blur-3xl opacity-20 animate-pulse-glow" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedTitle />
          <p className="text-xl text-white/70 mt-6 max-w-2xl mx-auto">
            Начните пользоваться безопасным и быстрым VPN уже сегодня. Защитите свои данные и получите неограниченный доступ к контенту.
          </p>
          <div className="mt-12 flex justify-center">
            <SetupInstructions />
          </div>
        </div>
        
        {/* Добавляем ссылку на страницу отзывов */}
        <div className="absolute top-4 right-4 z-10">
          <Link 
            to="/reviews" 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Отзывы</span>
          </Link>
        </div>
      </section>
      
      {/* VPN Keys Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <VPNKeys onConnect={handleConnectionClick} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FAQ />
        </div>
      </section>

      {/* Support Section */}
      {showSupport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div id="support-form" className="glass-card p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Нужна помощь с подключением?</h2>
            <p className="text-white/70 mb-6">
              Опишите вашу проблему, и мы свяжемся с вами в ближайшее время.
            </p>
            <SupportForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

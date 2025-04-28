
import React from "react";
import { Button } from "@/components/ui/button";
import { Gift, Heart, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface DonationPopupProps {
  isVisible: boolean;
}

export const DonationPopup: React.FC<DonationPopupProps> = ({ isVisible }) => {
  const donationUrl = "https://yoomoney.ru/to/4100118336080745/0";
  
  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 z-50 max-w-sm bg-gradient-to-r from-ramadan-purple to-ramadan-crimson p-5 rounded-xl shadow-xl border border-ramadan-gold/40 backdrop-blur-md transition-all duration-5000 transform",
        isVisible 
          ? "opacity-100 translate-y-0 animate-fade-in" 
          : "opacity-0 translate-y-12 pointer-events-none"
      )}
      style={{
        boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.5), 0 8px 10px -6px rgba(220, 20, 60, 0.3)"
      }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-ramadan-gold rounded-full animate-pulse" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-ramadan-gold rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
      
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-ramadan-gold/30 to-ramadan-gold/10 rounded-full animate-pulse">
          <Gift className="h-7 w-7 text-ramadan-gold" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-white mb-1 flex items-center gap-2">
            Поддержите проект! 
            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
          </h3>
          <p className="text-sm text-white/90 mb-4 leading-snug">
            Помогите нам сделать VPN доступным для всех пользователей интернета
          </p>
          <Button 
            className="w-full bg-gradient-to-r from-ramadan-gold to-yellow-500 hover:from-ramadan-gold/90 hover:to-yellow-500/90 text-vpn-dark font-medium transition-all duration-300 shadow-lg hover:shadow-ramadan-gold/25 group"
            onClick={() => window.open(donationUrl, "_blank")}
          >
            <CreditCard className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
            Поддержать проект
          </Button>
        </div>
      </div>
      
      {/* Glowing effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-red-600/20 rounded-xl blur-xl opacity-70" />
    </div>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface DonationPopupProps {
  isVisible: boolean;
}

export const DonationPopup: React.FC<DonationPopupProps> = ({ isVisible }) => {
  const donationUrl = "https://yoomoney.ru/to/4100118336080745/0";
  
  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-50 max-w-sm bg-gradient-to-r from-ramadan-purple/90 to-ramadan-crimson/90 p-4 rounded-lg shadow-lg border border-ramadan-gold/30 backdrop-blur-sm transition-all duration-300 transform",
        isVisible 
          ? "opacity-100 translate-y-0 animate-scale-in" 
          : "opacity-0 translate-y-8 pointer-events-none"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-ramadan-gold/20 rounded-full animate-pulse">
          <Gift className="h-6 w-6 text-ramadan-gold" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white">Поддержите проект!</h3>
          <p className="text-sm text-white/80 mb-3">
            Помогите нам сделать VPN доступным для всех
          </p>
          <Button 
            className="w-full bg-ramadan-gold hover:bg-ramadan-gold/80 text-vpn-dark font-medium"
            onClick={() => window.open(donationUrl, "_blank")}
          >
            Поддержать проект
          </Button>
        </div>
      </div>
    </div>
  );
};

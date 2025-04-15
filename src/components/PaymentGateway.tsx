
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { LockIcon, Smartphone, Shield } from "lucide-react";

interface PaymentGatewayProps {
  onPaymentComplete: () => void;
}

export const PaymentGateway = ({ onPaymentComplete }: PaymentGatewayProps) => {
  const [deviceId, setDeviceId] = useState<string>("");
  
  useEffect(() => {
    // Generate a unique device ID based on browser properties
    const generateDeviceId = () => {
      const platform = navigator.platform;
      const userAgent = navigator.userAgent;
      const language = navigator.language;
      const deviceString = `${platform}-${userAgent}-${language}`;
      return window.btoa(deviceString);
    };
    
    setDeviceId(generateDeviceId());
  }, []);
  
  const handlePayment = () => {
    // For demo purposes, we'll simulate a successful payment
    const paymentInfo = {
      deviceId,
      timestamp: Date.now(),
      paid: true
    };
    
    localStorage.setItem('vpnPaymentInfo', JSON.stringify(paymentInfo));
    onPaymentComplete();
    
    toast({
      title: "Оплата прошла успешно",
      description: "Теперь у вас есть доступ к VPN",
    });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 bg-black/40 border border-white/10 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex justify-center">
            <Shield className="w-16 h-16 text-vpn-blue" />
          </div>
          
          <h2 className="text-2xl font-bold text-center text-white">
            Доступ к VPN
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-white">
                <LockIcon className="w-5 h-5 text-vpn-blue" />
                <span>Безлимитный доступ</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Smartphone className="w-5 h-5 text-vpn-blue" />
                <span>Привязка к устройству</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">49 ₽</div>
              <p className="text-white/60 text-sm">
                Единоразовая оплата
              </p>
            </div>
            
            <Button 
              onClick={handlePayment}
              className="w-full bg-vpn-blue hover:bg-vpn-blue/90"
            >
              Оплатить 49 ₽
            </Button>
            
            <p className="text-xs text-white/40 text-center">
              После оплаты доступ будет привязан к текущему устройству
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

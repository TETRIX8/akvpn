
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Loader2, Check, Lock } from "lucide-react";
import { toast } from "./ui/use-toast";
import { Alert, AlertDescription } from "./ui/alert";

interface VPNKeysProps {
  onKeySelect?: (key: string) => void;
}

const vpnKeys = [
  "vless://852496b5-4714-4432-8167-eadc7dfb5a41@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#Akvpn",
  "vless://9b34db19-bb0f-4f89-9372-f860c4105ec0@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#akvpn2",
  "vless://6fcb2d48-7499-4b86-9120-8dfb2297a098@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#akvpn3",
  "vless://875f28ab-5e55-486b-abd3-0ce25a056ef3@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#akvpn4"
];

export const VPNKeys = ({ onKeySelect }: VPNKeysProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [keyStats, setKeyStats] = useState<Record<string, number>>({});
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem('keyStats') || '{}');
    setKeyStats(stats);
    
    // Проверяем доступ на основе количества рефералов
    const hasVPNAccess = JSON.parse(localStorage.getItem('hasVPNAccess') || 'false');
    setHasAccess(hasVPNAccess);
  }, []);

  const handleKeySelect = async (key: string) => {
    if (!hasAccess) {
      toast({
        title: "Доступ ограничен",
        description: "Пригласите 3 пользователей, чтобы получить доступ к VPN",
        variant: "destructive",
      });
      return;
    }

    setSelectedKey(key);
    setIsChecking(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const pingValue = Math.floor(Math.random() * (200 - 50) + 50);
    setIsChecking(false);
    localStorage.setItem('selectedVPNKey', key);
    onKeySelect?.(key);
    toast({
      title: "Ключ готов",
      description: (
        <div>
          Пинг: <span className="text-green-500 font-semibold">{pingValue} ms</span>
        </div>
      ),
    });
  };

  if (!hasAccess) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in backdrop-blur-lg bg-white/5 p-4 md:p-6 rounded-xl shadow-2xl border border-white/10">
        <Alert className="bg-ramadan-purple/10 border-ramadan-purple text-ramadan-purple">
          <AlertDescription className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Пригласите 3 пользователей, чтобы получить доступ к VPN ключам
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 md:gap-6">
          {vpnKeys.map((key, index) => (
            <Card 
              key={index} 
              className="p-3 md:p-5 bg-gradient-to-r from-white/5 to-white/10 
                backdrop-blur-md border-white/20 opacity-50"
            >
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center justify-between">
                <div className="flex-1 space-y-2 w-full md:w-auto">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <code className="text-[10px] md:text-sm text-white/90 font-mono bg-black/20 px-2 md:px-3 py-1 md:py-1.5 rounded-lg break-all">
                      {key.substring(0, 40)}...
                    </code>
                  </div>
                </div>
                <Button 
                  disabled
                  variant="outline"
                  className="w-full md:w-auto bg-white/10 border-white/20 text-white/50"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Заблокировано
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in backdrop-blur-lg bg-white/5 p-4 md:p-6 rounded-xl shadow-2xl border border-white/10">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-white tracking-tight">
        Ключи VPN
      </h2>
      <div className="grid gap-4 md:gap-6">
        {vpnKeys.map((key, index) => (
          <Card 
            key={index} 
            className={`
              p-3 md:p-5 bg-gradient-to-r from-white/5 to-white/10 
              backdrop-blur-md border-white/20 
              hover:bg-white/15 transition-all duration-300 
              transform hover:scale-[1.02] hover:shadow-lg
              rounded-xl
            `}
          >
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center justify-between">
              <div className="flex-1 space-y-2 w-full md:w-auto">
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <code className="text-[10px] md:text-sm text-white/90 font-mono bg-black/20 px-2 md:px-3 py-1 md:py-1.5 rounded-lg break-all">
                    {key.substring(0, 40)}...
                  </code>
                  <span className="text-[10px] md:text-xs font-medium text-white/80 bg-vpn-blue/20 px-2 md:px-3 py-1 md:py-1.5 rounded-lg flex items-center gap-2">
                    <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-vpn-blue rounded-full animate-pulse"></div>
                    {keyStats[key] || 0} выборов
                  </span>
                </div>
              </div>
              <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                {isChecking && selectedKey === key ? (
                  <Button disabled className="w-full md:w-auto bg-white/20 backdrop-blur-sm text-sm md:text-base">
                    <Loader2 className="mr-2 h-3 md:h-4 w-3 md:w-4 animate-spin" />
                    Проверяем связь...
                  </Button>
                ) : (
                  <Button 
                    variant={selectedKey === key ? "default" : "outline"}
                    onClick={() => handleKeySelect(key)}
                    className={`
                      w-full md:w-auto transition-all duration-300 text-sm md:text-base
                      ${selectedKey === key 
                        ? 'bg-gradient-to-r from-vpn-blue to-vpn-blue/80 hover:from-vpn-blue/90 hover:to-vpn-blue/70 shadow-lg' 
                        : 'bg-white/10 hover:bg-white/20 border-white/20'}
                    `}
                  >
                    {selectedKey === key ? (
                      <>
                        <Check className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                        Выбран
                      </>
                    ) : (
                      "Выбрать"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

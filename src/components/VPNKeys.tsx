import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Loader2, Check } from "lucide-react";
import { toast } from "./ui/use-toast";

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

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem('keyStats') || '{}');
    setKeyStats(stats);
  }, []);

  const handleKeySelect = async (key: string) => {
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

  return (
    <div className="space-y-6 animate-fade-in backdrop-blur-lg bg-white/5 p-6 rounded-xl shadow-2xl border border-white/10">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white tracking-tight">
        Ключи VPN
      </h2>
      <div className="grid gap-6">
        {vpnKeys.map((key, index) => (
          <Card 
            key={index} 
            className={`
              p-5 bg-gradient-to-r from-white/5 to-white/10 
              backdrop-blur-md border-white/20 
              hover:bg-white/15 transition-all duration-300 
              transform hover:scale-[1.02] hover:shadow-lg
              rounded-xl
            `}
          >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 space-y-2 w-full md:w-auto">
                <div className="flex flex-wrap items-center gap-3">
                  <code className="text-xs md:text-sm text-white/90 font-mono bg-black/20 px-3 py-1.5 rounded-lg">
                    {key.substring(0, 40)}...
                  </code>
                  <span className="text-xs font-medium text-white/80 bg-vpn-blue/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-vpn-blue rounded-full animate-pulse"></div>
                    {keyStats[key] || 0} выборов
                  </span>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                {isChecking && selectedKey === key ? (
                  <Button disabled className="w-full md:w-auto bg-white/20 backdrop-blur-sm">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Проверяем связь...
                  </Button>
                ) : (
                  <Button 
                    variant={selectedKey === key ? "default" : "outline"}
                    onClick={() => handleKeySelect(key)}
                    className={`
                      w-full md:w-auto transition-all duration-300
                      ${selectedKey === key 
                        ? 'bg-gradient-to-r from-vpn-blue to-vpn-blue/80 hover:from-vpn-blue/90 hover:to-vpn-blue/70 shadow-lg' 
                        : 'bg-white/10 hover:bg-white/20 border-white/20'}
                    `}
                  >
                    {selectedKey === key ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
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
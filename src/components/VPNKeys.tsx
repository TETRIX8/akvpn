
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check, Copy } from "lucide-react";
import { toast } from "./ui/use-toast";

interface VPNKeysProps {}

const vpnKeys = [
  "vless://852496b5-4714-4432-8167-eadc7dfb5a41@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#Akvpn",
  "vless://9b34db19-bb0f-4f89-9372-f860c4105ec0@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#akvpn2",
  "vless://6fcb2d48-7499-4b86-9120-8dfb2297a098@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#akvpn3",
  "vless://875f28ab-5e55-486b-abd3-0ce25a056ef3@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#akvpn4"
];

export const VPNKeys = ({}: VPNKeysProps) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
    
    toast({
      title: "Ключ скопирован",
      description: "Теперь вы можете использовать его в вашем VPN клиенте",
    });
  };

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
                <div className="flex items-center gap-2 md:gap-3">
                  <code className="text-[10px] md:text-sm text-white/90 font-mono bg-black/20 px-2 md:px-3 py-1 md:py-1.5 rounded-lg break-all">
                    {key.substring(0, 40)}...
                  </code>
                </div>
              </div>
              <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                <Button 
                  variant="outline"
                  onClick={() => handleCopyKey(key)}
                  className={`
                    w-full md:w-auto transition-all duration-300 text-sm md:text-base
                    ${copiedKey === key 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-none' 
                      : 'bg-white/10 hover:bg-white/20 border-white/20'}
                  `}
                >
                  {copiedKey === key ? (
                    <>
                      <Check className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                      Скопировано
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                      Копировать
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

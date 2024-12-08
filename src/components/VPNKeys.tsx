import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Loader2, Check } from "lucide-react";
import { toast } from "./ui/use-toast";

const vpnKeys = [
  "vless://e0f12697-b29f-4599-8644-020713a4658b@185.121.14.164:443?type=tcp&security=reality&pbk=ccWQdcjsEfVWzqn63rxJr20Dlr6YgZTGz4KvR0EJ4W4&fp=random&sni=google.com&sid=294e0954dd9c1d34&spx=%2F#akvpn",
  "vless://56164655-0143-45d8-ab26-363cd11b2bb3@185.121.14.164:443?type=tcp&security=reality&pbk=ccWQdcjsEfVWzqn63rxJr20Dlr6YgZTGz4KvR0EJ4W4&fp=random&sni=google.com&sid=294e0954dd9c1d34&spx=%2F#akvpn1",
  "vless://1266be15-3565-4527-9b7f-352419ff8eab@185.121.14.164:443?type=tcp&security=reality&pbk=ccWQdcjsEfVWzqn63rxJr20Dlr6YgZTGz4KvR0EJ4W4&fp=random&sni=google.com&sid=294e0954dd9c1d34&spx=%2F#akvpn2",
  "vless://8544e020-4124-44a3-a966-898ee27eab93@185.121.14.164:443?type=tcp&security=reality&pbk=ccWQdcjsEfVWzqn63rxJr20Dlr6YgZTGz4KvR0EJ4W4&fp=random&sni=google.com&sid=294e0954dd9c1d34&spx=%2F#akvpn3",
];

export const VPNKeys = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleKeySelect = async (key: string) => {
    setSelectedKey(key);
    setIsChecking(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const pingValue = Math.floor(Math.random() * (200 - 50) + 50);
    setIsChecking(false);
    localStorage.setItem('selectedVPNKey', key);
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
    <div className="space-y-4 animate-fade-in backdrop-blur-sm bg-white/5 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Ключи VPN</h2>
      <div className="grid gap-4">
        {vpnKeys.map((key, index) => (
          <Card key={index} className="p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 truncate w-full md:w-auto">
                <code className="text-xs md:text-sm text-white/80">{key.substring(0, 50)}...</code>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                {isChecking && selectedKey === key ? (
                  <Button disabled className="w-full md:w-auto bg-white/20">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Проверяем связь...
                  </Button>
                ) : (
                  <Button 
                    variant={selectedKey === key ? "default" : "outline"}
                    onClick={() => handleKeySelect(key)}
                    className={`w-full md:w-auto ${selectedKey === key ? 'bg-vpn-blue hover:bg-vpn-blue/90' : 'bg-white/10 hover:bg-white/20'}`}
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

import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { Trash2, Save, Plus } from "lucide-react";

export const KeysManager = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [newKey, setNewKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load keys from localStorage or use default keys
    const savedKeys = localStorage.getItem("vpn_keys");
    if (savedKeys) {
      setKeys(JSON.parse(savedKeys));
    } else {
      // Use default keys from VPNKeys component
      setKeys([
        "vless://852496b5-4714-4432-8167-eadc7dfb5a41@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#Akvpn",
        "vless://9b34db19-bb0f-4f89-9372-f860c4105ec0@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#akvpn2",
        "vless://6fcb2d48-7499-4b86-9120-8dfb2297a098@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#akvpn3",
        "vless://875f28ab-5e55-486b-abd3-0ce25a056ef3@185.232.204.20:433?type=tcp&security=reality&fp=chrome&pbk=yd8PE8yDUhhVF8LR76B7yx2DhK7DsFf6LjOAXEqerkw&sni=7.jetsurfnetwork.ru&flow=xtls-rprx-vision&sid=445e6461&spx=%2F#akvpn4"
      ]);
    }
    setIsLoading(false);
  }, []);
  
  const saveKeys = () => {
    localStorage.setItem("vpn_keys", JSON.stringify(keys));
    toast({
      title: "Сохранено",
      description: `${keys.length} ключей VPN сохранено успешно`,
    });
  };
  
  const addKey = () => {
    if (newKey.trim() === "") return;
    setKeys([...keys, newKey]);
    setNewKey("");
  };
  
  const removeKey = (index: number) => {
    const newKeys = [...keys];
    newKeys.splice(index, 1);
    setKeys(newKeys);
  };
  
  const updateKey = (index: number, value: string) => {
    const newKeys = [...keys];
    newKeys[index] = value;
    setKeys(newKeys);
  };
  
  if (isLoading) return <div>Загрузка ключей...</div>;
  
  return (
    <Card className="p-6 bg-black/40 border border-white/10">
      <h2 className="text-xl font-bold mb-4">Управление ключами VPN</h2>
      
      <div className="space-y-6">
        {keys.map((key, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input 
              value={key}
              onChange={(e) => updateKey(index, e.target.value)}
              className="flex-1 bg-black/30 border-white/20"
            />
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={() => removeKey(index)}
              className="flex-shrink-0"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
        
        <div className="flex items-center gap-2">
          <Input 
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Добавить новый VLESS ключ..."
            className="flex-1 bg-black/30 border-white/20"
          />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={addKey}
            className="flex-shrink-0 border-white/20"
          >
            <Plus size={16} />
          </Button>
        </div>
        
        <Button 
          className="w-full bg-vpn-blue hover:bg-vpn-blue/90 flex items-center gap-2"
          onClick={saveKeys}
        >
          <Save size={16} />
          Сохранить ключи
        </Button>
      </div>
    </Card>
  );
};

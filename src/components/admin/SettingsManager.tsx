
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Save } from "lucide-react";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  primaryColor: string;
  donationText: string;
  donationWalletETH: string;
  donationWalletBTC: string;
}

export const SettingsManager = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "AKVPN",
    siteDescription: "Быстрый и безопасный VPN сервис",
    primaryColor: "#3b82f6",
    donationText: "Поддержите наш проект",
    donationWalletETH: "0x...",
    donationWalletBTC: "bc1..."
  });
  
  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("site_settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };
  
  const saveSettings = () => {
    localStorage.setItem("site_settings", JSON.stringify(settings));
    
    // Apply some settings immediately to see changes
    document.documentElement.style.setProperty('--vpn-blue', settings.primaryColor);
    
    toast({
      title: "Настройки сохранены",
      description: "Изменения применены успешно",
    });
  };
  
  return (
    <Card className="p-6 bg-black/40 border border-white/10">
      <h2 className="text-xl font-bold mb-4">Настройки сайта</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm block mb-1">Название сайта</label>
            <Input 
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="bg-black/30 border-white/20"
            />
          </div>
          
          <div>
            <label className="text-sm block mb-1">Основной цвет</label>
            <div className="flex items-center gap-2">
              <Input 
                type="color"
                name="primaryColor"
                value={settings.primaryColor}
                onChange={handleChange}
                className="w-12 h-10 p-1"
              />
              <Input 
                name="primaryColor"
                value={settings.primaryColor}
                onChange={handleChange}
                className="bg-black/30 border-white/20"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="text-sm block mb-1">Описание сайта</label>
          <Textarea 
            name="siteDescription"
            value={settings.siteDescription}
            onChange={handleChange}
            className="bg-black/30 border-white/20"
          />
        </div>
        
        <div className="pt-4 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-3">Настройки донатов</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm block mb-1">Текст для донатов</label>
              <Textarea 
                name="donationText"
                value={settings.donationText}
                onChange={handleChange}
                className="bg-black/30 border-white/20"
              />
            </div>
            
            <div>
              <label className="text-sm block mb-1">ETH кошелек</label>
              <Input 
                name="donationWalletETH"
                value={settings.donationWalletETH}
                onChange={handleChange}
                className="bg-black/30 border-white/20"
              />
            </div>
            
            <div>
              <label className="text-sm block mb-1">BTC кошелек</label>
              <Input 
                name="donationWalletBTC"
                value={settings.donationWalletBTC}
                onChange={handleChange}
                className="bg-black/30 border-white/20"
              />
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4 bg-vpn-blue hover:bg-vpn-blue/90 flex items-center gap-2"
          onClick={saveSettings}
        >
          <Save size={16} />
          Сохранить настройки
        </Button>
      </div>
    </Card>
  );
};

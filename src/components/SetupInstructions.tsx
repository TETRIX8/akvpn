
import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRight, Download } from "lucide-react";
import { toast } from "./ui/use-toast";
import { detectDeviceType, getDeviceDisplayName, type DeviceType } from "@/utils/deviceDetection";

interface PlatformLink {
  name: string;
  downloadUrl: string;
  app: string;
  deviceType: string;
}

const platforms: PlatformLink[] = [
  {
    name: "iOS и macOS",
    downloadUrl: "https://apps.apple.com/ru/app/streisand/id6450534064",
    app: "streisand",
    deviceType: "ios macos"
  },
  {
    name: "Android",
    downloadUrl: "https://play.google.com/store/apps/details?id=com.v2raytun.android",
    app: "v2raytun",
    deviceType: "android"
  },
  {
    name: "Windows",
    downloadUrl: "https://github.com/hiddify/hiddify-next/releases/latest/download/Hiddify-Windows-Setup-x64.Msix",
    app: "hiddify",
    deviceType: "windows"
  },
];

interface SetupInstructionsProps {
  selectedPlatform?: DeviceType;
}

export const SetupInstructions = ({ selectedPlatform }: SetupInstructionsProps) => {
  const deviceType = selectedPlatform || detectDeviceType();
  const selectedKey = localStorage.getItem('selectedVPNKey');
  const currentPlatform = platforms.find(p => p.deviceType.includes(deviceType)) || platforms[0];

  const handleConnect = (app: string) => {
    if (!selectedKey) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите ключ перед подключением",
        variant: "destructive",
      });
      return;
    }
    const encodedKey = encodeURIComponent(selectedKey);
    const url = `https://ragimov700.ru/redirect/?app=${app}&config_url=${encodedKey}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in backdrop-blur-sm bg-white/5 p-4 sm:p-6 rounded-lg">
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-white">Установка приложения</h2>
        
        {/* Featured app for current device */}
        <Card className="p-4 bg-amber-500/20 backdrop-blur-sm border-amber-500/30 hover:bg-amber-500/30 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-black text-xs font-medium px-2 py-1 rounded-full">
                  Рекомендуемое для {getDeviceDisplayName(deviceType)}
                </span>
              </div>
              <h3 className="font-semibold text-lg mt-2 text-white">{currentPlatform.name}</h3>
              <p className="text-white/70 text-sm mt-1">
                Оптимально для вашего устройства
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black border-none"
              onClick={() => window.open(currentPlatform.downloadUrl, "_blank")}
            >
              <Download className="mr-2 h-4 w-4" />
              Скачать
            </Button>
          </div>
        </Card>
        
        {/* Other platform options */}
        <div className="mt-6">
          <h3 className="text-white/80 text-sm mb-3">Другие платформы:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.filter(p => !p.deviceType.includes(deviceType)).map((platform) => (
              <Card key={platform.name} className="p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <h3 className="font-semibold mb-3 text-white">{platform.name}</h3>
                <Button
                  variant="outline"
                  className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
                  onClick={() => window.open(platform.downloadUrl, "_blank")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Скачать
                </Button>
              </Card>
            ))}
          </div>
        </div>
        
        <p className="text-white/60 text-center mt-4 text-sm">
          После установки откройте приложение и нажмите 'Начать'
        </p>
      </section>
    </div>
  );
};

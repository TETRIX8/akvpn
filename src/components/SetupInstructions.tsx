import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRight, Download } from "lucide-react";
import { toast } from "./ui/use-toast";

interface PlatformLink {
  name: string;
  downloadUrl: string;
  app: string;
}

const platforms: PlatformLink[] = [
  {
    name: "iOS и macOS",
    downloadUrl: "https://apps.apple.com/ru/app/streisand/id6450534064",
    app: "streisand",
  },
  {
    name: "Android",
    downloadUrl: "https://play.google.com/store/apps/details?id=com.v2raytun.android",
    app: "v2raytun",
  },
  {
    name: "Windows",
    downloadUrl: "https://github.com/hiddify/hiddify-next/releases/latest/download/Hiddify-Windows-Setup-x64.Msix",
    app: "hiddify",
  },
];

export const SetupInstructions = () => {
  const selectedKey = localStorage.getItem('selectedVPNKey');

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
    <div className="space-y-8 animate-fade-in backdrop-blur-sm bg-white/5 p-6 rounded-lg">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Шаг 1: Установка приложения</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <Card key={platform.name} className="p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="font-semibold mb-4 text-white">{platform.name}</h3>
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
        <p className="text-white/60 text-center mt-4 text-sm">
          После установки откройте приложение и нажмите 'Начать'
        </p>
      </section>
      <div className="flex justify-center mt-6">
        <Button
          onClick={() => {
            const currentStep = localStorage.getItem('onboardingStep');
            if (currentStep === 'install') {
              localStorage.setItem('onboardingStep', 'key-selection');
              window.location.reload();
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full animate-pulse"
          style={{
            textShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
            boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
          }}
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Продолжить
        </Button>
      </div>
    </div>
  );
};
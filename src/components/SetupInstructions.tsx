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
  const handleConnect = (app: string) => {
    const selectedKey = localStorage.getItem('selectedVPNKey');
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
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Шаг 1: Установка приложения</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <Card key={platform.name} className="p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">{platform.name}</h3>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(platform.downloadUrl, "_blank")}
              >
                <Download className="mr-2 h-4 w-4" />
                Скачать
              </Button>
            </Card>
          ))}
        </div>
        <p className="text-muted-foreground text-center mt-4">
          После установки откройте приложение и нажмите 'Начать'
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Шаг 2: Подключение</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <Card key={platform.name} className="p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">{platform.name}</h3>
              <Button
                className="w-full"
                onClick={() => handleConnect(platform.app)}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Подключиться
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
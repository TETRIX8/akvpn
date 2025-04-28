
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { VPNKeys } from "./VPNKeys";
import { SetupInstructions } from "./SetupInstructions";
import { toast } from "./ui/use-toast";
import { Smartphone, Laptop, Monitor } from "lucide-react";
import { Card } from "./ui/card";
import { detectDeviceType, getRecommendedApp, getDeviceDisplayName } from "@/utils/deviceDetection";

type Step = "welcome" | "install" | "key-selection" | "connection" | "completed";

interface PlatformLink {
  name: string;
  icon: React.ReactNode;
  app: string;
}

const platforms: PlatformLink[] = [
  {
    name: "iOS и macOS",
    icon: <Laptop className="w-5 h-5" />,
    app: "streisand",
  },
  {
    name: "Android",
    icon: <Smartphone className="w-5 h-5" />,
    app: "v2raytun",
  },
  {
    name: "Windows",
    icon: <Monitor className="w-5 h-5" />,
    app: "hiddify",
  },
];

export const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>(() => {
    const savedStep = localStorage.getItem("onboardingStep");
    return (savedStep as Step) || "welcome";
  });
  const [hasSelectedKey, setHasSelectedKey] = useState(false);
  const [deviceType, setDeviceType] = useState(detectDeviceType());
  const recommendedApp = getRecommendedApp(deviceType);
  
  useEffect(() => {
    localStorage.setItem("onboardingStep", currentStep);
  }, [currentStep]);

  useEffect(() => {
    // Re-detect device on mount
    setDeviceType(detectDeviceType());
  }, []);

  const handleKeySelect = (key: string) => {
    setHasSelectedKey(true);
    localStorage.setItem('selectedVPNKey', key);
  };

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

  const handleNextStep = () => {
    switch (currentStep) {
      case "welcome":
        setCurrentStep("install");
        break;
      case "install":
        setCurrentStep("key-selection");
        break;
      case "key-selection":
        if (!hasSelectedKey) {
          toast({
            title: "Выберите ключ",
            description: "Пожалуйста, выберите ключ перед тем как продолжить",
            variant: "destructive",
          });
          return;
        }
        setCurrentStep("connection");
        break;
      case "connection":
        setTimeout(() => {
          setCurrentStep("completed");
        }, 15000);
        break;
    }
  };

  const handleQuickConnect = () => {
    // Auto-select first key if none selected
    if (!hasSelectedKey) {
      const firstKey = document.querySelector('.vpn-key-card') as HTMLElement;
      if (firstKey) {
        firstKey.click();
      }
    }
    
    // After a short delay, initiate connection with the recommended app
    setTimeout(() => {
      handleConnect(recommendedApp);
    }, 500);
  };

  if (currentStep === "completed") {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-vpn-dark p-4 sm:p-8 rounded-xl max-w-2xl w-full mx-4 border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
        {currentStep === "welcome" && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-horror text-red-600 text-center mb-4 sm:mb-6"
                style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}>
              Добро пожаловать в AKVPN
            </h2>
            <div className="bg-black/30 p-4 rounded-lg border border-white/10">
              <p className="text-amber-500 text-center font-semibold mb-2">
                Определено устройство: {getDeviceDisplayName(deviceType)}
              </p>
              <p className="text-white/80 text-center">
                Мы подготовили для вас оптимальный вариант настройки VPN
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={handleNextStep}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full animate-pulse"
                style={{
                  textShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
                  boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                }}
              >
                Пошаговая настройка
              </Button>
              <Button
                onClick={handleQuickConnect}
                className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-full"
              >
                Быстрое подключение
              </Button>
            </div>
          </div>
        )}

        {currentStep === "install" && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-horror text-red-600 text-center mb-4 sm:mb-6"
                style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}>
              Шаг 1: Установка приложения
            </h2>
            <div className="bg-black/30 p-4 rounded-lg border border-white/10 mb-4">
              <p className="text-amber-500 text-center font-semibold">
                Рекомендуемое приложение для {getDeviceDisplayName(deviceType)}
              </p>
            </div>
            <SetupInstructions selectedPlatform={deviceType} />
            <div className="flex justify-center mt-4 sm:mt-6">
              <Button
                onClick={handleNextStep}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full animate-pulse"
                style={{
                  textShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
                  boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                }}
              >
                Я установил приложение
              </Button>
            </div>
          </div>
        )}

        {currentStep === "key-selection" && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-horror text-red-600 text-center mb-4 sm:mb-6"
                style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}>
              Шаг 2: Выбор ключа
            </h2>
            <VPNKeys onKeySelect={handleKeySelect} />
            <div className="flex justify-center mt-4 sm:mt-6">
              <Button
                onClick={handleNextStep}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full animate-pulse"
                style={{
                  textShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
                  boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                }}
              >
                Продолжить
              </Button>
            </div>
          </div>
        )}

        {currentStep === "connection" && hasSelectedKey && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-horror text-red-600 text-center mb-4 sm:mb-6"
                style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}>
              Шаг 3: Подключение
            </h2>
            <div className="bg-black/30 p-4 rounded-lg border border-white/10 mb-4">
              <p className="text-amber-500 text-center font-semibold mb-2">
                Рекомендуемое приложение для {getDeviceDisplayName(deviceType)}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <Card 
                  key={platform.name} 
                  className={`p-4 ${platform.app === recommendedApp ? 'bg-amber-500/20' : 'bg-white/10'} backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                      {platform.icon}
                      <h3 className="font-semibold">{platform.name}</h3>
                      {platform.app === recommendedApp && (
                        <span className="text-xs bg-amber-500/30 px-2 py-1 rounded-full ml-auto">
                          Рекомендуемое
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => handleConnect(platform.app)}
                      className={`w-full ${platform.app === recommendedApp ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'bg-vpn-blue hover:bg-vpn-blue/90'}`}
                    >
                      Подключиться
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleNextStep}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full animate-pulse"
                style={{
                  textShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
                  boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                }}
              >
                Я подключился
              </Button>
            </div>
            <p className="text-white/60 text-center text-sm">
              Это окно автоматически закроется через 15 секунд
            </p>
          </div>
        )}

        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="flex gap-2">
            {["welcome", "install", "key-selection", "connection"].map((step, index) => (
              <div
                key={step}
                className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${
                  currentStep === step ? "bg-red-600 animate-pulse" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

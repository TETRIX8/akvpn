import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { VPNKeys } from "./VPNKeys";
import { SetupInstructions } from "./SetupInstructions";
import { toast } from "./ui/use-toast";

type Step = "welcome" | "install" | "key-selection" | "connection" | "completed";

export const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>(() => {
    const savedStep = localStorage.getItem("onboardingStep");
    return (savedStep as Step) || "welcome";
  });
  const [hasSelectedKey, setHasSelectedKey] = useState(false);

  useEffect(() => {
    localStorage.setItem("onboardingStep", currentStep);
  }, [currentStep]);

  const handleKeySelect = (key: string) => {
    setHasSelectedKey(true);
    localStorage.setItem('selectedVPNKey', key);
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

  if (currentStep === "completed") {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-vpn-dark p-8 rounded-xl max-w-2xl w-full mx-4 border border-white/10 shadow-2xl">
        {currentStep === "welcome" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-horror text-red-600 text-center mb-6"
                style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}>
              Добро пожаловать в AKVPN
            </h2>
            <p className="text-white/80 text-center">
              Давайте настроим ваш VPN в несколько простых шагов
            </p>
            <div className="flex justify-center">
              <Button
                onClick={handleNextStep}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full animate-pulse"
                style={{
                  textShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
                  boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                }}
              >
                Начать настройку
              </Button>
            </div>
          </div>
        )}

        {currentStep === "install" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-horror text-red-600 text-center mb-6"
                style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}>
              Шаг 1: Установка приложения
            </h2>
            <SetupInstructions />
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleNextStep}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full animate-pulse"
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
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-horror text-red-600 text-center mb-6"
                style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}>
              Шаг 2: Выбор ключа
            </h2>
            <VPNKeys onKeySelect={handleKeySelect} />
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleNextStep}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full animate-pulse"
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

        {currentStep === "connection" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-horror text-red-600 text-center mb-6"
                style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}>
              Шаг 3: Подключение
            </h2>
            <p className="text-white/80 text-center">
              Нажмите кнопку "Подключиться" в приложении
            </p>
            <div className="flex justify-center">
              <Button
                onClick={handleNextStep}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full animate-pulse"
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

        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {["welcome", "install", "key-selection", "connection"].map((step, index) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  currentStep === step ? "bg-red-600 animate-pulse" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
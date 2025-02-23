
import React from "react";
import { Card } from "./ui/card";
import { Check } from "lucide-react";

const steps = [
  {
    title: "Установите приложение",
    description: "Выберите и установите VPN приложение для вашего устройства"
  },
  {
    title: "Выберите ключ",
    description: "Скопируйте один из доступных VPN ключей"
  },
  {
    title: "Подключитесь",
    description: "Нажмите кнопку 'Подключиться' и следуйте инструкциям"
  }
];

export const SetupInstructions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <Card 
          key={index}
          className="p-6 bg-white/5 backdrop-blur border-white/10 relative overflow-hidden"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-vpn-blue/20 flex items-center justify-center">
              <Check className="w-6 h-6 text-vpn-blue" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-white/70">
                {step.description}
              </p>
            </div>
          </div>
          <div className="absolute top-4 right-4 text-4xl font-bold text-white/10">
            {index + 1}
          </div>
        </Card>
      ))}
    </div>
  );
};

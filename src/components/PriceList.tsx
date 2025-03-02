
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Check } from "lucide-react";

export const PriceList = () => {
  const prices = [
    { name: "Тестовый период", duration: "7 дней", price: "39 ₽" },
    { name: "Стандартный", duration: "30 дней", price: "109 ₽" },
    { name: "Квартальный", duration: "90 дней", price: "309 ₽", popular: true },
    { name: "Полугодовой", duration: "180 дней", price: "600 ₽" },
    { name: "Годовой", duration: "360 дней", price: "2500 ₽" },
  ];

  const handleCopyPaymentLink = () => {
    navigator.clipboard.writeText("https://yoomoney.ru/to/4100118336080745/0");
    // Show toast notification
    const toast = document.getElementById("payment-toast");
    if (toast) {
      toast.classList.remove("hidden");
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          🚀 Подключите VPN по выгодной цене!
        </h2>
        <div className="bg-white/10 p-4 md:p-5 rounded-xl inline-block mx-auto">
          <div className="space-y-3">
            <p className="text-white font-medium">💳 Ссылка для оплаты:</p>
            <div className="flex items-center gap-2">
              <code className="bg-white/10 text-white px-3 py-1.5 rounded text-sm md:text-base overflow-auto">
                https://yoomoney.ru/to/4100118336080745/0
              </code>
              <Button 
                variant="outline"
                size="sm"
                onClick={handleCopyPaymentLink}
                className="bg-white/10 text-white hover:bg-white/20 border-white/20"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                Копировать
              </Button>
            </div>
            <div id="payment-toast" className="hidden bg-green-500/90 text-white px-4 py-2 rounded-lg mt-2 text-sm">
              Ссылка скопирована!
            </div>
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-xl max-w-md mx-auto mt-4">
          <p className="text-white/90 font-medium text-left">❗ <span className="font-bold">ВАЖНО:</span></p>
          <ul className="text-white/80 list-disc pl-6 text-left space-y-1 mt-2">
            <li>После перевода прислать чек</li>
            <li><span className="font-medium italic">Ваш номер телефона</span> для связи</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {prices.map((item, index) => (
          <Card 
            key={index}
            className={`
              overflow-hidden relative border-white/10 backdrop-blur-sm
              ${item.popular ? 'bg-gradient-to-b from-vpn-blue/30 to-purple-600/20 border-vpn-blue/50' : 'bg-white/5'}
              transition-all hover:bg-white/10 group
            `}
          >
            {item.popular && (
              <div className="absolute top-0 right-0 bg-vpn-blue text-white text-xs font-bold px-2 py-1 rounded-bl-md">
                Популярный
              </div>
            )}
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <h3 className="text-white font-medium">{item.name}</h3>
                <p className="text-white/70 text-sm">{item.duration}</p>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">{item.price}</div>
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className={`
                    w-full border-white/20 text-white 
                    ${item.popular 
                      ? 'bg-gradient-to-r from-vpn-blue to-purple-600 hover:opacity-90 border-0' 
                      : 'bg-white/10 hover:bg-white/20'
                    }
                  `}
                  onClick={handleCopyPaymentLink}
                >
                  {item.popular ? <Check className="mr-1 w-4 h-4" /> : null}
                  Оплатить
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

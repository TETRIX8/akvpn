import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqItems = [
  {
    question: "Что делать, если не работает?",
    answer: "Попробуйте перезапустить приложение или выбрать другой ключ VPN. Если проблема сохраняется, проверьте подключение к интернету.",
  },
  {
    question: "Как проверить подключение?",
    answer: "После подключения посетите сайт whoer.net, чтобы проверить ваш текущий IP-адрес и убедиться, что VPN работает корректно.",
  },
  {
    question: "Какое приложение лучше использовать?",
    answer: "Мы рекомендуем Streisand для iOS/macOS, v2RayTun для Android и Hiddify для Windows. Эти приложения обеспечивают наилучшую производительность и безопасность.",
  },
];

export const FAQ = () => {
  return (
    <div className="space-y-4 animate-fade-in backdrop-blur-sm bg-white/5 p-4 md:p-6 rounded-lg w-full max-w-full md:max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-white">Часто задаваемые вопросы</h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqItems.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg px-2 md:px-4"
          >
            <AccordionTrigger className="text-sm md:text-base text-white hover:text-white/80 py-2 md:py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-white/70 px-2 md:px-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
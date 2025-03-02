import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';

export const SupportForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        'service_vcaxptx',
        'template_91c1fvw',
        e.currentTarget,
        'aoak44iftoobsH4Xm'
      );

      toast({
        title: "Успешно отправлено",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div>
        <Input
          type="text"
          name="user_name"
          placeholder="Ваше имя"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>
      <div>
        <Input
          type="email"
          name="user_email"
          placeholder="Ваш email"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Опишите вашу проблему"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-vpn-blue hover:bg-vpn-blue/90"
      >
        {isLoading ? "Отправка..." : "Отправить"}
      </Button>
    </form>
  );
};
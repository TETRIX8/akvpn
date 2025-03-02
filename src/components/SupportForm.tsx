
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { Camera, X } from 'lucide-react';

interface SupportFormProps {
  isPaymentConfirmation?: boolean;
}

export const SupportForm: React.FC<SupportFormProps> = ({ isPaymentConfirmation = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (isPaymentConfirmation && !screenshot) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, приложите скриншот чека",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (isPaymentConfirmation && !phoneNumber) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите ваш номер телефона",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('user_name', phoneNumber);
      formData.append('user_email', email);
      formData.append('message', message);
      
      if (screenshot) {
        formData.append('screenshot', screenshot);
      }

      // Use emailjs to send form data
      await emailjs.sendForm(
        'service_vcaxptx',
        'template_91c1fvw',
        e.currentTarget,
        'aoak44iftoobsH4Xm'
      );

      toast({
        title: isPaymentConfirmation ? "Платеж подтвержден" : "Успешно отправлено",
        description: isPaymentConfirmation ? "Мы обработаем ваш платеж в ближайшее время" : "Мы свяжемся с вами в ближайшее время",
      });
      
      // Reset form
      setPhoneNumber('');
      setEmail('');
      setMessage('');
      setScreenshot(null);
      setPreviewUrl(null);
      
      if (e.target instanceof HTMLFormElement) {
        e.target.reset();
      }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshot(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshot(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div>
        <Input
          type="tel"
          name="user_name"
          placeholder="Ваш номер телефона"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>
      <div>
        <Input
          type="email"
          name="user_email"
          placeholder="Ваш email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder={isPaymentConfirmation ? "Дополнительная информация" : "Опишите вашу проблему"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required={!isPaymentConfirmation}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
        />
      </div>

      {isPaymentConfirmation && (
        <div className="space-y-2">
          <p className="text-white/80 text-sm">Скриншот чека:</p>
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Скриншот чека"
                className="w-full h-auto rounded-lg border border-white/20"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white hover:bg-black/70"
                onClick={handleRemoveScreenshot}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              onClick={handleBrowseClick}
              className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center cursor-pointer hover:bg-white/5 transition-colors"
            >
              <Camera className="mx-auto text-white/50 mb-2" />
              <p className="text-white/70 text-sm">Нажмите, чтобы загрузить скриншот</p>
            </div>
          )}
        </div>
      )}
      
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-vpn-blue hover:bg-vpn-blue/90"
      >
        {isLoading ? "Отправка..." : (isPaymentConfirmation ? "Подтвердить оплату" : "Отправить")}
      </Button>
    </form>
  );
};

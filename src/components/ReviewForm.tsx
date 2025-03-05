
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { submitReview } from '@/lib/supabase';
import { Star } from 'lucide-react';

export const ReviewForm = ({ onReviewSubmitted }: { onReviewSubmitted: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  
  // Генерация случайного цвета для аватара
  const generateRandomColor = () => {
    const colors = [
      'bg-ramadan-gold',
      'bg-ramadan-emerald',
      'bg-ramadan-purple',
      'bg-ramadan-crimson', 
      'bg-vpn-blue',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-pink-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Получаем или создаем ID пользователя из localStorage
      let userId = localStorage.getItem('user_id');
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('user_id', userId);
      }
      
      const result = await submitReview({
        user_id: userId,
        name,
        content,
        rating,
        avatar_color: generateRandomColor()
      });
      
      if (result) {
        toast({
          title: "Отзыв отправлен",
          description: "Спасибо за ваш отзыв!",
        });
        setName('');
        setContent('');
        setRating(5);
        onReviewSubmitted();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка отправки",
        description: "Что-то пошло не так. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto animate-fade-in">
      <div className="text-xl font-bold text-center mb-6">Оставить отзыв</div>
      <div>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>
      <div>
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${rating >= star ? 'fill-ramadan-gold text-ramadan-gold' : 'text-gray-400'} transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ваш отзыв"
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-vpn-blue hover:bg-vpn-blue/90 animate-pulse-glow"
      >
        {isLoading ? "Отправка..." : "Отправить отзыв"}
      </Button>
    </form>
  );
};


import React from 'react';
import { Review } from '@/lib/supabase';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';

export const ReviewCard = ({ review }: { review: Review }) => {
  // Извлекаем первую букву имени
  const firstLetter = review.name.charAt(0).toUpperCase();
  
  // Форматирование даты
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="overflow-hidden glass-card border-white/10 hover-scale transition-transform duration-300 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div 
            className={`rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold text-white ${review.avatar_color || 'bg-vpn-blue'}`}
          >
            {firstLetter}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-lg">{review.name}</div>
              <div className="text-sm text-gray-400">{formatDate(review.created_at)}</div>
            </div>
            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${review.rating >= star ? 'fill-ramadan-gold text-ramadan-gold' : 'text-gray-500'}`} 
                />
              ))}
            </div>
            <p className="text-white/90 leading-relaxed">{review.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

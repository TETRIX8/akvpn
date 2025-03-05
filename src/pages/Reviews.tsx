
import React, { useEffect, useState } from 'react';
import { ReviewForm } from '@/components/ReviewForm';
import { ReviewCard } from '@/components/ReviewCard';
import { getReviews, Review } from '@/lib/supabase';
import { MessageSquare } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    const data = await getReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen text-white pb-16">
      {/* Заголовок с анимацией */}
      <div className="relative text-center pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-vpn-dark/30 to-vpn-dark"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-vpn-blue/20 rounded-full filter blur-3xl opacity-30 animate-pulse-glow"></div>
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-ramadan-gold/10 rounded-full filter blur-3xl opacity-20 animate-pulse-glow" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-20 right-1/4 w-56 h-56 bg-ramadan-purple/10 rounded-full filter blur-3xl opacity-20 animate-pulse-glow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-center mb-4">
            <MessageSquare className="text-vpn-blue w-12 h-12 mr-3 animate-float" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Отзывы пользователей
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Прочитайте, что говорят пользователи о нашем сервисе, или оставьте свой собственный отзыв
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Форма для отправки отзыва */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="sticky top-8">
              <ReviewForm onReviewSubmitted={fetchReviews} />
            </div>
          </div>
          
          {/* Список отзывов */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-60">
                <div className="w-16 h-16 border-4 border-vpn-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white/70">Загрузка отзывов...</p>
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div 
                    key={review.id || index} 
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/5 rounded-lg">
                <MessageSquare className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-xl text-white/70">Пока нет отзывов</p>
                <p className="text-white/50 mt-2">Будьте первым, кто оставит отзыв!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

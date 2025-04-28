
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

type Review = {
  id: string;
  name: string;
  content: string;
  rating: number;
  created_at: string;
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast({
        title: "Ошибка загрузки отзывов",
        description: "Не удалось загрузить отзывы, пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !content.trim()) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, введите имя и текст отзыва",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const { error } = await supabase.from("reviews").insert({
        name,
        content,
        rating,
      });

      if (error) throw error;

      toast({
        title: "Отзыв отправлен",
        description: "Спасибо за ваш отзыв!",
      });

      // Reset form
      setName("");
      setContent("");
      setRating(5);
      
      // Refresh reviews
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Ошибка отправки",
        description: "Не удалось отправить отзыв, пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < count
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="min-h-screen bg-vpn-dark relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/lovable-uploads/f086c916-cb2f-4633-88ad-f94621e7f7ba.png)',
            backgroundSize: 'cover',
            opacity: 0.4
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-vpn-dark via-purple-600/20 to-vpn-dark opacity-80" />
      </div>

      <div className="container mx-auto px-3 md:px-4 pt-6 pb-16 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-all hover:translate-x-[-5px]">
          <ChevronLeft className="w-5 h-5" />
          <span>Вернуться на главную</span>
        </Link>

        <h1 className="text-4xl font-bold text-center mb-8 text-white animate-fade-in">Отзывы</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Review Form */}
          <div className="glass-card rounded-xl p-5 md:p-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4 text-gradient">Оставить отзыв</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-1">
                  Ваше имя
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white focus:border-vpn-blue focus:ring-1 focus:ring-vpn-blue outline-none transition-all"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-white/80 mb-1">
                  Ваш отзыв
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white focus:border-vpn-blue focus:ring-1 focus:ring-vpn-blue outline-none transition-all"
                  placeholder="Расскажите о вашем опыте..."
                  rows={5}
                />
              </div>

              <div>
                <label className="block text-white/80 mb-1">Оценка</label>
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            i < rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-vpn-blue to-purple-600 hover:opacity-90 transition-all py-6"
                disabled={submitting}
              >
                {submitting ? "Отправка..." : "Отправить отзыв"}
              </Button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gradient">Отзывы пользователей</h2>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-white/5 backdrop-blur-md border-white/10 p-4 animate-pulse">
                    <div className="h-4 bg-white/20 rounded w-1/4 mb-3"></div>
                    <div className="h-3 bg-white/20 rounded w-full mb-2"></div>
                    <div className="h-3 bg-white/20 rounded w-5/6"></div>
                  </Card>
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-white/60 glass-card rounded-xl">
                <p>Пока нет отзывов. Будьте первым!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {reviews.map((review, index) => (
                  <Card 
                    key={review.id}
                    className="glass-card hover-scale border-white/10 p-4 transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-white">{review.name}</h3>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-white/80 whitespace-pre-line">{review.content}</p>
                    <div className="text-xs text-white/60 mt-2">
                      {new Date(review.created_at).toLocaleDateString('ru-RU')}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

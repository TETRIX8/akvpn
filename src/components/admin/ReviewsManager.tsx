
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { Trash2, Save, Plus } from "lucide-react";

interface Review {
  id: number;
  name: string;
  text: string;
  date: string;
  rating: number;
}

export const ReviewsManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: "",
    text: "",
    rating: 5
  });
  
  useEffect(() => {
    // Load reviews from localStorage or use default
    const savedReviews = localStorage.getItem("site_reviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      // Use some default reviews
      setReviews([
        {
          id: 1,
          name: "Алексей",
          text: "Отличный VPN, всегда работает стабильно!",
          date: "2023-12-10",
          rating: 5
        },
        {
          id: 2,
          name: "Мария",
          text: "Пользуюсь уже полгода, никаких проблем",
          date: "2023-11-22",
          rating: 4
        }
      ]);
    }
  }, []);
  
  const saveReviews = () => {
    localStorage.setItem("site_reviews", JSON.stringify(reviews));
    toast({
      title: "Сохранено",
      description: `${reviews.length} отзывов сохранено успешно`,
    });
  };
  
  const addReview = () => {
    if (newReview.name.trim() === "" || newReview.text.trim() === "") return;
    setReviews([
      ...reviews,
      {
        id: Date.now(),
        name: newReview.name,
        text: newReview.text,
        date: new Date().toISOString().split('T')[0],
        rating: newReview.rating
      }
    ]);
    setNewReview({ name: "", text: "", rating: 5 });
  };
  
  const removeReview = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
  };
  
  return (
    <Card className="p-6 bg-black/40 border border-white/10">
      <h2 className="text-xl font-bold mb-4">Управление отзывами</h2>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-black/20 border border-white/10 rounded-md space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{review.name}</h3>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => removeReview(review.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <p className="text-sm opacity-70">{review.date} | Рейтинг: {review.rating}/5</p>
            <p>{review.text}</p>
          </div>
        ))}
        
        <div className="p-4 bg-black/20 border border-white/10 rounded-md space-y-3">
          <h3 className="font-bold">Добавить новый отзыв</h3>
          
          <div>
            <label className="text-sm block mb-1">Имя</label>
            <Input 
              value={newReview.name}
              onChange={(e) => setNewReview({...newReview, name: e.target.value})}
              className="bg-black/30 border-white/20"
            />
          </div>
          
          <div>
            <label className="text-sm block mb-1">Текст отзыва</label>
            <Textarea 
              value={newReview.text}
              onChange={(e) => setNewReview({...newReview, text: e.target.value})}
              className="bg-black/30 border-white/20"
            />
          </div>
          
          <div>
            <label className="text-sm block mb-1">Рейтинг (1-5)</label>
            <Input 
              type="number"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value) || 5})}
              className="bg-black/30 border-white/20 w-20"
            />
          </div>
          
          <Button 
            className="bg-vpn-blue hover:bg-vpn-blue/90 mt-2"
            onClick={addReview}
          >
            <Plus size={16} className="mr-2" />
            Добавить отзыв
          </Button>
        </div>
        
        <Button 
          className="w-full bg-vpn-blue hover:bg-vpn-blue/90 flex items-center gap-2"
          onClick={saveReviews}
        >
          <Save size={16} />
          Сохранить отзывы
        </Button>
      </div>
    </Card>
  );
};

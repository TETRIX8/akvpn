
import React, { useState, useEffect } from "react";
import { Share2, UserPlus, Trophy, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { toast } from "./ui/use-toast";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";

interface Referral {
  code: string;
  usedBy: string;
  timestamp: number;
}

export const ReferralSystem = () => {
  const [referralCode, setReferralCode] = useState<string>("");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Загрузка данных из localStorage
    const savedReferralCode = localStorage.getItem('referralCode');
    const savedReferrals = JSON.parse(localStorage.getItem('referrals') || '[]');
    
    if (!savedReferralCode) {
      // Создание уникального реферального кода
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      localStorage.setItem('referralCode', newCode);
      setReferralCode(newCode);
    } else {
      setReferralCode(savedReferralCode);
    }

    setReferrals(savedReferrals);

    // Проверяем реферальный код в URL при загрузке
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode && refCode !== savedReferralCode) { // Проверяем, что код не принадлежит текущему пользователю
      const isNewReferral = !savedReferrals.some((ref: Referral) => ref.code === refCode);
      
      if (isNewReferral) {
        const newReferral = {
          code: refCode,
          usedBy: Math.random().toString(36).substring(2, 8),
          timestamp: Date.now()
        };
        
        const updatedReferrals = [...savedReferrals, newReferral];
        localStorage.setItem('referrals', JSON.stringify(updatedReferrals));
        setReferrals(updatedReferrals);
        
        toast({
          title: "Успешное приглашение!",
          description: "Спасибо, что присоединились по реферальной ссылке",
          className: "bg-ramadan-emerald/10 border-ramadan-emerald text-ramadan-emerald",
        });

        // Удаляем параметр ref из URL без перезагрузки страницы
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, []);

  useEffect(() => {
    // Проверка доступа и обновление статуса
    const hasEnoughReferrals = referrals.length >= 3;
    setHasAccess(hasEnoughReferrals);
    localStorage.setItem('hasVPNAccess', JSON.stringify(hasEnoughReferrals));
  }, [referrals]);

  const handleCopyReferralLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Ссылка скопирована",
      description: "Теперь вы можете отправить её друзьям",
      className: "bg-ramadan-gold/10 border-ramadan-gold text-ramadan-gold",
    });
  };

  const progress = (referrals.length / 3) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {!hasAccess && (
        <Alert className="bg-ramadan-purple/10 border-ramadan-purple text-ramadan-purple">
          <AlertDescription className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Пригласите 3 пользователей, чтобы получить доступ к VPN
          </AlertDescription>
        </Alert>
      )}

      <Card className="p-6 bg-gradient-to-br from-ramadan-gold/10 to-ramadan-purple/10 border-ramadan-gold/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-ramadan-gold">
              Ваш прогресс
            </h3>
            <span className="text-sm text-ramadan-gold/80">
              {referrals.length}/3 приглашений
            </span>
          </div>

          <Progress 
            value={progress} 
            className="h-2 bg-ramadan-gold/20" 
          />

          {hasAccess && (
            <div className="flex items-center gap-2 text-ramadan-emerald animate-fade-in">
              <Trophy className="h-5 w-5" />
              <span>Поздравляем! Вы получили доступ к VPN</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-ramadan-emerald/10 to-ramadan-gold/10 border-ramadan-emerald/20">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-ramadan-emerald" />
            <h3 className="text-xl font-semibold text-ramadan-emerald">
              Пригласить друзей
            </h3>
          </div>

          <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
            <LinkIcon className="h-4 w-4 text-ramadan-gold" />
            <code className="flex-1 text-sm text-ramadan-gold">
              {window.location.origin}?ref={referralCode}
            </code>
            <Button
              onClick={handleCopyReferralLink}
              variant="outline"
              className="bg-ramadan-gold/10 border-ramadan-gold/20 text-ramadan-gold hover:bg-ramadan-gold/20"
            >
              Копировать
            </Button>
          </div>
        </div>
      </Card>

      {referrals.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-ramadan-purple/10 to-ramadan-emerald/10 border-ramadan-purple/20">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-ramadan-purple">
              Приглашённые пользователи
            </h3>
            <div className="space-y-2">
              {referrals.map((referral, index) => (
                <div 
                  key={referral.code}
                  className="flex items-center gap-2 p-3 bg-black/20 rounded-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <UserPlus className="h-4 w-4 text-ramadan-purple" />
                  <span className="text-sm text-ramadan-purple">
                    Пользователь присоединился {new Date(referral.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

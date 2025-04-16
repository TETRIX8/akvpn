
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

export const ReferralSystem = () => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referredUsers, setReferredUsers] = useState<any[]>([]);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const fetchReferralInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      // Generate or fetch existing referral code
      const { data: existingReferral } = await supabase
        .from('referrals')
        .select('referral_code')
        .eq('referrer_id', user.id)
        .single();

      if (existingReferral) {
        setReferralCode(existingReferral.referral_code);
      } else {
        // Generate a new referral code
        const { data } = await supabase.rpc('generate_referral_code', { user_id: user.id });
        setReferralCode(data);
      }

      // Fetch referred users
      const { data: referrals } = await supabase
        .from('referrals')
        .select('*, referred_user_id(email)')
        .eq('referrer_id', user.id)
        .eq('status', 'completed');

      setReferredUsers(referrals || []);

      // Check if user has access
      const { data: profileData } = await supabase
        .from('profiles')
        .select('has_access')
        .eq('id', user.id)
        .single();

      setHasAccess(profileData?.has_access || false);
    };

    fetchReferralInfo();
  }, []);

  const copyReferralLink = () => {
    if (!referralCode) return;

    const referralLink = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      toast({
        title: "Ссылка скопирована",
        description: "Ваша реферальная ссылка скопирована в буфер обмена",
      });
    });
  };

  return (
    <Card className="p-6 space-y-4 bg-black/60 border border-white/10">
      <h2 className="text-2xl font-bold text-white">Реферальная система</h2>
      
      {referralCode && (
        <div className="space-y-2">
          <p className="text-white/80">Ваш уникальный код приглашения:</p>
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              readOnly 
              value={referralCode} 
              className="w-full p-2 bg-black/50 border border-white/20 text-white rounded"
            />
            <Button 
              onClick={copyReferralLink} 
              variant="outline" 
              className="text-white border-white/20"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-white/70">
            Делитесь этим кодом с друзьями. Получите доступ после приглашения 3 человек!
          </p>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Приглашенные пользователи</h3>
        {referredUsers.length > 0 ? (
          <ul className="space-y-2">
            {referredUsers.map((referral, index) => (
              <li key={index} className="text-white/80">
                {referral.referred_user_id?.email || 'Пользователь'}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/60">Вы еще не пригласили ни одного пользователя</p>
        )}
      </div>

      <div className="mt-4">
        <p className={`font-semibold ${hasAccess ? 'text-green-500' : 'text-red-500'}`}>
          {hasAccess 
            ? "✓ У вас есть полный доступ" 
            : `Осталось пригласить ${3 - referredUsers.length} пользователей для получения доступа`}
        </p>
      </div>
    </Card>
  );
};

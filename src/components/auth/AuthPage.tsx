
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

type FormData = {
  email: string;
  password: string;
  username?: string;
  referralCode?: string;
};

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Вход выполнен успешно",
          description: "Добро пожаловать!",
        });
      } else {
        // Check referral code validity if provided
        let hasAccess = false;
        if (data.referralCode) {
          const { data: referralData, error: referralError } = await supabase
            .from('referrals')
            .select('*')
            .eq('referral_code', data.referralCode)
            .single();

          if (referralError) {
            throw new Error("Недопустимый код приглашения");
          }

          // Check if the referrer has at least 3 completed referrals
          const { count: referralCount } = await supabase
            .from('referrals')
            .select('*', { count: 'exact', head: true })
            .eq('referrer_id', referralData.referrer_id)
            .eq('status', 'completed');

          hasAccess = referralCount >= 3;
        }

        const { error, data: authData } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              username: data.username,
              referralCode: data.referralCode,
              hasAccess,
            },
            emailRedirectTo: window.location.origin,
          },
        });
        
        if (error) throw error;

        // Update referral status if a valid referral code was used
        if (data.referralCode) {
          await supabase
            .from('referrals')
            .update({ 
              referred_user_id: authData.user?.id,
              status: 'completed' 
            })
            .eq('referral_code', data.referralCode);

          // Update user's access in profiles table
          await supabase
            .from('profiles')
            .update({ has_access: hasAccess })
            .eq('id', authData.user?.id);
        }
        
        toast({
          title: "Регистрация успешна",
          description: hasAccess 
            ? "Вы получили доступ!" 
            : "ВАЖНО: Сохраните ваши учетные данные. Восстановление пароля невозможно!",
        });
      }
    } catch (error: any) {
      let errorMessage = error.message;
      
      // Преобразование сообщений об ошибках для более понятного отображения
      if (errorMessage.includes("email not confirmed")) {
        errorMessage = "Email не подтвержден. Проверьте почту или свяжитесь с администратором.";
      } else if (errorMessage.includes("Invalid login credentials")) {
        errorMessage = "Неверный email или пароль";
      } else if (errorMessage.includes("already registered")) {
        errorMessage = "Этот email уже зарегистрирован";
      }
      
      toast({
        title: "Ошибка",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md space-y-6 p-6 bg-black/60 border border-white/10 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-center text-white">
          {isLogin ? 'Вход' : 'Регистрация'}
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <Input
                  placeholder="Имя пользователя"
                  className="bg-black/50 border-white/20 text-white"
                  {...register('username', { required: !isLogin })}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">Это поле обязательно</p>}
              </div>

              <div>
                <Input
                  placeholder="Код приглашения (необязательно)"
                  className="bg-black/50 border-white/20 text-white"
                  {...register('referralCode')}
                />
              </div>
            </>
          )}
          
          <div>
            <Input
              type="email"
              placeholder="Email"
              className="bg-black/50 border-white/20 text-white"
              {...register('email', { 
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Некорректный email адрес"
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">
              {errors.email.message || "Это поле обязательно"}
            </p>}
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Пароль"
              className="bg-black/50 border-white/20 text-white"
              {...register('password', { 
                required: true,
                minLength: {
                  value: 6,
                  message: "Пароль должен содержать минимум 6 символов"
                }
              })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">
              {errors.password.message || "Это поле обязательно"}
            </p>}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-vpn-blue hover:bg-vpn-blue/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLogin ? 'Вход...' : 'Регистрация...'}
              </>
            ) : (
              isLogin ? 'Войти' : 'Зарегистрироваться'
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              reset();
            }}
            className="text-vpn-blue hover:text-vpn-blue/90 text-sm"
            disabled={isLoading}
          >
            {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
          </button>
        </div>

        {!isLogin && (
          <p className="text-red-500 text-sm text-center">
            ⚠️ ВНИМАНИЕ: Сохраните ваши учетные данные!
            Восстановление пароля невозможно.
          </p>
        )}
      </Card>
    </div>
  );
};

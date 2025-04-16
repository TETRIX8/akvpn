
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  username?: string;
};

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              username: data.username,
            },
          },
        });
        
        if (error) throw error;
        
        toast({
          title: "Регистрация успешна",
          description: "ВАЖНО: Сохраните ваши учетные данные. Восстановление пароля невозможно!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
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
            <div>
              <Input
                placeholder="Имя пользователя"
                className="bg-black/50 border-white/20 text-white"
                {...register('username', { required: !isLogin })}
              />
            </div>
          )}
          
          <div>
            <Input
              type="email"
              placeholder="Email"
              className="bg-black/50 border-white/20 text-white"
              {...register('email', { required: true })}
            />
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Пароль"
              className="bg-black/50 border-white/20 text-white"
              {...register('password', { required: true })}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-vpn-blue hover:bg-vpn-blue/90"
          >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              reset();
            }}
            className="text-vpn-blue hover:text-vpn-blue/90 text-sm"
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

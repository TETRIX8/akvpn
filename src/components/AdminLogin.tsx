
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple hardcoded authentication
    if (username === "admin" && password === "tetrixuno") {
      // Store admin session in localStorage
      localStorage.setItem("adminAuthenticated", "true");
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в панель администратора",
      });
      onLogin();
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверный логин или пароль",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-full max-w-md p-6 bg-black/60 border border-white/10 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Панель администратора</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-white">Логин</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/50 border-white/20 text-white"
              placeholder="admin"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white">Пароль</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border-white/20 text-white"
              placeholder="••••••••"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-vpn-blue hover:bg-vpn-blue/90"
            disabled={isLoading}
          >
            {isLoading ? "Проверка..." : "Войти"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

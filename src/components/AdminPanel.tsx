
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { AdminLogin } from "./AdminLogin";
import { KeysManager } from "./admin/KeysManager";
import { ReviewsManager } from "./admin/ReviewsManager";
import { SettingsManager } from "./admin/SettingsManager";
import { LogOutIcon, Key, MessageSquare, Settings } from "lucide-react";

export const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из панели администратора",
    });
  };
  
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">AKVPN Панель администратора</h1>
          <Button variant="outline" onClick={handleLogout} className="gap-2 border-white/20 hover:bg-white/10">
            <LogOutIcon size={16} />
            Выйти
          </Button>
        </div>
        
        <Tabs defaultValue="keys" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-black/40 border border-white/10">
            <TabsTrigger value="keys" className="flex items-center gap-2 data-[state=active]:bg-vpn-blue/30">
              <Key size={16} />
              VPN ключи
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2 data-[state=active]:bg-vpn-blue/30">
              <MessageSquare size={16} />
              Отзывы
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-vpn-blue/30">
              <Settings size={16} />
              Настройки
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="keys" className="space-y-4">
            <KeysManager />
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            <ReviewsManager />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

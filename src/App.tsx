import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "./components/auth/AuthLayout";
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import Admin from "./pages/Admin";
import { useState, useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { DonationPopup } from "./components/DonationPopup";
import { trackVisit } from "./lib/supabase";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showDonation, setShowDonation] = useState(false);
  
  useEffect(() => {
    trackVisit().catch(err => console.error("Failed to track visit:", err));
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    
    const handleDonationPopup = () => {
      setShowDonation(true);
      
      setTimeout(() => {
        setShowDonation(false);
      }, 5000);
    };
    
    const initialDelay = setTimeout(() => {
      handleDonationPopup();
    }, 3000);
    
    const popupInterval = setInterval(handleDonationPopup, 6000);
    
    return () => {
      clearTimeout(initialDelay);
      clearInterval(popupInterval);
    };
  }, [loading]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <BrowserRouter>
              <AuthLayout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/ak" element={<Admin />} />
                </Routes>
              </AuthLayout>
            </BrowserRouter>
            <DonationPopup isVisible={showDonation} />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

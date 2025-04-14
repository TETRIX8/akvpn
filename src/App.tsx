
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
    // Initialize user tracking
    trackVisit().catch(err => console.error("Failed to track visit:", err));
    
    // Show loading screen for 6 seconds (increased to allow animation to complete)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return; // Don't start popup cycle during loading screen
    
    // Function to handle donation popup visibility
    const handleDonationPopup = () => {
      setShowDonation(true);
      
      // Show popup for 5 seconds
      setTimeout(() => {
        setShowDonation(false);
      }, 5000);
    };
    
    // Show popup initially after a delay
    const initialDelay = setTimeout(() => {
      handleDonationPopup();
    }, 3000); // Show first time after 3 seconds
    
    // Set up recurring popup every 6 seconds
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
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/ak" element={<Admin />} />
              </Routes>
            </BrowserRouter>
            <DonationPopup isVisible={showDonation} />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

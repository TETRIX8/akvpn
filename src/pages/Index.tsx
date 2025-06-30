
import React from "react";
import { BloodWarning } from "@/components/BloodWarning";

const Index = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Темный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900/10 to-black" />
      
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-4xl">
        <BloodWarning />
      </div>
    </div>
  );
};

export default Index;

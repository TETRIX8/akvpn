import React from "react";

export const AnimatedTitle = () => {
  const letters = "AKVPN".split("");

  return (
    <h1 className="text-6xl font-bold mb-4 overflow-hidden">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline-block animate-text-reveal"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
};
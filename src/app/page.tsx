'use client';

import { useState } from "react";
import ButtonCart from "@/components/ButtonCart";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import BadgeCart from "@/components/BadgeCart";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Header />
      <MainContent />
      <ButtonCart 
        onOpen={() => setIsCartOpen(true)} 
        itemCount={2} // Mock temporário
      />
      <BadgeCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={[]} // Passar array vazio para usar mock
      />
    </>
  );
}
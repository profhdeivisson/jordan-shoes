'use client';

import { useState } from "react";
import ButtonCart from "@/components/ButtonCart";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import BadgeCart from "@/components/BadgeCart";
import { useCart } from "@/contexts/CartContext";
import Alert from "@/components/Alert";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <>
      <Header />
      <MainContent />
      <ButtonCart 
        onOpen={() => setIsCartOpen(true)}
      />
      <BadgeCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
      />
      <Alert />
    </>
  );
}
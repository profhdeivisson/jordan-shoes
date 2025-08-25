'use client';

import { FaShoppingCart } from "react-icons/fa";

interface ButtonCartProps {
  onOpen: () => void;
  itemCount?: number;
}

export default function ButtonCart({ onOpen, itemCount = 0 }: ButtonCartProps) {
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-50 bg-brand hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Abrir carrinho de compras"
    >
      <FaShoppingCart className="text-xl" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
'use client';

import { FaTimes, FaTrash, FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import Image from "next/image";
import { BadgeCartProps } from "@/interfaces/BadgeCartProps";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function BadgeCart({ isOpen, onClose, items }: BadgeCartProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart, getTotalPrice } = useCart();
  const [confirmingDelete, setConfirmingDelete] = useState<number | null>(null);

  const total = getTotalPrice();

  const handleDeleteClick = (productId: number) => {
    setConfirmingDelete(productId);
  };

  const handleConfirmDelete = (productId: number) => {
    removeFromCart(productId);
    setConfirmingDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmingDelete(null);
  };

  if (!isOpen) return null;

  return (
    <>
        <div 
    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    onClick={onClose}
  />
  
  <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl ${
    isOpen ? 'animate-in slide-in-from-right' : 'translate-x-full'
  }`}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-dark-10">Carrinho de compras</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar carrinho"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto p-6 ${items.length === 0 ? 'h-[calc(100vh-6rem)]' : 'h-[calc(100vh-14rem)]'}`}>
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.produto.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <Image
                        src={typeof item.produto.image === 'string' ? item.produto.image : item.produto.image.src}
                        alt={item.produto.nome}
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2">{item.produto.nome}</h3>
                    <p className="text-brand font-medium text-sm mt-1">
                      {item.produto.preco.toLocaleString('pt-br', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      })}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => decreaseQuantity(item.produto.id)}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="px-3 py-1 text-sm">{item.quantidade}</span>
                        <button
                          onClick={() => increaseQuantity(item.produto.id)}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>

                      {confirmingDelete === item.produto.id ? (
                        <div className="flex items-center gap-1 bg-red-50 rounded-lg p-1">
                          <span className="text-xs text-red-700 px-1">Tem certeza?</span>
                          <button
                            onClick={() => handleConfirmDelete(item.produto.id)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                            aria-label="Sim, remover"
                          >
                            <FaCheck className="text-xs" />
                          </button>
                          <button
                            onClick={handleCancelDelete}
                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                            aria-label="Não, cancelar"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDeleteClick(item.produto.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          aria-label="Remover item"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>

                    <div className="mt-2 text-right">
                      <p className="font-semibold text-sm">
                        Subtotal: {(item.produto.preco * item.quantidade).toLocaleString('pt-br', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-brand">
                {total.toLocaleString('pt-br', { 
                  style: 'currency', 
                  currency: 'BRL' 
                })}
              </span>
            </div>
            <Link href="/checkout" className="w-full block text-center bg-brand hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
'use client';

import { FaTimes, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import image1 from "@/assets/img/air-jordan-1-mid-dutch-green-1-400.png";
import image2 from "@/assets/img/air-jordan-1-high-zoom-cmft-tropical-twist-1-400.png";
import { CartItem } from "@/interfaces/CartItemInterface";
import { BadgeCartProps } from "@/interfaces/BadgeCartProps";

export default function BadgeCart({ isOpen, onClose, items }: BadgeCartProps) {
  const mockItems: CartItem[] = [
    {
      produto: {
        id: 1,
        nome: "Air Jordan 1 Mid Dutch Green",
        preco: 1199.99,
        image: image1,
      },
      quantidade: 2
    },
    {
      produto: {
        id: 2,
        nome: "Air Jordan 1 High Zoom CMFT",
        preco: 1299.99,
        image: image2,
      },
      quantidade: 1
    },
    {
      produto: {
        id: 3,
        nome: "Air Jordan 1 Mid Dutch Green",
        preco: 1199.99,
        image: image1,
      },
      quantidade: 2
    },
    {
      produto: {
        id: 4,
        nome: "Air Jordan 1 High Zoom CMFT",
        preco: 1299.99,
        image: image2,
      },
      quantidade: 1
    },
    {
      produto: {
        id: 5,
        nome: "Air Jordan 1 Mid Dutch Green",
        preco: 1199.99,
        image: image1,
      },
      quantidade: 2
    },
    {
      produto: {
        id: 6,
        nome: "Air Jordan 1 High Zoom CMFT",
        preco: 1299.99,
        image: image2,
      },
      quantidade: 1
    },
  ];

  const cartItems = items.length > 0 ? items : mockItems;
  const total = cartItems.reduce((sum, item) => sum + (item.produto.preco * item.quantidade), 0);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300">
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

        <div className={`flex-1 overflow-y-auto p-6 content-center ${mockItems.length === 0 ? 'h-[calc(100vh-6rem)]' : 'h-[calc(100vh-14rem)]'}`}>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.produto.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.produto.image}
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
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="px-3 py-1 text-sm">{item.quantidade}</span>
                        <button
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>

                      <button
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Remover item"
                      >
                        <FaTrash />
                      </button>
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

        {cartItems.length > 0 && (
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
            <button className="w-full bg-brand hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </>
  );
}
'use client';

import { useCart } from "@/contexts/CartContext";
import { useAlert } from "@/contexts/AlertContext";
import { ProdutoProps } from "@/interfaces/ProdutoProps";
import Image from "next/image";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Produto({ produto }: ProdutoProps) {
    const [quantidade, setQuantidade] = useState(1);
    const { addToCart } = useCart();
    const { addAlert } = useAlert();

    const aumentarQuantidade = () => {
        setQuantidade(quantidade + 1);
    }

    const diminuirQuantidade = () => {
        setQuantidade(quantidade > 1 ? quantidade - 1 : 1);
    }

    const handleAdicionarCarrinho = () => {
        addToCart(produto, quantidade);
        addAlert(`${quantidade} ${produto.nome} adicionado(s) ao carrinho!`, 'success');
        setQuantidade(1);
    }

    return (
        <div className="produto group cursor-pointer w-full max-w-[316px] md:max-w-[336px] xl:max-w-[384px]">
            <div className="bg-brand-2 w-full h-[200px] flex justify-center items-center overflow-hidden relative">
                <Image
                src={produto.image}
                alt={produto.nome}
                width={225}
                height={135}
                className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="mt-3">
                <h3 className="font-medium text-base md:text-lg truncate">{produto.nome}</h3>
                <p className="font-medium text-brand text-base mt-2">{produto.categoria}</p>
                <p className="font-medium text-xl mt-4">
                {produto.preco.toLocaleString('pt-br', { 
                    style: 'currency', 
                    currency: 'BRL' 
                })}
                </p>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                    onClick={diminuirQuantidade}
                    disabled={quantidade <= 1}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-10"
                >
                    -
                </button>
                
                <input
                    type="number"
                    value={quantidade}
                    onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1) {
                        setQuantidade(value);
                    }
                    }}
                    min="1"
                    className="w-12 text-center border-x border-gray-300 py-2 outline-none"
                />
                
                <button
                    onClick={aumentarQuantidade}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors w-10"
                >
                    +
                </button>
                </div>

                <button
                onClick={handleAdicionarCarrinho}
                className="flex justify-center items-center gap-2 flex-1 bg-brand hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                Adicionar <FaShoppingCart />
                </button>
            </div>
        </div>
    );
}
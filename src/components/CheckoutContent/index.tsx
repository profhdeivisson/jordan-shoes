'use client';

import { useForm } from 'react-hook-form';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useAlert } from '@/contexts/AlertContext';
import { useRouter } from 'next/navigation';

interface CheckoutForm {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cartao: string;
  validade: string;
  cvv: string;
  titular: string;
}

export default function CheckoutContent() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { addAlert } = useAlert();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutForm>();
  
  const total = getTotalPrice();
  
  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    
    try {
      // Simular processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Limpar carrinho e mostrar sucesso
      clearCart();
      addAlert('Compra realizada com sucesso! Obrigado pela preferência.', 'success');
      
      // Redirecionar para home após 2 segundos
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error) {
      addAlert('Erro ao processar pagamento. Tente novamente.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full mb-10 md:mb-24">
        <div className="w-full max-w-4xl p-6 m-auto text-center">
          <h2 className="text-2xl font-bold text-dark-10 mb-4">Carrinho vazio</h2>
          <p className="text-gray-600">Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-10 md:mb-24">
      <div className="w-full max-w-6xl p-6 m-auto">
        <h1 className="text-3xl font-bold text-dark-10 mb-8">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Dados Pessoais</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo *
                  </label>
                  <input
                    {...register('nome', { required: 'Nome é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                  {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email é obrigatório',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email inválido'
                      }
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
                  </label>
                  <input
                    {...register('telefone', { required: 'Telefone é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                  {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPF *
                  </label>
                  <input
                    {...register('cpf', { required: 'CPF é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="000.000.000-00"
                  />
                  {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>}
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-6 mt-8">Endereço de Entrega</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CEP *
                  </label>
                  <input
                    {...register('cep', { required: 'CEP é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="00000-000"
                  />
                  {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço *
                  </label>
                  <input
                    {...register('endereco', { required: 'Endereço é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Rua, Avenida, etc."
                  />
                  {errors.endereco && <p className="text-red-500 text-sm mt-1">{errors.endereco.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número *
                  </label>
                  <input
                    {...register('numero', { required: 'Número é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="123"
                  />
                  {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complemento
                  </label>
                  <input
                    {...register('complemento')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Apto, Bloco, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro *
                  </label>
                  <input
                    {...register('bairro', { required: 'Bairro é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Seu bairro"
                  />
                  {errors.bairro && <p className="text-red-500 text-sm mt-1">{errors.bairro.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade *
                  </label>
                  <input
                    {...register('cidade', { required: 'Cidade é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Sua cidade"
                  />
                  {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado *
                  </label>
                  <select
                    {...register('estado', { required: 'Estado é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    {/* Adicione outros estados */}
                  </select>
                  {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>}
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-6 mt-8">Pagamento</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número do Cartão *
                </label>
                <input
                  {...register('cartao', { required: 'Número do cartão é obrigatório' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="0000 0000 0000 0000"
                />
                {errors.cartao && <p className="text-red-500 text-sm mt-1">{errors.cartao.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Validade *
                  </label>
                  <input
                    {...register('validade', { required: 'Validade é obrigatória' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="MM/AA"
                  />
                  {errors.validade && <p className="text-red-500 text-sm mt-1">{errors.validade.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV *
                  </label>
                  <input
                    {...register('cvv', { required: 'CVV é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="123"
                  />
                  {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Titular *
                  </label>
                  <input
                    {...register('titular', { required: 'Nome do titular é obrigatório' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Como no cartão"
                  />
                  {errors.titular && <p className="text-red-500 text-sm mt-1">{errors.titular.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-brand hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 mt-8"
              >
                {isProcessing ? 'Processando pagamento...' : 'Efetuar pagamento'}
              </button>
            </form>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-6">Resumo do Pedido</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.produto.id} className="flex justify-between items-center border-b pb-4">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.produto.nome}</p>
                    <p className="text-gray-600 text-sm">Qtd: {item.quantidade}</p>
                  </div>
                  <p className="font-semibold">
                    {(item.produto.preco * item.quantidade).toLocaleString('pt-br', { 
                    style: 'currency', 
                    currency: 'BRL' 
                })}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Subtotal:</span>
                <span>{total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Frete:</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold mt-4 pt-4 border-t">
                <span>Total:</span>
                <span>{total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
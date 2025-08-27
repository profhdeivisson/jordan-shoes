'use client';

import { useForm } from 'react-hook-form';
import { useCart } from '@/contexts/CartContext';
import { useCallback, useState } from 'react';
import { useAlert } from '@/contexts/AlertContext';
import { useRouter } from 'next/navigation';
import { fetchCep } from '@/services/fetchCep'

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

const formatTelefone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 10) {
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  } else {
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  }
};

const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const formatCEP = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};

const formatCartao = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})\d+?$/, '$1');
};

const formatValidade = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{2})\d+?$/, '$1');
};

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) || 'Email inválido';
};

const validateTelefone = (telefone: string) => {
  const numbers = telefone.replace(/\D/g, '');
  const regex = /^(\d{10}|\d{11})$/;
  return regex.test(numbers) || 'Telefone inválido';
};

const validateCPF = (cpf: string) => {
  const numbers = cpf.replace(/\D/g, '');
  const regex = /^\d{11}$/;
  return regex.test(numbers) || 'CPF inválido';
};

const validateCEP = (cep: string) => {
  const numbers = cep.replace(/\D/g, '');
  const regex = /^\d{8}$/;
  return regex.test(numbers) || 'CEP inválido';
};

const validateCartao = (cartao: string) => {
  const numbers = cartao.replace(/\D/g, '');
  const regex = /^\d{16}$/;
  return regex.test(numbers) || 'Número do cartão inválido';
};

const validateValidade = (validade: string) => {
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!regex.test(validade)) {
    return 'Validade inválida (MM/AA)';
  }

  const [mes, ano] = validade.split('/').map(Number);
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth() + 1;
  const anoAtual = dataAtual.getFullYear() % 100;

  if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
    return 'Validade inválida. Deve ser superior ou igual ao mês e ano atual.';
  }

  return true;
};

const validateCVV = (cvv: string) => {
  const regex = /^\d{3,4}$/;
  return regex.test(cvv) || 'CVV inválido';
};

export default function CheckoutContent() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { addAlert } = useAlert();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch, setValue, clearErrors, setError } = useForm<CheckoutForm>();
  
  const total = getTotalPrice();

  const handleCepBlur = useCallback(async (e: React.FocusEvent<HTMLInputElement>) => {
    const cepValue = e.target.value.replace(/\D/g, '');
    
    if (cepValue.length !== 8) {
      return;
    }

    setIsLoadingCep(true);
    
    try {
      const cepData = await fetchCep(cepValue);
      
      if (cepData) {
        setValue('endereco', cepData.logradouro);
        setValue('bairro', cepData.bairro);
        setValue('cidade', cepData.localidade);
        setValue('estado', cepData.uf);
        
        // Limpa erros dos campos preenchidos automaticamente
        clearErrors(['endereco', 'bairro', 'cidade', 'estado']);
      } else {
        addAlert('CEP não encontrado. Por favor, verifique o CEP digitado.', 'warning');
      }
    } catch (error) {
      addAlert('Erro ao buscar endereço. Tente novamente.', 'error');
    } finally {
      setIsLoadingCep(false);
    }
  }, [setValue, clearErrors, addAlert]);
  
  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addAlert('Compra realizada com sucesso! Obrigado pela preferência.', 'success');
      setIsCheckoutComplete(true);
      
      setTimeout(() => {
        clearCart();
        router.push('/');
      }, 2000);
      
    } catch (error) {
      addAlert('Erro ao processar pagamento. Tente novamente.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTelefone(e.target.value);
    setValue('telefone', formatted);
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setValue('cpf', formatted);
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    setValue('cep', formatted);
  };

  const handleCartaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCartao(e.target.value);
    setValue('cartao', formatted);
    clearErrors('cartao');
  };

  const handleValidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatValidade(e.target.value);
    setValue('validade', formatted);
    clearErrors('validade');
  };

  const handleNumberOnly = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  if (cartItems.length === 0 && !isCheckoutComplete) {
    return (
      <div className="w-full mb-10 md:mb-24">
        <div className="w-full max-w-4xl p-6 m-auto text-center">
          <h2 className="text-2xl font-bold text-dark-10 mb-4">Carrinho vazio</h2>
          <p className="text-gray-600">Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.</p>
          <button className="bg-brand text-white px-4 py-2 rounded-md mt-4" onClick={() => router.push('/')}>Voltar para a loja</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-10 md:mb-24">
      <div className="w-full max-w-6xl p-6 m-auto">
        <h1 className="text-3xl font-bold text-dark-10 mb-8">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      validate: validateEmail
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
                    {...register('telefone', { 
                      required: 'Telefone é obrigatório',
                      validate: validateTelefone
                    })}
                    onChange={handleTelefoneChange}
                    onKeyPress={handleNumberOnly}
                    maxLength={15}
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
                    {...register('cpf', { 
                      required: 'CPF é obrigatório',
                      validate: validateCPF
                    })}
                    onChange={handleCPFChange}
                    onKeyPress={handleNumberOnly}
                    maxLength={14}
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
                    {...register('cep', { 
                      required: 'CEP é obrigatório',
                      validate: validateCEP
                    })}
                    onChange={handleCEPChange}
                    onBlur={handleCepBlur}
                    onKeyPress={handleNumberOnly}
                    maxLength={9}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="00000-000"
                  />
                  {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep.message}</p>}
                  {isLoadingCep && <p className="text-blue-500 text-sm mt-1">Buscando endereço...</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço *
                  </label>
                  <input
                    {...register('endereco', { required: 'Endereço é obrigatório' })}
                    disabled={isLoadingCep}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent disabled:opacity-50"
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
                    disabled={isLoadingCep}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent disabled:opacity-50"
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
                    disabled={isLoadingCep}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent disabled:opacity-50"
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
                    disabled={isLoadingCep}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
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
                  {...register('cartao', { 
                    required: 'Número do cartão é obrigatório',
                    validate: validateCartao
                  })}
                  onChange={handleCartaoChange}
                  onKeyPress={handleNumberOnly}
                  maxLength={19}
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
                    {...register('validade', { 
                      required: 'Validade é obrigatória',
                      validate: validateValidade
                    })}
                    onChange={handleValidadeChange}
                    onKeyPress={handleNumberOnly}
                    maxLength={5}
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
                    {...register('cvv', { 
                      required: 'CVV é obrigatório',
                      validate: validateCVV
                    })}
                    onKeyPress={handleNumberOnly}
                    maxLength={4}
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
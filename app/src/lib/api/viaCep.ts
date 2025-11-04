// ViaCEP API - Consulta de Endereço por CEP
import axios from 'axios';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const fetchAddressByCep = async (cep: string): Promise<ViaCepResponse> => {
  const cleanCep = cep.replace(/\D/g, '');
  
  if (cleanCep.length !== 8) {
    throw new Error('CEP deve ter 8 dígitos');
  }

  try {
    const response = await axios.get<ViaCepResponse>(
      `https://viacep.com.br/ws/${cleanCep}/json/`
    );

    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }

    return response.data;
  } catch (error: any) {
    if (error.message === 'CEP não encontrado') {
      throw error;
    }
    throw new Error('Erro ao consultar CEP. Verifique sua conexão.');
  }
};


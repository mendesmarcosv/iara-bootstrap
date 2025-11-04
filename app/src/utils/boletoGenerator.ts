// Gerador de Boleto Fake
export interface BoletoData {
  value: number;
  orderId: string;
  customerName: string;
  customerCpf: string;
  dueDate?: Date;
}

// Gerar código de barras do boleto (44 dígitos)
export const generateBoletoBarcode = (data: BoletoData): string => {
  const { value, orderId } = data;
  
  // Formato simplificado de código de barras (44 dígitos)
  // Estrutura: Banco(3) + Moeda(1) + DV(1) + Fator(4) + Valor(10) + Campo Livre(25)
  
  const banco = '001'; // Banco do Brasil (exemplo)
  const moeda = '9'; // Real
  const fatorVencimento = '9999'; // Mock
  const valorFormatado = Math.round(value * 100).toString().padStart(10, '0');
  const campoLivre = orderId.replace(/\D/g, '').padEnd(25, '0').substring(0, 25);
  
  // Gera código sem DV primeiro
  const codigoSemDV = banco + moeda + fatorVencimento + valorFormatado + campoLivre;
  
  // DV simples (mock - em produção seria cálculo módulo 11)
  const dv = (parseInt(codigoSemDV.substring(0, 4)) % 10).toString();
  
  // Código completo: Banco + Moeda + DV + Resto
  return banco + moeda + dv + fatorVencimento + valorFormatado + campoLivre;
};

// Gerar linha digitável do boleto (47 dígitos com pontos e espaços)
export const generateBoletoDigitableLine = (barcode: string): string => {
  // Formata o código de barras em linha digitável
  // Formato: AAAAA.AAAAA BBBBB.BBBBBB CCCCC.CCCCCC D EEEEEEEEEEEEEE
  
  const campo1 = barcode.substring(0, 5) + '.' + barcode.substring(5, 10);
  const campo2 = barcode.substring(10, 15) + '.' + barcode.substring(15, 21);
  const campo3 = barcode.substring(21, 26) + '.' + barcode.substring(26, 32);
  const campo4 = barcode.substring(4, 5); // DV
  const campo5 = barcode.substring(5, 9) + barcode.substring(9, 19); // Fator + Valor
  
  return `${campo1} ${campo2} ${campo3} ${campo4} ${campo5}`;
};

// Gerar boleto completo
export const generateBoleto = (data: BoletoData) => {
  const dueDate = data.dueDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 dias
  
  const barcode = generateBoletoBarcode(data);
  const digitableLine = generateBoletoDigitableLine(barcode);
  
  return {
    barcode,
    digitableLine,
    recipient: 'Iara Games LTDA',
    cnpj: '00.000.000/0001-00',
    value: data.value.toFixed(2),
    dueDate: dueDate.toLocaleDateString('pt-BR'),
    orderId: data.orderId,
    customerName: data.customerName,
    customerCpf: data.customerCpf,
  };
};


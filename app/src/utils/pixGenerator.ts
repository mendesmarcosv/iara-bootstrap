// Gerador de PIX Fake
import QRCode from 'qrcode';

interface PixData {
  value: number;
  recipient: string;
  city: string;
  txid: string;
}

// Gerar payload PIX fake (simulado)
export const generatePixPayload = (data: PixData): string => {
  const { value, recipient, city, txid } = data;
  
  // Formato simplificado de payload PIX (simulado)
  const payload = {
    pixKey: 'iaragames@pix.com.br',
    recipient: recipient,
    city: city,
    value: value.toFixed(2),
    txid: txid,
    timestamp: new Date().toISOString(),
  };

  // Retorna string JSON simulando payload PIX
  return btoa(JSON.stringify(payload));
};

// Gerar QR Code a partir do payload
export const generatePixQRCode = async (payload: string): Promise<string> => {
  try {
    // Gera QR Code em formato base64
    const qrCodeDataUrl = await QRCode.toDataURL(payload, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
    
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error);
    throw new Error('Erro ao gerar QR Code do PIX');
  }
};

// Função principal - Gera PIX completo
export const generatePix = async (value: number, orderId: string) => {
  const pixData: PixData = {
    value,
    recipient: 'Iara Games LTDA',
    city: 'São Paulo',
    txid: orderId,
  };

  const payload = generatePixPayload(pixData);
  const qrCode = await generatePixQRCode(payload);

  return {
    payload,
    qrCode,
    pixKey: 'iaragames@pix.com.br',
    value: value.toFixed(2),
    expiresIn: 30, // minutos
  };
};


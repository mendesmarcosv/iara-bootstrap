// Hook de Carrinho de Compras - Jogos Digitais (sem quantidade)
import { useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string | null;
}

const CART_STORAGE_KEY = 'iara_cart';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar carrinho do localStorage ao montar
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setItems(parsedCart);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      
      // Disparar evento customizado para sincronizar entre componentes
      window.dispatchEvent(new Event('cartUpdated'));
    }
  }, [items, loading]);

  // Verificar se item está no carrinho
  const isInCart = useCallback((id: number): boolean => {
    return items.some((item) => item.id === id);
  }, [items]);

  // Adicionar item ao carrinho (jogos digitais - sem quantidade)
  const addItem = useCallback((item: CartItem) => {
    setItems((prevItems) => {
      const exists = prevItems.find((i) => i.id === item.id);
      
      if (exists) {
        // Já existe, não adiciona novamente
        return prevItems;
      } else {
        // Adiciona novo item
        return [...prevItems, item];
      }
    });
  }, []);

  // Remover item do carrinho
  const removeItem = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  // Toggle item (adiciona se não existe, remove se existe)
  const toggleItem = useCallback((item: CartItem) => {
    const exists = items.find((i) => i.id === item.id);
    if (exists) {
      removeItem(item.id);
      return false; // Removido
    } else {
      addItem(item);
      return true; // Adicionado
    }
  }, [items, addItem, removeItem]);

  // Limpar carrinho
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Calcular total de itens (quantidade de jogos diferentes)
  const totalItems = items.length;

  // Calcular subtotal
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  // Calcular total (por enquanto igual ao subtotal)
  const total = subtotal;

  return {
    items,
    loading,
    addItem,
    removeItem,
    toggleItem,
    isInCart,
    clearCart,
    totalItems,
    subtotal,
    total,
  };
};

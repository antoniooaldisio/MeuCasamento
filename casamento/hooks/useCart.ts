import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  nome: string;
  valor: string;
  link_da_imagem: string;
  quantidade: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar carrinho do localStorage apenas no cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          setCart(parsed);
          console.log('Carrinho carregado:', parsed);
        } catch (error) {
          console.error('Erro ao carregar carrinho:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Carrinho salvo:', cart);
    }
  }, [cart, isLoaded]);

  const addToCart = (item: Omit<CartItem, 'quantidade'>) => {
    console.log('useCart - addToCart chamado com:', item);
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((i) => i.id === item.id);

      let newItems;
      if (existingItem) {
        newItems = prevCart.items.map((i) =>
          i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      } else {
        newItems = [...prevCart.items, { ...item, quantidade: 1 }];
      }

      const newTotal = newItems.reduce(
        (sum, i) => sum + Number(i.valor) * i.quantidade,
        0
      );

      console.log('Novo carrinho:', { items: newItems, total: newTotal });
      return { items: newItems, total: newTotal };
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((i) => i.id !== id);
      const newTotal = newItems.reduce(
        (sum, i) => sum + Number(i.valor) * i.quantidade,
        0
      );

      return { items: newItems, total: newTotal };
    });
  };

  const updateQuantity = (id: number, quantidade: number) => {
    if (quantidade <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((i) =>
        i.id === id ? { ...i, quantidade } : i
      );
      const newTotal = newItems.reduce(
        (sum, i) => sum + Number(i.valor) * i.quantidade,
        0
      );

      return { items: newItems, total: newTotal };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoaded,
  };
}
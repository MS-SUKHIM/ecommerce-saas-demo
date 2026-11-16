import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartItem { id: string; name: string; price: number; qty: number; img: string }
interface CartCtx {
  items: CartItem[]; total: number; itemCount: number;
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
}
const Ctx = createContext<CartCtx | null>(null);

type Action =
  | { type: 'ADD'; item: Omit<CartItem, 'qty'> }
  | { type: 'REMOVE'; id: string }
  | { type: 'QTY'; id: string; qty: number }
  | { type: 'CLEAR' };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.item.id);
      return existing
        ? state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state, { ...action.item, qty: 1 }];
    }
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    case 'QTY': return action.qty <= 0 ? state.filter(i => i.id !== action.id) : state.map(i => i.id === action.id ? { ...i, qty: action.qty } : i);
    case 'CLEAR': return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <Ctx.Provider value={{
      items, total, itemCount,
      addItem: item => dispatch({ type: 'ADD', item }),
      removeItem: id => dispatch({ type: 'REMOVE', id }),
      updateQty: (id, qty) => dispatch({ type: 'QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart outside CartProvider');
  return ctx;
};

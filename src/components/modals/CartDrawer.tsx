import { ShoppingCart, X, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { formatCurrency } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';

interface Props { open: boolean; onClose: () => void }

export default function CartDrawer({ open, onClose }: Props) {
  const { items, total, itemCount, updateQty, removeItem } = useCart();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-[var(--bg-card)] shadow-2xl flex flex-col transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-[#059669]" />
            <span className="font-bold text-[var(--fg)]">السلة</span>
            {itemCount > 0 && <span className="w-5 h-5 bg-[#059669] text-white text-xs font-bold rounded-full flex items-center justify-center">{itemCount}</span>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-[var(--fg-muted)]"><X size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <ShoppingCart size={40} className="text-gray-300 mb-3" />
              <p className="text-[var(--fg-muted)] text-sm">السلة فارغة</p>
              <button onClick={onClose} className="mt-3 text-xs text-[#059669] font-semibold hover:underline">تصفح المنتجات</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 bg-[var(--bg)] rounded-xl p-3">
                <img src={item.img} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-gray-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--fg)] truncate">{item.name}</p>
                  <p className="text-sm font-bold text-[#059669] mt-0.5">{formatCurrency(item.price)}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 transition-colors"><Minus size={11} /></button>
                    <span className="w-7 text-center text-sm font-bold text-[var(--fg)]">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 transition-colors"><Plus size={11} /></button>
                    <button onClick={() => removeItem(item.id)} className="w-6 h-6 rounded-lg text-red-400 hover:bg-red-50 flex items-center justify-center mr-1 transition-colors"><Trash2 size={11} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--fg-muted)]">الإجمالي:</span>
              <span className="font-bold text-[var(--fg)]">{formatCurrency(total)}</span>
            </div>
            <Separator />
            <Link to={ROUTES.STORE_CHECKOUT} onClick={onClose}>
              <Button className="w-full gap-2">
                إتمام الشراء <ArrowLeft size={15} />
              </Button>
            </Link>
            <Link to={ROUTES.STORE_CART} onClick={onClose}>
              <Button variant="outline" size="sm" className="w-full mt-1">عرض السلة كاملاً</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

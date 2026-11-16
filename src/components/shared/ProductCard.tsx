import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Badge } from '../ui/badge';
import { formatCurrency } from '../../lib/utils';
import { toast } from 'sonner';
import type { products as ProductsType } from '../../data/mockData';

type Product = typeof ProductsType[0];
interface Props { product: Product; onClick?: () => void }

export default function ProductCard({ product, onClick }: Props) {
  const { addItem } = useCart();
  const [wished, setWished] = useState(false);
  const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock === 0) return;
    addItem({ id: product.id, name: product.name, price: product.price, img: product.img });
    toast.success('تم إضافته للسلة', { description: product.name });
  };

  return (
    <div onClick={onClick} className="group bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
      <div className="relative overflow-hidden h-48 bg-gray-100 dark:bg-slate-800">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {discount > 0 && <Badge variant="red" className="absolute top-2 right-2">{discount}% خصم</Badge>}
        {product.stock === 0 && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full">نفذ المخزون</span></div>}
        <button
          onClick={e => { e.stopPropagation(); setWished(!wished); }}
          className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition-all"
        >
          <Heart size={14} className={wished ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-[var(--fg-muted)] mb-1">{product.tags?.join(' · ')}</p>
        <h4 className="font-semibold text-sm text-[var(--fg)] leading-snug line-clamp-2 mb-2">{product.name}</h4>
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={11} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
          ))}
          <span className="text-xs text-[var(--fg-muted)] mr-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-[var(--fg)]">{formatCurrency(product.price)}</span>
            {product.comparePrice && <span className="text-xs text-[var(--fg-muted)] line-through mr-1.5">{formatCurrency(product.comparePrice)}</span>}
          </div>
          <button
            onClick={handleCart}
            disabled={product.stock === 0}
            className="flex items-center gap-1.5 bg-[#059669] hover:bg-[#047857] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            <ShoppingCart size={13} /> أضف
          </button>
        </div>
      </div>
    </div>
  );
}

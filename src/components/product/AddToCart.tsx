'use client';

import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Button } from '@/components/generic/Button';
import { Product } from '@/types';

export default function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Button 
      onClick={handleAddToCart}
      className="w-full md:w-auto"
      disabled={!product.inStock}
    >
      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  );
}

import React from "react";
import { useTranslations } from "next-intl";
import { Product } from "@/types";
import Image from "next/image";
import AddToCart from "@/components/product/AddToCart";
import { Link } from "@/i18n/navigation";
import { Button } from "../generic/Button";
import {  LinkIcon } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const Card: React.FC<ProductCardProps> = ({ product }: ProductCardProps) => {
  const t = useTranslations();

  return (
    <div className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 w-full bg-gray-100">
  <Image
    fill
    src={product.image ?? ""}
    alt={product.name ?? ""}
    className="object-contain"
  />
</div>

        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-natural-charcoal">
              {t("product.price", { price: product.price! })}
            </span>
            <span className="flex items-center gap-2 justify-center">
              <Link className="inline" href={`/product/${product.slug}`}>
                <Button>
                  <LinkIcon size={16} /> Details
                </Button>
              </Link>
              <AddToCart product={product} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

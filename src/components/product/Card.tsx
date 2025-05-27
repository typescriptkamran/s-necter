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
        <div className="relative pb-[75%] overflow-hidden">
          <Image
            width={300}
            height={400}
            src={product.image ?? ""}
            alt={product.name ?? ""}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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

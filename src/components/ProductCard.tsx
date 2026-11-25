import { Link } from "react-router";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/format";
import { categoryLabels } from "../data/categories";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/produits/${product.id}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="aspect-square overflow-hidden bg-sage-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-sage-500">
          {categoryLabels[product.category]}
        </p>
        <h3 className="mt-1 line-clamp-1 font-medium">{product.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-sage-700">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm">★ {product.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}

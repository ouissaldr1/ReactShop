import { useState } from "react";
import { Link, useParams } from "react-router";
import { categoryLabels } from "../data/categories";
import { useFetch } from "../hooks/useFetch";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/format";
import { useCart } from "../hooks/useCart";

export default function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useFetch<Product>(`https://dummyjson.com/products/${id}`);

  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (loading) return <p>Chargement...</p>;
  if (error || !product) return <p>Produit introuvable.</p>;

  return (
    <section>
      <Link to="/" className="text-sm text-sage-700 hover:underline">
        ← Retour à la boutique
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={product.images[imageIndex]}
            alt={product.title}
            className="w-full rounded-2xl bg-sage-100"
          />
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <img
                key={img}
                src={img}
                alt={`${product.title} ${i + 1}`}
                onClick={() => setImageIndex(i)}
                className={`h-16 w-16 cursor-pointer rounded-lg bg-sage-100 ${
                  i === imageIndex ? "ring-2 ring-sage-700" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase text-sage-500">
            {categoryLabels[product.category]}
          </p>
          <h1 className="mt-1 font-display text-3xl">{product.title}</h1>
          <p className="mt-2 text-sm">★ {product.rating.toFixed(1)}</p>
          <p className="mt-4 text-2xl font-semibold text-sage-700">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4">{product.description}</p>
          <p className="mt-2 text-sm">
            {product.stock > 0
              ? `${product.stock} en stock`
              : "Rupture de stock"}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => {
                setQuantity((prev) => prev - 1);
              }}
              disabled={quantity === 1}
              className="h-9 w-9 rounded-lg bg-white disabled:opacity-40"
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => {
                setQuantity((prev) => prev + 1);
              }}
              disabled={quantity >= product.stock}
              className="h-9 w-9 rounded-lg bg-white disabled:opacity-40"
            >
              +
            </button>
          </div>

          <button
            onClick={() => addToCart(product, quantity)}
            disabled={product.stock === 0}
            className="mt-6 rounded-full bg-sage-700 px-6 py-2 text-white hover:bg-sage-500 disabled:opacity-40"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </section>
  );
}

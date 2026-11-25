import { Link } from "react-router";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/format";

export default function Cart() {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <section className="py-16 text-center">
        <h1 className="font-display text-3xl">Votre panier est vide</h1>

        <p className="mt-4 text-gray-500">
          Découvrez nos produits maison et déco.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-sage-700 px-6 py-3 text-white hover:bg-sage-500"
        >
          Découvrir les produits
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-8 font-display text-3xl">Mon panier</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl bg-white p-4 sm:flex-row"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-28 w-28 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{product.title}</h2>

                <p className="mt-2 text-sage-700">
                  {formatPrice(product.price)}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    disabled={quantity <= 1}
                    aria-label={`Diminuer la quantité de ${product.title}`}
                    className="rounded-lg border px-3 py-1 disabled:opacity-40"
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    disabled={quantity >= product.stock}
                    aria-label={`Augmenter la quantité de ${product.title}`}
                    className="rounded-lg border px-3 py-1 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="mt-4 text-sm text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </div>

              <p className="font-semibold">
                {formatPrice(product.price * quantity)}
              </p>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl bg-white p-6">
          <h2 className="text-xl font-semibold">Récapitulatif</h2>

          <div className="mt-6 flex justify-between">
            <span>Total</span>
            <span className="font-semibold">{formatPrice(totalPrice)}</span>
          </div>

          <Link
            to="/commande"
            className="mt-6 block rounded-full bg-sage-700 px-6 py-3 text-center text-white hover:bg-sage-500"
          >
            Passer commande
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className=" mt-6 w-full  rounded-lg border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Vider le panier
          </button>
        </aside>
      </div>
    </section>
  );
}

import { Link } from "react-router";
import { formatPrice } from "../utils/format";
import type { Order } from "../types/order";

export default function OrderConfirmation({ order }: { order: Order }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Commande confirmée !</h1>

      <p className="mb-2">
        Merci {order.customer.fullName} pour votre commande.
      </p>

      <p className="mb-8 text-gray-600">
        Votre commande a été validée avec succès.
      </p>

      <section className="rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Récapitulatif de votre commande
        </h2>

        <ul className="space-y-4">
          {order.items.map(({ product, quantity }) => (
            <li key={product.id} className="flex justify-between border-b pb-4">
              <div>
                <p className="font-medium">{product.title}</p>
                <p className="text-sm text-gray-600">Quantité : {quantity}</p>
              </div>

              <p className="font-semibold">
                {formatPrice(product.price * quantity)}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xl font-bold">
          Total : {formatPrice(order.totalPrice)}
        </p>
      </section>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-sage-600 px-6 py-3 text-white hover:bg-sage-700"
      >
        Continuer mes achats
      </Link>
    </div>
  );
}

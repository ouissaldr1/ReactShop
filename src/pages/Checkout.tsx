import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/format";
import type { CheckoutForm, FormErrors } from "../types/form";
import type { Order } from "../types/order";
import FormInput from "../components/FormInput";
import OrderConfirmation from "../components/OrderConfirmation";
import { validateCheckoutForm } from "../utils/validation";

export default function Checkout() {
  const { totalPrice, clearCart, items } = useCart();
  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const [order, setOrder] = useState<Order | null>(null);

  const handleFieldChange = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateCheckoutForm(form);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    if (items.length === 0) {
      return;
    }
    setOrder({
      customer: form,
      items: items,
      totalPrice: totalPrice,
    });
    clearCart();
  };

  if (order) {
    return <OrderConfirmation order={order} />;
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Finaliser ma commande</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Mes informations</h2>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <FormInput
              id="fullName"
              label="Nom complet"
              value={form.fullName}
              onChange={(value) => handleFieldChange("fullName", value)}
              error={errors.fullName}
            />

            <FormInput
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => handleFieldChange("email", value)}
              error={errors.email}
            />

            <FormInput
              id="address"
              label="Adresse"
              value={form.address}
              onChange={(value) => handleFieldChange("address", value)}
              error={errors.address}
            />

            <FormInput
              id="city"
              label="Ville"
              value={form.city}
              onChange={(value) => handleFieldChange("city", value)}
              error={errors.city}
            />

            <FormInput
              id="postalCode"
              label="Code postal"
              value={form.postalCode}
              onChange={(value) => handleFieldChange("postalCode", value)}
              error={errors.postalCode}
            />
            <button
              disabled={items.length === 0}
              type="submit"
              className="w-full rounded-lg bg-sage-500 px-4 py-3 font-semibold text-white hover:bg-sage-700"
            >
              Valider ma commande
            </button>
          </form>
        </section>

        <div className="rounded-xl border p-6">
          <h2>Récapitulatif</h2>
          <p className=" text-lg font-bold">
            Total : {formatPrice(totalPrice)}
          </p>
        </div>
      </div>
    </main>
  );
}

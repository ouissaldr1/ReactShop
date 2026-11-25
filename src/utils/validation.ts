import type { CheckoutForm, FormErrors } from "../types/form";

export function validateCheckoutForm(form: CheckoutForm): FormErrors {
  const newErrors: FormErrors = {};

  if (!form.fullName.trim()) {
    newErrors.fullName = "Le nom complet est obligatoire";
  }

  if (!form.email.trim()) {
    newErrors.email = "L'email est obligatoire";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "L'email est invalide";
  }

  if (!form.address.trim()) {
    newErrors.address = "L'adresse est obligatoire";
  }

  if (!form.city.trim()) {
    newErrors.city = "La ville est obligatoire";
  }

  if (!/^\d{5}$/.test(form.postalCode.trim())) {
    newErrors.postalCode = "Le code postal doit contenir 5 chiffres";
  }

  return newErrors;
}

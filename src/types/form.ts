export type CheckoutForm = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
};
export type FormErrors = Partial<Record<keyof CheckoutForm, string>>;

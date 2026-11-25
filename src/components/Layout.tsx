import { Link, NavLink, Outlet } from "react-router";
import { useCart } from "../hooks/useCart";

export default function Layout() {
  const { totalItems } = useCart();
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-sage-700 py-2 text-center text-sm text-white">
        Livraison offerte dès 50 € d'achat
      </div>

      <header className="border-b border-sage-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-display text-2xl text-sage-700">
            ReactShop
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <NavLink to="/" className="hover:text-sage-700">
              Boutique
            </NavLink>
            <NavLink to="/panier" className="hover:text-sage-700">
              Panier ({totalItems})
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-sage-100 py-6 text-center text-sm">
        © 2026 ReactShop, projet portfolio
      </footer>
    </div>
  );
}

import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { categoryLabels, HOME_CATEGORIES } from "../data/categories";
import { useFetch } from "../hooks/useFetch";
import type { ProductsResponse } from "../types/product";
import Pagination from "../components/Pagination";

export default function Home() {
  const PAGE_SIZE = 8;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch<ProductsResponse>(
    "https://dummyjson.com/products?limit=0",
  );

  const products = useMemo(() => {
    let result =
      data?.products.filter((p) => HOME_CATEGORIES.includes(p.category)) ?? [];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }
    const searchText = search.toLowerCase().trim();
    if (searchText) {
      result = result.filter((p) => p.title.toLowerCase().includes(searchText));
    }

    if (sort === "asc") result.sort((a, b) => a.price - b.price);
    if (sort === "desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [data, category, sort, search]);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visibleProducts = products.slice(start, start + PAGE_SIZE);

  function handlePageChange(newPage: number) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section>
      <h1 className="mb-6 font-display text-3xl">Notre sélection maison</h1>
      <input
        type="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Rechercher un produit..."
        className="mb-4  rounded-lg border border-sage-500 bg-white px-3 py-1 text-sm"
      />
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            setCategory("all");
            setPage(1);
          }}
          className={`rounded-full px-4 py-1 text-sm ${
            category === "all" ? "bg-sage-700 text-white" : "bg-white"
          }`}
        >
          Tout
        </button>

        {HOME_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              setPage(1);
            }}
            className={`rounded-full px-4 py-1 text-sm ${
              category === c ? "bg-sage-700 text-white" : "bg-white"
            }`}
          >
            {categoryLabels[c]}
          </button>
        ))}

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="ml-auto rounded-lg border border-sage-500 bg-white px-3 py-1 text-sm"
        >
          <option value="default">Trier par</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>
      {error && <p className="text-terracotta">Erreur : {error}</p>}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)
          : visibleProducts.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {!loading && !error && products.length === 0 && (
        <p>Aucun produit trouvé.</p>
      )}
      {!loading && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}

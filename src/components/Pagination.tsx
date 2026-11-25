type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded-lg bg-white px-3 py-1 text-sm disabled:opacity-40"
      >
        Précédent
      </button>

      {pages.map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`rounded-lg px-3 py-1 text-sm ${
            n === page ? "bg-sage-700 text-white" : "bg-white"
          }`}
        >
          {n}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="rounded-lg bg-white px-3 py-1 text-sm disabled:opacity-40"
      >
        Suivant
      </button>
    </nav>
  );
}

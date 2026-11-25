import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Erreur ${res.status}`);
        }

        const data: T = await res.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setError(error instanceof Error ? error.message : "Erreur inconnue");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

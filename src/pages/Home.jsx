

import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion as Motion } from "framer-motion";

import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";

const PAGE_SIZE = 6;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const q = useQuery();
  const searchTerm = q.get("q")?.toLowerCase() || "";

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  // Categories
  const categories = useMemo(
    () => ["All", ...new Set(productsData.map((p) => p.category))],
    []
  );

  // Filtered & sorted products
  const filtered = useMemo(() => {
    let list = productsData.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(searchTerm)
    );

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [category, searchTerm, sortBy]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Compute effective page without setState in effect
  const effectivePage =
    category !== "All" || sortBy !== "featured" || searchTerm
      ? 1
      : Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (effectivePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, effectivePage]);

  return (
    <div>
      {/* Filter Bar */}
      <section className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing <strong>{filtered.length}</strong> results
        </div>
      </section>

      {/* Product Grid */}
      <section>
        <Motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paged.map((p) => (
            <Motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
            >
              <ProductCard product={p} />
            </Motion.div>
          ))}
        </Motion.div>
      </section>

      {/* Pagination */}
      <section className="mt-6 flex items-center justify-center gap-3">
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={effectivePage === 1}
        >
          Prev
        </button>

        <div className="text-gray-700 dark:text-gray-300">
          Page {effectivePage} / {totalPages}
        </div>

        <button
          className="px-3 py-1 border rounded"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={effectivePage === totalPages}
        >
          Next
        </button>
      </section>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const productsData = [
  {
    id: 1,
    name: "Royal Temple Necklace",
    description: "Handcrafted gold-plated temple jewellery.",
    price: 4500,
    category: "Necklace",
    image: "/jewellery/first.jpeg",
  },
  {
    id: 2,
    name: "Kundan Earrings",
    description: "Traditional kundan earrings with pearl drops.",
    price: 1200,
    category: "Earrings",
    image: "/jewellery/collection4.jpeg",
  },
  {
    id: 3,
    name: "Gold Bangles Set",
    description: "Elegant gold-finish bangles for festive looks.",
    price: 2200,
    category: "Bangles",
    image: "/jewellery/collection2.jpeg",
  },
  {
    id: 4,
    name: "Gold-Plated Wedding Ring",
    description: "Premium quality ring with stone embellishment.",
    price: 899,
    category: "Rings",
    image: "/jewellery/collection3.jpeg",
  },
];

const categories = ["All", "Necklace", "Earrings", "Bangles", "Rings"];
const priceFilters = ["None", "Low to High", "High to Low"];

const AllProduct = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("None");

  // Filter Category
  let filteredProducts =
    category === "All"
      ? productsData
      : productsData.filter((p) => p.category === category);

  // Price Sorting
  if (priceFilter === "Low to High") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (priceFilter === "High to Low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-10 px-4">
      <h1 className="text-center text-2xl font-bold py-4 text-yellow-700">
        Durga Alankar Jewellery
      </h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Category Filter */}
        <select
          className="p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* Price Filter */}
        <select
          className="p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          {priceFilters.map((pf) => (
            <option key={pf}>{pf}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 cursor-pointer hover:scale-105 transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-32 object-cover rounded-md"
            />

            <h3 className="text-sm font-bold mt-2 text-gray-900 dark:text-gray-100">
              {p.name}
            </h3>

            <p className="text-xs text-gray-600 dark:text-gray-400">
              {p.description}
            </p>

            <p className="text-sm font-semibold text-yellow-700 mt-1">
              ₹ {p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;

import { useParams, useNavigate } from "react-router-dom";

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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // find the product based on id
  const product = productsData.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-yellow-800 text-white px-4 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-10">
      {/* Header */}
      <header className="py-4 shadow-sm bg-white sticky top-0 z-50 text-center border-b border-yellow-200">
        <h1 className="text-xl font-bold text-yellow-800">
          Durga Alankar Jewellery
        </h1>
      </header>

      {/* Image */}
      <div className="px-4 mt-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover rounded-xl shadow-md border border-yellow-100"
        />
      </div>

      {/* Details */}
      <div className="px-5 mt-6">
        <h2 className="text-2xl font-bold text-yellow-800">{product.name}</h2>

        <p className="text-sm text-gray-500 mt-1">{product.category}</p>

        <p className="mt-3 text-lg text-gray-800 leading-relaxed">
          {product.description}
        </p>

        <p className="text-3xl font-extrabold text-yellow-900 mt-4">
          ₹ {product.price}
        </p>

        {/* Buy Button */}
        <button
          onClick={() => alert("Order feature coming soon!")}
          className="mt-6 w-full bg-yellow-800 text-white py-3 rounded-full text-lg shadow-md hover:bg-yellow-900 transition"
        >
          Order Now
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-full text-md shadow hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

import { Instagram, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
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

const Jewellery = () => {
  const navigate = useNavigate();

  const banners = [
    "/jewellery/home1.jpeg",
    "/jewellery/home2.jpeg",
    "/jewellery/home3.jpeg",
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 sec
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9ea] to-white text-gray-900 font-sans pb-10">
      {/* Brand Header */}
      <header className="text-center py-5 shadow-sm bg-white sticky top-0 z-50 border-b border-yellow-200">
        <h1 className="text-3xl font-extrabold text-yellow-800 tracking-wide">
          Durga Alankar
        </h1>
        <p className="text-sm text-gray-600 mt-1 tracking-wide">
          Premium Traditional • Modern • Bridal Jewellery
        </p>
      </header>

      {/* Banner Carousel */}
      <div className="relative w-full mt-5 px-3">
        <img
          src={banners[current]}
          alt="banner"
          className="w-full h-64 object-cover rounded-xl shadow-lg border border-yellow-200"
        />

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
        >
          ◀
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
        >
          ▶
        </button>

        {/* Slide Dots */}
        <div className="flex justify-center mt-3 gap-2">
          {banners.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full ${
                current === idx ? "bg-yellow-800" : "bg-yellow-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Highlighted Jewellery */}
      <section className="mt-8 px-4">
        <h2 className="text-xl font-bold text-yellow-900 mb-4">
          ✨ Highlight Collections
        </h2>

        <div className="grid grid-cols-2 gap-5">
          {[
            { img: "/jewellery/home1.jpeg", name: "Temple Necklace" },
            { img: "/jewellery/home2.jpeg", name: "Gold Earrings" },
            { img: "/jewellery/home3.jpeg", name: "Bangles Set" },
            { img: "/jewellery/home4.jpeg", name: "Designer Ring" },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-md border border-yellow-100 p-2 hover:scale-105 transition"
            >
              <img
                src={item.img}
                className="w-full h-32 object-cover rounded-lg"
                alt={item.name}
              />
              <p className="text-center text-sm font-semibold mt-2 text-yellow-900">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING PRODUCTS SECTION */}
      {/* TRENDING PRODUCTS SECTION */}
      <section className="mt-10 px-4">
        <h2 className="text-xl font-bold text-yellow-900 mb-4">
          🎁 Trending Now
        </h2>

        <div className="grid grid-cols-2 gap-5">
          {productsData.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/jewellery/product/${product.id}`)}
              className="relative bg-white rounded-xl shadow-lg border border-yellow-200 p-3 cursor-pointer transition transform hover:scale-[1.04] hover:shadow-xl"
            >
              {/* ❗ PREMIUM GOLD RIBBON */}
              <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-white text-[10px] font-bold px-2 py-[2px] rounded-tr-lg rounded-bl-lg shadow-md rotate-[-8deg]">
                TRENDING
              </div>

              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg border border-yellow-100 shadow-sm"
                />

                {/* Light gold glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-yellow-50/10 rounded-lg pointer-events-none" />
              </div>

              {/* Product Info */}
              <p className="text-sm font-semibold mt-2 text-yellow-900 line-clamp-1">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">{product.category}</p>

              <p className="text-base font-bold text-gray-900 mt-1">
                ₹ {product.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* View All Products Button */}
      <div className="mt-8 text-center px-5">
        <button
          onClick={() => navigate("/jewellery/all-product")}
          className="w-full bg-yellow-800 text-white py-3 rounded-full text-lg font-semibold shadow-md hover:bg-yellow-900 transition"
        >
          View All Products →
        </button>
      </div>

      {/* Contact & Social */}
      <footer className="mt-10 text-center text-gray-700">
        <h3 className="font-bold text-lg text-yellow-800">Contact Us</h3>
        <p className="text-sm mt-1 font-medium">📞 +91 7679475306</p>

        <div className="flex justify-center gap-6 mt-4 text-yellow-800 text-2xl">
          <a
            href="https://instagram.com/antrabarman123"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={26} />
          </a>

          <a
            href="https://youtube.com//@SmilyPieAnuOfficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube size={26} />
          </a>
        </div>

        <p className="text-xs mt-4 text-gray-500">
          © {new Date().getFullYear()} Durga Alankar • All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Jewellery;

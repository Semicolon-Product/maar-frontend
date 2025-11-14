import { Facebook, Instagram, Youtube } from "lucide-react";
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

      {/* ⭐ ABOUT SECTION */}
      <section className="mt-10 px-5">
        <h2 className="text-xl font-bold text-yellow-900">About Us</h2>
        <p className="text-sm text-gray-700 mt-3 leading-relaxed">
          At{" "}
          <span className="font-semibold text-yellow-800">Durga Alankar</span>,
          we celebrate the timeless beauty of Indian tradition. Every jewellery
          piece is handcrafted with precision, passion and purity— designed to
          make every woman feel regal, confident and truly divine.
        </p>
      </section>

      {/* ⭐ WHY CHOOSE US */}
      <section className="mt-10 px-5">
        <h2 className="text-xl font-bold text-yellow-900">Why Choose Us?</h2>

        <div className="mt-4 grid grid-cols-1 gap-4">
          {[
            {
              title: "Authentic Craftsmanship",
              desc: "Beautifully handcrafted jewellery made by skilled artisans.",
            },
            {
              title: "Premium Quality",
              desc: "High-quality plating and materials ensuring long-lasting shine.",
            },
            {
              title: "Affordable Luxury",
              desc: "Premium jewellery at prices that fit every budget.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 bg-white rounded-xl shadow-sm border border-yellow-100"
            >
              <h3 className="font-semibold text-yellow-900">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlighted Jewellery */}
      <section className="mt-10 px-4">
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

      {/* ⭐ BRIDAL COLLECTION SPOTLIGHT */}
      <section className="mt-10 px-5">
        <h2 className="text-xl font-bold text-yellow-900 mb-3">
          👰 Bridal Collection Spotlight
        </h2>

        <div className="relative">
          <img
            src="/jewellery/collection5.jpeg"
            className="w-full h-48 object-cover rounded-xl shadow-md border border-yellow-200"
            alt="Bridal Collection"
          />

          <div className="absolute bottom-3 left-3 bg-white/80 px-3 py-1 rounded-lg shadow">
            <p className="text-yellow-900 font-semibold text-sm">
              Explore Royal Bridal Sets →
            </p>
          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
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
              {/* RIBBON */}
              <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-white text-[10px] font-bold px-2 py-[2px] rounded-tr-lg rounded-bl-lg shadow-md rotate-[-8deg]">
                TRENDING
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg border border-yellow-100 shadow-sm"
              />

              <p className="text-sm font-semibold mt-2 text-yellow-900">
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

      {/* ⭐ TESTIMONIALS */}
      <section className="mt-10 px-5">
        <h2 className="text-xl font-bold text-yellow-900 mb-3">
          💬 What Our Customers Say
        </h2>

        <div className="space-y-4">
          {[
            {
              name: "Anjali Sharma",
              review:
                "Absolutely beautiful jewellery! The finish and shine are premium.",
            },
            {
              name: "Priya Verma",
              review:
                "Fast delivery and amazing packaging. Loved the earrings!",
            },
            {
              name: "Sneha Das",
              review: "Affordable yet luxurious. I felt like a queen!",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow border border-yellow-100"
            >
              <p className="text-sm font-semibold text-yellow-900">
                {item.name}
              </p>
              <p className="text-xs text-gray-600 mt-1">{item.review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* View All Products Button */}
      <div className="mt-10 text-center px-5">
        <button
          onClick={() => navigate("/jewellery/all-product")}
          className="w-full bg-yellow-800 text-white py-3 rounded-full text-lg font-semibold shadow-md hover:bg-yellow-900 transition"
        >
          View All Products →
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-700">
        <h3 className="font-bold text-lg text-yellow-800">Contact Us</h3>
        <p className="text-sm mt-1 font-medium">📞 +91 7679475306</p>

        <div className="flex justify-center gap-6 mt-4 text-yellow-800 text-2xl">
          <a href="https://instagram.com/antrabarman123" target="_blank">
            <Instagram size={26} />
          </a>
          <a href="https://youtube.com//@SmilyPieAnuOfficial" target="_blank">
            <Youtube size={26} />
          </a>
          <a
            href="https://www.facebook.com/amelia.hazra?rdid=qiqkXixalIgCiCiC&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CvpnemF1v%2F#"
            target="_blank"
          >
            <Facebook size={26} />
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

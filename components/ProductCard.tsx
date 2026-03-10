export default function ProductCard() {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        alt="product"
        className="w-full h-56 object-cover"
      />

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">
          Classic Watch
        </h2>

        <p className="text-gray-600 mt-1">
          $149
        </p>

        {/* Button */}
        <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Add to Cart
        </button>
      </div>

    </div>
  );
}
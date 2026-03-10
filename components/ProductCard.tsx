type ProductCardProps={
    name : string;
    price : number;
    image : string;
}
export default function ProductCard({name,price, image}: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-60 object-cover"
      />

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {name}
        </h2>

        <p className="text-gray-600 mt-1">
          Rs. {price}
        </p>

        {/* Button */}
        <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Add to Cart
        </button>
      </div>

    </div>
  );
}
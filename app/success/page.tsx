export default function SuccessPage() {
  return (
    <div className="p-10 text-center">

      <h1 className="text-4xl font-bold text-green-500">
        Payment Successful 🎉
      </h1>

      <p className="mt-4 text-gray-500">
        Thank you for your purchase.
      </p>

      <a
        href="/products"
        className="mt-6 inline-block bg-black text-white px-6 py-3 rounded"
      >
        Continue Shopping
      </a>

    </div>
  );
}

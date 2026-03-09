export default function ProductCard(){
    return(
        <div className="border p-4 rounded lg">
            <h2 className ="font-bold">Product Name</h2>
            <p>$29</p>
            <button className = "bg-black  text-white px-4 py-2 rounded mt-2">
                Add to Cart
            </button>
        </div>
    );
}
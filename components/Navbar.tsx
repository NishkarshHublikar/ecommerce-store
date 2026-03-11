import Link from "next/link";

<Link href="/cart">Cart</Link>
export default function Navbar(){
    return(
        <nav className= "flex justify-between p-6 border-b">
            <h1 className="text-xl font-bold">
                Store
            </h1>
            <div className="flex gap-6">
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <Link href="/cart">Cart</Link>
                <Link href="/checkout">Checkout</Link>
                <Link href ="/login">Login</Link>
            </div>
        </nav>
    );
}
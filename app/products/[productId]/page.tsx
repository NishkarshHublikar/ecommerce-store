type Props={
    params:{
        productId: string
    }
}
export default function ProductDetailPage({params}:Props){
    return(
        <div className ="p-10">
            <h1 className ="text-3xl font-bold mb-6">
                Product ID: {params.productId}
            </h1>
            <p>This is the product details page.</p> 
        </div>
    )
}
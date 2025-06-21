import { Product } from "@/interfaces/product-interface"
import { ProductCard } from "./ProductCard"

interface Props {
    products: Product[];
    addProductCart(id:number,productTitle: string, productPrice:number,productQuantity: number,productImage:string): void;
}
export const ProductsContainer = ({ products,addProductCart }: Props) => {

    return (
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {
                products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} addProductCart={addProductCart} />
                    ))
                ) : (
                    <div className="col-span-full">
                        <p className="text-center text-neutral-500">No se encontraron resultados</p>
                    </div>
                )
            }
        </section>
    )
}

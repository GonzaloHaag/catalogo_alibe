import { Product } from "@/interfaces/product-interface"
import { ProductCard } from "./ProductCard"

interface Props {
    products: Product[];
    addProductCart(id:number,productTitle: string, productPrice:number,productQuantity: number,productImage:string): void;
}
export const ProductsContainer = ({ products,addProductCart }: Props) => {
    const productsFilter = products.filter((product) => product.Estado === 'Activo');

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                productsFilter.length > 0 ? (
                    productsFilter.map((product) => (
                        <ProductCard key={product.Id} product={product} addProductCart={addProductCart} />
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

import { ProductCard } from "./ProductCard"

export const ProductsContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductCard />
    </section>
  )
}

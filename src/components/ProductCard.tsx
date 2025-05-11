import { Product } from "@/interfaces/product-interface"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react";

interface Props {
    product: Product;
    addProductCart(id:number,productTitle: string,productPrice:number, productQuantity: number,productImage:string): void;

}
export const ProductCard = ({ product,addProductCart }: Props) => {
 const [productQuantity, setProductQuantity] = useState<number>(1);
 const urlImage = product.foto && product.foto.includes('https://') 
  ? product.foto.match(/https:\/\/\S+/)?.[0] 
  : '/images/placeholder.webp';
    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="relative h-40 w-full">
                <img src={urlImage} alt="Imagen producto" className="object-contain h-full w-full" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-pretty md:min-h-16 flex items-center">{product.nombre}</h3>
                <p className="text-gray-600 font-bold mb-2">${product.precio_final}</p>
                <div className="flex items-center mb-2">
                    <Input type="number" value={productQuantity} onChange={(e) => setProductQuantity(Number(e.target.value))} min={1} className="w-20 mr-2" />
                    <Button
                        type="button"
                        title="Agregar al pedido"
                        aria-label="Boton agregar al pedido"
                        onClick={() => addProductCart(product.id,product.nombre,product.precio_final,productQuantity,product.foto)}
                    >Agregar al pedido
                    </Button>
                </div>
                <p className="text-xs text-green-600 italic">10% de descuento llevando más de 3 unidades</p>
            </div>
        </div>
    )
}

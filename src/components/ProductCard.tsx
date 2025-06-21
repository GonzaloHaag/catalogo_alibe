import { Product } from "@/interfaces/product-interface"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface Props {
    product: Product;
    addProductCart(id: number, productTitle: string, productPrice: number, productQuantity: number, productImage: string): void;

}
export const ProductCard = ({ product, addProductCart }: Props) => {
    const [productQuantity, setProductQuantity] = useState<number>(1);
    const urlImage = product.foto && product.foto.includes('https://')
        ? product.foto.match(/https:\/\/\S+/)?.[0]
        : '/images/placeholder.webp';

    const [openDialog, setOpenDialog] = useState(false);

    function handleOpenDialog() {
        setOpenDialog((prevState) => !prevState)
    }
    const totalPrice = product.precio_final * productQuantity;
    // 10% si hay mas de 2
    const discountedPrice = productQuantity > 2 ? totalPrice * 0.9 : totalPrice;
    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="relative h-32 w-full">
                <img src={urlImage} alt="Imagen producto" className="object-contain h-full w-full" />
            </div>
            <div className="p-4">
                <h3 className="text-xs md:text-sm font-semibold mb-2 text-pretty min-h-14 sm:min-h-10 text-start">{product.nombre}</h3>
                <p className="text-gray-600 font-bold mb-2 text-xs md:text-base">${product.precio_final}</p>
                <div className="flex items-center mb-2">
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger asChild>
                            <Button
                                type="button"
                                title="Agregar al pedido"
                                aria-label="Boton agregar al pedido"
                                className="text-xs px-2 md:px-6"
                            >Agregar al pedido
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Seleccioná la cantidad a llevar</DialogTitle>
                                <DialogDescription>
                                   { product.nombre }
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col">
                            <div className="mb-2 flex items-center justify-between text-sm">
                                    <span>Precio unitario</span>
                                    <span>${product.precio_final}</span>
                                </div>
                                <label htmlFor="cantidad" className="text-sm mb-2">Cantidad</label>
                                <Input type="number" value={productQuantity} onChange={(e) => setProductQuantity(Number(e.target.value))} min={1} className="w-full mb-2" />
                                <span className="text-green-600 text-sm">10% llevando más de 2 unidades!</span>
                                <span className="text-sm mt-2">Total: ${discountedPrice.toFixed(2)} {productQuantity > 2 && ' - descuento aplicado!'}</span>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <Button
                                    type="button"
                                    title="Agregar al pedido"
                                    aria-label="Boton agregar al pedido"
                                    onClick={() => addProductCart(product.id, product.nombre, product.precio_final, productQuantity, product.foto)}
                                >Guardar
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

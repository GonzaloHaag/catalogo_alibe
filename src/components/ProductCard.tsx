import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const ProductCard = () => {
    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="relative h-40 w-full">
                <img src="/images/placeholder.webp" alt="Imagen producto" className="object-cover h-full w-full" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-pretty">{'Titulo producto'}</h3>
                <p className="text-gray-600 font-bold mb-2">${16.500}</p>
                <div className="flex items-center mb-2">
                    <Input type="number" min="1" value={1} className="w-20 mr-2" />
                    <Button>Agregar al pedido</Button>
                </div>
                <p className="text-xs text-gray-500 italic">10% de descuento llevando más de 3 unidades</p>
            </div>
        </div>
    )
}

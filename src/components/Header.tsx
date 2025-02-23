import { ShoppingBagIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { CartInterface } from '@/interfaces/cart-interface';
import { ItemCart } from './ItemCart';
import { Button } from './ui/button';

interface Props {
    cart: CartInterface[];
    removeProductInCart(productId: number): void;
}

export const Header = ({ cart, removeProductInCart }: Props) => {
    const totalCartCount = cart.reduce((acumulador, item) => acumulador + item.productQuantity, 0);
    // Calcular el total general del pedido
    const totalOrderPrice = cart.reduce((total, item) => {
        const itemTotalPrice = item.productPrice * item.productQuantity;
        return total + (item.productQuantity > 2 ? itemTotalPrice * 0.9 : itemTotalPrice);
    }, 0);
    // Función para generar el mensaje de WhatsApp
    const generateWhatsAppMessage = () => {
        let message = "¡Hola! Quiero hacer el siguiente pedido:\n\n";

        // Recorrer todos los productos en el carrito
        cart.forEach((item, index) => {
            const itemTotalPrice = item.productPrice * item.productQuantity;
            const itemDiscountedPrice = item.productQuantity > 2 ? itemTotalPrice * 0.9 : itemTotalPrice;

            message += `Producto ${index + 1}:\n`;
            message += `- Nombre: ${item.productTitle}\n`;
            message += `- Cantidad: ${item.productQuantity}\n`;
            message += `- Precio unitario: $${item.productPrice.toFixed(2)}\n`;
            message += `- Precio total: $${itemDiscountedPrice.toFixed(2)}\n`;
            if (item.productQuantity > 2) {
                message += `  (10% de descuento aplicado)\n`;
            }
            message += "\n"; // Salto de línea entre productos
        });

        // Calcular el total general del pedido
        const totalOrderPrice = cart.reduce((total, item) => {
            const itemTotalPrice = item.productPrice * item.productQuantity;
            return total + (item.productQuantity > 2 ? itemTotalPrice * 0.9 : itemTotalPrice);
        }, 0);

        message += `Total del pedido: $${totalOrderPrice.toFixed(2)}\n\n`;
        message += "¿Podrías confirmar mi pedido, por favor?";

        // Codificar el mensaje para el enlace de WhatsApp
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/543425332182?text=${encodedMessage}`
    };
    return (
        <header className="bg-white shadow-md h-20 px-4 sticky w-full top-0 z-10 flex">
            <div className='w-full flex items-center justify-between md:max-w-6xl md:mx-auto'>
                <img src="/images/logo.webp" alt="logo alibe" width={140} height={140} loading="eager" className='aspect-auto' />
                <Sheet>
                    <SheetTrigger asChild>
                        <div className="relative">
                            <ShoppingBagIcon size={25} className="text-neutral-900 cursor-pointer" />
                            <span className="absolute -top-3 -right-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                                {totalCartCount}
                            </span>
                        </div>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Tú pedido</SheetTitle>
                            <SheetDescription className='text-pretty'>
                                Aquí podrás visualizar los detalles de tu pedido.
                            </SheetDescription>
                        </SheetHeader>
                        {
                            cart.length === 0 ? (
                                <div className='flex items-center text-center justify-center my-4'>
                                    <span className='text-sm text-center text-neutral-400'>No tienes ningún producto</span>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-y-4 my-4'>
                                    {
                                        cart.map((productInCart) => (
                                            <ItemCart key={productInCart.id} productInCart={productInCart} removeProductInCart={removeProductInCart} />
                                        ))
                                    }
                                </div>
                            )
                        }
                        <SheetFooter>
                            <div className='flex flex-col w-full gap-y-2'>
                                <span className='font-bold'>Total: ${totalOrderPrice.toFixed(2)}</span>
                                {
                                    cart.length > 0 && (
                                        <Button
                                            onClick={() => window.open(generateWhatsAppMessage(), "_blank")}
                                            className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                                        >
                                            Enviar pedido por WhatsApp
                                        </Button>
                                    )
                                }
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

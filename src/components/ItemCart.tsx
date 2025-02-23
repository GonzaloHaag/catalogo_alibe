import { CartInterface } from "@/interfaces/cart-interface"
import { Trash2Icon } from "lucide-react"

interface Props {
  productInCart: CartInterface;
  removeProductInCart(productId: number): void;
}

export const ItemCart = ({ productInCart, removeProductInCart }: Props) => {
  const totalPrice = productInCart.productPrice * productInCart.productQuantity;
  // 10% si hay mas de 3
  const discountedPrice = productInCart.productQuantity > 2 ? totalPrice * 0.9 : totalPrice;
  const urlImage = productInCart.productImage && productInCart.productImage.includes('https://') 
  ? productInCart.productImage.match(/https:\/\/\S+/)?.[0] 
  : '/images/placeholder.webp';
  return (
    <div className="flex items-center space-x-4 p-2 text-xs relative">
      <Trash2Icon size={20} className="text-red-600 absolute right-0 top-0 cursor-pointer" onClick={() => removeProductInCart(productInCart.id)} />
      <div className="flex-shrink-0">
        <img src={urlImage} alt={productInCart.productTitle} width={70} height={70} className="rounded-md" />
      </div>
      <div className="flex-grow flex flex-col gap-y-1">
        <h3 className="font-medium text-balance">{productInCart.productTitle}</h3>
        <p className=" text-gray-500">Precio: <span className="font-semibold">${productInCart.productPrice.toFixed(2)}</span></p>
        <p className=" text-gray-500">Cantidad: <span className="font-semibold">{productInCart.productQuantity}</span></p>
        <p className=" text-gray-500">Precio total: <span className="font-semibold">${discountedPrice.toFixed(2)}{productInCart.productQuantity > 2 && (<span className="text-green-500 text-xs ml-1">(10% Off)</span>)}</span></p>
      </div>
    </div>
  )
}

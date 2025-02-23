import { ChangeEvent, useEffect, useState } from "react";
import { Header, Pagination, ProductsContainer, SearchProducts } from "./components"
import { Product } from "./interfaces/product-interface";
import { Data } from "./interfaces/data-interface";
import { useDebounce } from "./hooks/use-debounce";
import { CartInterface } from "./interfaces/cart-interface";
import { toast } from "sonner";
import { Toaster } from './components/ui/sonner';

const cartLocalStorage = localStorage.getItem('carrito');

const initialCart = cartLocalStorage ? JSON.parse(cartLocalStorage) : [];
function App() {
  const [dataProducts, setDataProducts] = useState<Product[] | []>([]);
  const [cart, setCart] = useState<CartInterface[] | []>(initialCart);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalesPages] = useState(1);
  const API_URL = debouncedSearch ? `https://rest.contabilium.com/api/conceptos/search?pageSize=20&filtro=${debouncedSearch}` : `https://rest.contabilium.com/api/conceptos/search?pageSize=20&page=${currentPage}`;
  const headers = {
    'Authorization': `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: headers
        });
        const data: Data = await response.json();
        setDataProducts(data.Items);
        setTotalesPages(Math.ceil(data.TotalItems / data.TotalPage))
      }
      catch (e) {
        console.error(e);
      }
      finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, [debouncedSearch,currentPage]);

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }
  function addProductCart(id: number, productTitle: string, productPrice: number, productQuantity: number, productImage: string) {
    const newCart = [...cart];
    const estaEnCarrito = newCart.find((p) => p.id === id);

    if (estaEnCarrito) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      estaEnCarrito.productQuantity += productQuantity;
      toast.success('Cantidad actualizada!', {
        style: { backgroundColor: '#16a34a', color: "white" }
      })
    } else {
      // Si no está en el carrito, agrega el nuevo producto
      newCart.push({ id, productTitle, productPrice, productQuantity, productImage });
      toast.success('Producto agregado!', {
        style: { backgroundColor: '#16a34a', color: "white" }
      })
    }

    // Actualiza el estado del carrito
    setCart(newCart);
  }

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart)); // cada vez que cart cambia lo actualizamos
  }, [cart]);

  function removeProductInCart(productId: number) {
    const newCart = cart.filter((product) => product.id !== productId);
    setCart(newCart);
    toast.warning('Producto eliminado!', {
      style: { backgroundColor: "#dc2626", color: "white" }
    })
  }

  return (
    <>
      <Header cart={cart} removeProductInCart={removeProductInCart} />
      <main className="flex flex-col gap-y-4 p-4 w-full md:max-w-6xl md:mx-auto">
        <h1 className="text-center text-lg font-semibold">Catálogo de productos</h1>
        <SearchProducts searchValue={searchValue} searchOnChange={searchOnChange} />
        {
          isLoading ? (

            <div className="flex items-center justify-center">
              <svg width={40} height={40} fill="#dc2626" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="3" r="1"><animate id="spinner_7Z73" begin="0;spinner_tKsu.end-0.5s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="16.50" cy="4.21" r="1"><animate id="spinner_Wd87" begin="spinner_7Z73.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="7.50" cy="4.21" r="1"><animate id="spinner_tKsu" begin="spinner_9Qlc.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="19.79" cy="7.50" r="1"><animate id="spinner_lMMO" begin="spinner_Wd87.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="4.21" cy="7.50" r="1"><animate id="spinner_9Qlc" begin="spinner_Khxv.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="21.00" cy="12.00" r="1"><animate id="spinner_5L9t" begin="spinner_lMMO.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="3.00" cy="12.00" r="1"><animate id="spinner_Khxv" begin="spinner_ld6P.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="19.79" cy="16.50" r="1"><animate id="spinner_BfTD" begin="spinner_5L9t.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="4.21" cy="16.50" r="1"><animate id="spinner_ld6P" begin="spinner_XyBs.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="16.50" cy="19.79" r="1"><animate id="spinner_7gAK" begin="spinner_BfTD.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="7.50" cy="19.79" r="1"><animate id="spinner_XyBs" begin="spinner_HiSl.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="12" cy="21" r="1"><animate id="spinner_HiSl" begin="spinner_7gAK.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><animateTransform attributeName="transform" type="rotate" dur="6s" values="360 12 12;0 12 12" repeatCount="indefinite" /></g></svg>
            </div>

          ) : (
            <ProductsContainer products={dataProducts} addProductCart={addProductCart} />
          )
        }
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </main>
      <Toaster position="bottom-center" duration={1500} />
    </>
  )
}

export default App

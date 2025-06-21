import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FilterCategories, Header, ProductsContainer, SearchProducts } from "./components";
import { CartInterface } from "./interfaces/cart-interface";
import { toast } from "sonner";
import { Toaster } from './components/ui/sonner';
import { isError, useQuery } from "@tanstack/react-query";
import { useDebounce } from "./hooks/use-debounce";
import { getAllProducts } from "./utils/get-all-products";

const cartLocalStorage = localStorage.getItem('carrito');
const initialCart = cartLocalStorage ? JSON.parse(cartLocalStorage) : [];

function App() {
  const [cart, setCart] = useState<CartInterface[] | []>(initialCart);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [page, setPage] = useState(1); // Estado para la página actual
  // React Query para obtener los productos
  const { data: products = [], isLoading, isError } = useQuery(
    ['products', page, debouncedSearch, categorySelected],
    () => getAllProducts({ search: debouncedSearch, categorySelected: categorySelected }),
    {
      keepPreviousData: true, // Mantiene los datos de la página anterior mientras se carga la nueva
      staleTime: 1000 * 60 * 5, // Tiempo en el que los datos se consideran frescos
    }
  );

  // Manejadores de eventos para búsqueda y categorías
  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setPage(1); // Resetear la página cuando se cambie la búsqueda
  };

  const handleCategorySelected = useCallback((categoryId: number | null) => {
    setCategorySelected(categoryId);
    setPage(1);
  }, []);


  function addProductCart(id: number, productTitle: string, productPrice: number, productQuantity: number, productImage: string) {
    const newCart = [...cart];
    const estaEnCarrito = newCart.find((p) => p.id === id);

    if (estaEnCarrito) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      estaEnCarrito.productQuantity += productQuantity;
      toast.success('Cantidad actualizada!', {
        style: { backgroundColor: '#16a34a', color: "white" }
      });
    } else {
      // Si no está en el carrito, agrega el nuevo producto
      newCart.push({ id, productTitle, productPrice, productQuantity, productImage });
      toast.success('Producto agregado!', {
        style: { backgroundColor: '#16a34a', color: "white" }
      });
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
    });
  }
  return (
    <>
      <Header cart={cart} removeProductInCart={removeProductInCart} />
       <main className="flex flex-col h-[calc(100vh-5rem)] py-10 w-full px-4 md:max-w-6xl md:mx-auto">
         <div className="w-full grid grid-cols-1 md:grid-cols-8 items-center gap-y-4">
           <section className="md:col-span-2">
           <h1 className="text-base text-center text-red-400">Catálogo de productos</h1>
           </section>
           <section className="md:col-span-6">
           <SearchProducts searchValue={searchValue} searchOnChange={searchOnChange} />
           </section>
         </div>
         <div className="w-full grid grid-cols-1 md:grid-cols-8 h-full mt-6 gap-y-6">
           <section className="col-span-2 bg-red-600 md:px-6">
            <FilterCategories categorySelected={categorySelected} handleCategorySelected={handleCategorySelected} />
           </section>
           <section className="col-span-6 bg-red-900 h-full">
              {isLoading ? (
                <p className="text-center w-full">Cargando productos...</p>
              ) : isError ? (
                <p className="w-full text-center text-red-600">Ocurrió un error al obtener los productos</p>
              ) : (
                <ProductsContainer products={products || []} addProductCart={addProductCart} />
              )}
           </section>
         </div>
       </main>
      <Toaster position="bottom-center" duration={1500} />
    </>
  );
}

export default App;

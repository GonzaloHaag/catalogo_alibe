import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { FilterCategories, Header, ProductsContainer, SearchProducts } from "./components";
import { CartInterface } from "./interfaces/cart-interface";
import { toast } from "sonner";
import { Toaster } from './components/ui/sonner';
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "./utils/get-products-paginated";
import { useDebounce } from "./hooks/use-debounce";

const cartLocalStorage = localStorage.getItem('carrito');
const initialCart = cartLocalStorage ? JSON.parse(cartLocalStorage) : [];

function App() {
  const [cart, setCart] = useState<CartInterface[] | []>(initialCart);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);

  // Reemplazamos useInfiniteQuery por useQuery para obtener todos los productos
  const { data: allProducts = [], isLoading, error } = useQuery({
    queryKey: ['all-products'],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 60 * 4, // 4 horas
    cacheTime: 1000 * 60 * 60 * 5, // 5 horas para mantener el caché
    refetchOnWindowFocus: false, // Desactivar la recarga al cambiar de ventana
    refetchOnReconnect: false, // No volver a cargar al reconectar
  });

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

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

  function handleCategorySelected(categoryId: number | null) {
    setCategorySelected(categoryId);
  }

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchSearch = product.Nombre.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchCategory = categorySelected === null || Number(product.IdRubro) === categorySelected;
      return matchSearch && matchCategory;
    });
  }, [allProducts, debouncedSearch, categorySelected]); // Dependencias

  return (
    <>
      <Header cart={cart} removeProductInCart={removeProductInCart} />
      <main className="flex flex-col gap-y-4 p-4 w-full md:max-w-6xl md:mx-auto">
        <h1 className="text-center text-lg font-semibold">Catálogo de productos</h1>
        <SearchProducts searchValue={searchValue} searchOnChange={searchOnChange} />
        <FilterCategories categorySelected={categorySelected} handleCategorySelected={handleCategorySelected} />
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <svg fill="#dc2626" width={50} height={50} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path></svg>
          </div>
        ) : error ? (
          <p>Error al cargar productos: {(error as Error).message}</p>
        ) : (
          <>
            <ProductsContainer
              products={filteredProducts}
              addProductCart={addProductCart}
            />
          </>
        )}
      </main>
      <Toaster position="bottom-center" duration={1500} />
    </>
  );
}

export default App;

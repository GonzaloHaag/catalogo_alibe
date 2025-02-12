import { Header, ProductsContainer, SearchProducts } from "./components"

function App() {

  const API_URL = "https://rest.contabilium.com/api/conceptos/search?pageSize=0";
  
  return (
    <>
      <Header />
      <main className="flex flex-col gap-y-4 p-4">
        <h1 className="text-center text-lg font-semibold">Catálogo de productos</h1>
        <SearchProducts />
        <ProductsContainer />
      </main>
    </>
  )
}

export default App

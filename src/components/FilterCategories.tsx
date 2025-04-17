import { getToken } from "@/lib/fetch-token";
import { useQuery } from "@tanstack/react-query"
import { Button } from "./ui/button";

interface Props { 
  categorySelected: number | null;
  handleCategorySelected(categoryId: number | null):void;
}

export const FilterCategories = ({ categorySelected, handleCategorySelected } : Props ) => {

    const fetchCategories = async () => {
        const token = await getToken();
        if (!token) return;
        try {
          const response = await fetch('https://rest.contabilium.com/api/conceptos/rubros', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          if (!response.ok) throw new Error("Error al obtener las categorias");
          const data: { Id:number, Nombre:string }[] = await response.json();
          return data;
        }
        catch (e) {
          console.error(e);
        }
      };
    const { data:categories, isLoading, error } = useQuery({
        queryKey:['categories'],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 60 * 24 // 24 hours
    });

  return (
    <div className="w-full">
{
          isLoading ? (
            <div className="flex items-center justify-center">
                <span className="text-sm text-gray-400">Cargando categorías...</span>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center text-center">
              <h4 className="text-red-600 text-center text-base">Ocurrió un error</h4>
            </div>
          ) : (
            <div className="flex lg:flex-wrap gap-2 items-center">
              <Button variant={ categorySelected === null ? 'default' : 'outline' } title={'Todos'} size={'sm'} onClick={() => handleCategorySelected(null)}>
                TODOS
              </Button>
              {
              categories?.map((category) => (
                <Button key={ category.Id } variant={ categorySelected === category.Id ? 'default' : 'outline' } title={ category.Nombre } size={'sm'} onClick={() => handleCategorySelected(category.Id)}>
                    { category.Nombre }
                </Button>
              ))
            }
            </div>
          )
        }
    </div>
  )
}

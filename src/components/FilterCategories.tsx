import { useQuery } from "@tanstack/react-query"
import { Button } from "./ui/button";
import { getAllCategories } from "@/utils/get-all-categories";

interface Props { 
  categorySelected: number | null;
  handleCategorySelected(categoryId: number | null):void;
}

export const FilterCategories = ({ categorySelected, handleCategorySelected } : Props ) => {
    const { data:categories, isLoading, error } = useQuery({
        queryKey:['categories'],
        queryFn: getAllCategories,
        staleTime: 1000 * 60 * 60 * 24 // 24 hours
    });

    console.log(categorySelected);

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
            <div className="flex lg:flex-wrap overflow-x-auto gap-2 items-center">
              <Button variant={ categorySelected === null ? 'default' : 'outline' } title={'Todos'} size={'sm'} onClick={() => handleCategorySelected(null)}>
                TODOS
              </Button>
              {
              categories?.map((category) => (
                <Button key={ category.id } variant={ categorySelected === category.id ? 'default' : 'outline' } title={ category.nombre } size={'sm'} onClick={() => handleCategorySelected(category.id)}>
                    { category.nombre }
                </Button>
              ))
            }
            </div>
          )
        }
    </div>
  )
}

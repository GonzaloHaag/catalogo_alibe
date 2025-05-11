import { supabase } from "@/supabase/supabase-client"

export const getAllCategories = async() => {
    try {
        const { data, error } = await supabase.from('categories').select('*');
        if(error) {
            console.error('Error al obtener las categorias')
        }

        return data;
    } catch (error) {
        console.error(error);
    }
}
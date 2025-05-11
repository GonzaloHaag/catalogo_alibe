import { supabase } from "@/supabase/supabase-client";


export const getAllProducts = async ({ search, categorySelected } : { search:string,categorySelected:number | null }) => {
    try {
        let query = supabase.from('products').select('*').order('nombre',{ ascending:true });
        if( search !== '' ) {
            query = query.ilike('nombre',`%${search}%`)
        }
        if(categorySelected) {
            query = query.eq('idRubro',categorySelected);
        }
        const { data, error } = await query;
        if(error) {
            console.error('Error al obtener los productos')
        }

        return data;
    } catch (error) {
        console.error(error);
    }
};

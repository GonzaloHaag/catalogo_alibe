const axios = require('axios');
const { getToken } = require('./tokenManager'); // Importamos la función para obtener el token

const API_URL = 'https://rest.contabilium.com/api/conceptos/search';
const PAGE_SIZE = 50;
const supabase = require('./supabaseClient.js'); // Importar el cliente de Supabase

async function fetchAllProducts() {
  let page = 1;
  let hasMore = true;
  let allProducts = [];

  try {
    const token = await getToken(); // Obtenemos el token antes de hacer la petición
    if (!token) {
      console.error('No se pudo obtener el token de la API');
      return [];
    }

    while (hasMore) {
      const { data } = await axios.get(`${API_URL}?pageSize=${PAGE_SIZE}&page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data && data.Items && data.Items.length > 0) {
        // Guardamos los productos en la base de datos utilizando Supabase
        const { error } = await supabase
          .from('products') // Nombre de la tabla en Supabase
          .upsert( // Usa 'upsert' para evitar duplicados
            data.Items.map(item => ({
              id: item.Id,
              nombre: item.Nombre,
              Descripcion: item.Descripcion,
              precio: item.Precio,
              precio_final: item.PrecioFinal,
              stock: item.Stock,
              iva: item.Iva,
              estado: item.Estado,
              foto: item.Foto,
              idRubro: item.IdRubro
            }))
          );

        if (error) {
          console.error('Error al guardar productos en Supabase:', error.message);
        }

        allProducts = allProducts.concat(data.Items); // Acumulamos todos los productos
        page++; // Vamos a la siguiente página
      } else {
        hasMore = false; // Si no hay más productos, terminamos el ciclo
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return allProducts;
}

async function fetchAllCategories() {
  try {
    const token = await getToken(); // Obtenemos el token antes de hacer la petición
    if (!token) {
      console.error('No se pudo obtener el token de la API');
      return [];
    }

    const { data } = await axios.get('https://rest.contabilium.com/api/conceptos/rubros', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { error } = await supabase
      .from('categories')
      .upsert(data.map((categorie) => ({
        id: categorie.Id,
        nombre: categorie.Nombre
      })));

    if (error) {
      console.error('Error al guardar categorias en supabase', error)
    }
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

module.exports = { fetchAllProducts, fetchAllCategories };

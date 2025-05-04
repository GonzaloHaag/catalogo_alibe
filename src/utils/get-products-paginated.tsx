import { Data } from "@/interfaces/data-interface";
import { getToken } from "@/lib/fetch-token";

export const getAllProducts = async () => {
  const token = await getToken();
  if (!token) throw new Error("No se pudo obtener el token");

  const pageSize = 40;
  let page = 1;
  let allItems: Data["Items"] = [];
  let totalItems = 0;

  while (true) {
    const res = await fetch(`https://rest.contabilium.com/api/conceptos/search?pageSize=${pageSize}&page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!res.ok) throw new Error(`Error al obtener productos en página ${page}`);

    const data: Data = await res.json();
    allItems = [...allItems, ...data.Items];

    totalItems = data.TotalItems;
    if (allItems.length >= totalItems) break;

    page++;
  }

  return allItems;
};

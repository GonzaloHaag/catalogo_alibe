const cron = require('node-cron');
const { fetchAllProducts,fetchAllCategories } = require('./contabilium');

// Ejecutar cada 2 horas
cron.schedule('0 */2 * * *', async () => {
  console.log('🕒 Ejecutando sincronización con Contabilium...');
  try {
    const productos = await fetchAllProducts();
    const categories = await fetchAllCategories();
    console.log(`✅ Se sincronizaron ${productos.length} productos.`);
    console.log(`✅ Se sincronizaron ${categories.length} categorias.`);
  } catch (err) {
    console.error('❌ Error en la sincronización:', err);
  }
});
console.log('⏳ Servicio de sincronización iniciado y esperando el próximo cron...');
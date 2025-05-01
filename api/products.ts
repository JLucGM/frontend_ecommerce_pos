export const fetchProductsByStore = async (slug: string) => {
    if (!slug) throw new Error("El slug de la tienda no está definido");
  
    const response = await fetch(`https://pos.test/api/stores/${slug}/products`);
    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.statusText}`);
    }
  
    const data = await response.json();
    // console.log(data); // Muestra los productos en la consola
    return data; // Devuelve los productos
  };
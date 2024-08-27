// Filtrado
const input = document.getElementById("searchInput");

// Cards de los productos
const cards = document.getElementsByClassName("card");
const productList = document.getElementById("productList");

const productos = [
    {
      "nombre": "Coca Cola",
      "precio": "240$",
      "descripcion": "Botella de coca cola de 3 litros, ideal para compartir en familia",
      "imagen": "/WebProductos/ImagenesProductos/CocaColaBotella.jpg",
      "alt": "Botella de Coca Cola",
      "categoria": "Bebidas"
    },
    {
      "nombre": "Churrascos",
      "precio": "800$",
      "descripcion": "120g 3 Unidades de churrascos, ideal para los asados en familia",
      "imagen": "/WebProductos/ImagenesProductos/Churrascos.jpg",
      "alt": "120g, 3 unidades de churrascos en bolsa",
      "categoria": "Carnes"
    },
    {
      "nombre": "Dulce De Leche",
      "precio": "1200$",
      "descripcion": "Dulce de leche La Serenisima importado Argentino",
      "imagen": "/WebProductos/ImagenesProductos/DulceDeLeche.jpg",
      "alt": "Dulce de leche La Serenisima importado Argentino",
      "categoria": "Dulces"
    },
    {
      "nombre": "Manzanas Rojas",
      "precio": "89$ Kilo",
      "descripcion": "Manzanas Rojas de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/ManzanasRojas.jpg",
      "alt": "Manzanas Rojas",
      "categoria": "Frutas"
    },
    {
      "nombre": "Peras",
      "precio": "100$ Kilo",
      "descripcion": "Peras de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/Peras.jpg",
      "alt": "Peras",
      "categoria": "Frutas"
    },
    {
      "nombre": "Sandias",
      "precio": "200$ C/U",
      "descripcion": "Sandias enteras de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/Sandias.jpg",
      "alt": "Sandias",
      "categoria": "Frutas"
    },
    {
        "nombre": "Agua Mineral",
        "precio": "150$",
        "descripcion": "Botella de agua mineral de 2 litros, sin gas",
        "imagen": "/WebProductos/ImagenesProductos/agua.jpg",
        "alt": "Botella de agua mineral",
        "categoria": "Bebidas"
      }
  ];

  const showProducts = productos.forEach((e) => {
    let card = "";
     card += `<div class="card" >
                    <div class="car-image">
                        <figure class="image is-4by3">
                            <img 
                            src="${e.imagen}"
                            alt=${e.alt}
                            draggable="false"                           
                            >
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-5 titulo_producto">${e.nombre}</p>
                        <p class="subtitle">${e.precio}</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            ${e.descripcion}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            ${e.categoria}
                        </div>
                    </div>
                </div> `
                productList.innerHTML += card;
            }
            
        );

        document.addEventListener("DOMContentLoaded", () => {
            showProducts
        });


    //cards es una HTML collection, un tipo de "array" que no es "real"(no tiene los metodos tipicos de arrays), que esta cargado en el html
    //Con el metodo Array.from() convertimos ese "array" en un array real, para asi ir iterando sobre el

    const filtrarProductos = () => {
        const valorInput = input.value.toLowerCase();

        //Primero filtramos los productos que coinciden con el valor del input
        
        const productosFiltrados = productos.filter((e) => {
            const tituloProducto = e.nombre.toLowerCase();
            return tituloProducto.includes(valorInput);
        });
        let card = "";
        if(productosFiltrados.length > 0) {
            productosFiltrados.forEach((e) => {
                card += `<div class="card" >
                    <div class="car-image">
                        <figure class="image is-4by3">
                            <img 
                            src="${e.imagen}"
                            alt=${e.alt}
                            draggable="false"                           
                            >
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-5 titulo_producto">${e.nombre}</p>
                        <p class="subtitle">${e.precio}</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            ${e.descripcion}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            ${e.categoria}
                        </div>
                    </div>
                </div> `
            
        });
        } else {
            card = `<p> No se han encontrado productos </p> `
        }
        productList.innerHTML = card;
    };

input.addEventListener("input", filtrarProductos)



/* <div class="card" >
                        <div class="car-image">
                            <figure class="image is-4by3">
                                <img 
                                src="/WebProductos/ImagenesProductos/CocaColaBotella.jpg" 
                                alt="Botella de Coca Cola"    
                                draggable="false"                           
                                >
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-5 titulo_producto">Coca Cola</p>
                            <p class="subtitle">240$</p>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                Botella de coca cola de 3 litros, ideal para compartir en familia
                            </div>
                        </div>
                    </div> 
                    
                    */
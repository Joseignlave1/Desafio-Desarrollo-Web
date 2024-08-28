// Filtrado
const input = document.getElementById("searchInput");

// Cards de los productos
const cards = document.getElementsByClassName("card");
const productList = document.getElementById("productList");

const productos = [
    {
      "nombre": "Coca Cola",
      "precio": 240,
      "descripcion": "Botella de coca cola de 3 litros, ideal para compartir en familia",
      "imagen": "/WebProductos/ImagenesProductos/CocaColaBotella.jpg",
      "alt": "Botella de Coca Cola",
      "categoria": "Bebidas"
    },
    {
      "nombre": "Churrascos",
      "precio": 800,
      "descripcion": "120g 3 Unidades de churrascos, ideal para los asados en familia",
      "imagen": "/WebProductos/ImagenesProductos/Churrascos.jpg",
      "alt": "120g, 3 unidades de churrascos en bolsa",
      "categoria": "Carnes"
    },
    {
      "nombre": "Dulce De Leche",
      "precio": 1200,
      "descripcion": "Dulce de leche La Serenisima importado Argentino",
      "imagen": "/WebProductos/ImagenesProductos/DulceDeLeche.jpg",
      "alt": "Dulce de leche La Serenisima importado Argentino",
      "categoria": "Dulces"
    },
    {
      "nombre": "Manzanas Rojas",
      "precio": 89,
      "descripcion": "Manzanas Rojas de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/ManzanasRojas.jpg",
      "alt": "Manzanas Rojas",
      "categoria": "Frutas"
    },
    {
      "nombre": "Peras",
      "precio": 100,
      "descripcion": "Peras de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/Peras.jpg",
      "alt": "Peras",
      "categoria": "Frutas"
    },
    {
      "nombre": "Sandias",
      "precio": 200,
      "descripcion": "Sandias enteras de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/Sandias.jpg",
      "alt": "Sandias",
      "categoria": "Frutas"
    },
    {
        "nombre": "Agua Mineral",
        "precio": 150,
        "descripcion": "Botella de agua mineral de 2 litros, sin gas",
        "imagen": "/WebProductos/ImagenesProductos/agua.jpg",
        "alt": "Botella de agua mineral",
        "categoria": "Bebidas"
      },
      {
        "nombre": "Cerveza",
        "precio": 650,
        "descripcion": "Lata de cerveza de 1 litro, ideal para compartir en familia",
        "imagen": "/WebProductos/ImagenesProductos/cerveza.jpg",
        "alt": "Lata de cerveza",
        "categoria": "Bebidas"
      },
      {
        "nombre": "Vino",
        "precio": 1300,
        "descripcion": "Botella de vino de 1 litro, ideal para compartir en familia",
        "imagen": "/WebProductos/ImagenesProductos/vino.jpg",
        "alt": "Botella de vino",
        "categoria": "Bebidas"
      },
      {
        "nombre": "Mandarinas",
        "precio": 50,
        "descripcion": "Mandarinas de excelente calidad",
        "imagen": "/WebProductos/ImagenesProductos/mandarina.jpg",
        "alt": "Mandarinas",
        "categoria": "Frutas"
      },
      {
        "nombre": "Milannesa de pollo",
        "precio": 500,
        "descripcion": "Milanesa de pollo de 1 kilo, ideal para compartir en familia",
        "imagen": "/WebProductos/ImagenesProductos/milanesa.jpg",
        "alt": "Milanesa de pollo",
        "categoria": "Carnes"
      },
      {
        "nombre": "Bananas",
        "precio": 70,
        "descripcion": "Bananas de excelente calidad",
        "imagen": "/WebProductos/ImagenesProductos/bananas.jpg",
        "alt": "Bananas",
        "categoria": "Frutas"
      },
      {
        "nombre": "Limones",
        "precio": "30$ Kilo",
        "descripcion": "Limones de excelente calidad",
        "imagen": "/WebProductos/ImagenesProductos/limones.jpg",
        "alt": "Limones",
        "categoria": "Frutas"
      }
  ];

  const showProducts = productos.forEach((e) => {
    let card = "";
    if (e.categoria != "Frutas") {
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
                        <p class="subtitle">$${e.precio}</p>
                        
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
        if (e.categoria == "Frutas") {
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
                        <p class="subtitle">$${e.precio} por kilo</p>
                        
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

input.addEventListener("input", filtrarProductos);


//Dropdown
 const dropdown_button = document.getElementById("dropdown_button");
 const dropdownMenu = document.getElementsByClassName("dropdown")[0];


 dropdown_button.addEventListener("click", () => {
    dropdownMenu.classList.toggle('is-active');
 });


 //Filtrado Default
 const buttonDefault = document.getElementById("boton_default");

 const productosFiltradosDefault = () => {
    let card = "";
        productos.forEach((f) => {
                card += `<div class="card" >
                    <div class="car-image">
                        <figure class="image is-4by3">
                            <img 
                            src="${f.imagen}"
                            alt=${f.alt}
                            draggable="false"                           
                            >
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-5 titulo_producto">${f.nombre}</p>
                        <p class="subtitle">${f.precio}</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            ${f.descripcion}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            ${f.categoria}
                        </div>
                    </div>
                </div> `
            productList.innerHTML = card;
        });
 }
 
 buttonDefault.addEventListener("click", productosFiltradosDefault);
 //Filtrado MenorPrecio

 const buttonMenorPrecio = document.getElementById("boton_menor_precio");

 const productosFiltradosMenorPrecio = () => {
    let card = "";

     const listaConPrecios = productos.map((e) => {
        return e.precio
     });

     const listaConPreciosOrdenados = listaConPrecios.sort(function(a, b) {return a - b});

     listaConPreciosOrdenados.forEach((e) => {
        productos.forEach((f) => {
            if(e == f.precio) {
                card += `<div class="card" >
                    <div class="car-image">
                        <figure class="image is-4by3">
                            <img 
                            src="${f.imagen}"
                            alt=${f.alt}
                            draggable="false"                           
                            >
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-5 titulo_producto">${f.nombre}</p>
                        <p class="subtitle">${f.precio}</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            ${f.descripcion}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            ${f.categoria}
                        </div>
                    </div>
                </div> `
            }
            productList.innerHTML = card;
        });
     });
 }

 buttonMenorPrecio.addEventListener("click", productosFiltradosMenorPrecio); 

 //Filtrado mayorPrecio

 const buttonMayorPrecio = document.getElementById("boton_mayor_precio");

 const filtradoMayorPrecio = () => {
    let card = "";

    const listaConPrecios = productos.map((e) => {
       return e.precio
    });

    const listaConPreciosOrdenados = listaConPrecios.sort(function(a, b) {return b - a});

    listaConPreciosOrdenados.forEach((e) => {
       productos.forEach((f) => {
           if(e == f.precio) {
               card += `<div class="card" >
                   <div class="car-image">
                       <figure class="image is-4by3">
                           <img 
                           src="${f.imagen}"
                           alt=${f.alt}
                           draggable="false"                           
                           >
                       </figure>
                   </div>
                   <div class="media-content">
                       <p class="title is-5 titulo_producto">${f.nombre}</p>
                       <p class="subtitle">${f.precio}</p>
                   </div>
                   <div class="card-content">
                       <div class="content">
                           ${f.descripcion}
                       </div>
                   </div>
                   <div class="card-content">
                       <div class="content">
                           ${f.categoria}
                       </div>
                   </div>
               </div> `
           }
           productList.innerHTML = card;
       });
    });
 }
 buttonMayorPrecio.addEventListener("click", filtradoMayorPrecio);
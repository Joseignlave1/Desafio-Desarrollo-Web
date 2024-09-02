import { addDragEventToCard } from "./cart.js";

// Filtrado
const input = document.getElementById("searchInput");

// Cards de los productos
const cards = document.getElementsByClassName("card");
const productList = document.getElementById("productList");

//JSON de productos
const productos = [
    {
      "id": "1",
      "nombre": "Coca Cola",
      "precio": 240,
      "descripcion": "Botella de coca cola de 3 litros, ideal para compartir en familia",
      "imagen": "/WebProductos/ImagenesProductos/CocaColaBotella.jpg",
      "alt": "Botella de Coca Cola",
      "categoria": "Bebidas"
    },
    {
      "id": "2",
      "nombre": "Churrascos",
      "precio": 800,
      "descripcion": "120g 3 Unidades de churrascos, ideal para los asados en familia",
      "imagen": "/WebProductos/ImagenesProductos/Churrascos.jpg",
      "alt": "120g, 3 unidades de churrascos en bolsa",
      "categoria": "Carnes"
    },
    {
      "id": "3",
      "nombre": "Dulce De Leche",
      "precio": 1200,
      "descripcion": "Dulce de leche La Serenisima importado Argentino",
      "imagen": "/WebProductos/ImagenesProductos/DulceDeLeche.jpg",
      "alt": "Dulce de leche La Serenisima importado Argentino",
      "categoria": "Dulces"
    },
    {
      "id": "4",
      "nombre": "Manzanas Rojas",
      "precio": 89,
      "descripcion": "Manzanas Rojas de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/ManzanasRojas.jpg",
      "alt": "Manzanas Rojas",
      "categoria": "Frutas"
    },
    {
      "id": "5",
      "nombre": "Peras",
      "precio": 100,
      "descripcion": "Peras de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/Peras.jpg",
      "alt": "Peras",
      "categoria": "Frutas"
    },
    {
      "id": "6",
      "nombre": "Sandias",
      "precio": 200,
      "descripcion": "Sandias enteras de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/Sandias.jpg",
      "alt": "Sandias",
      "categoria": "Frutas"
    },
    {
        "id": "7",
        "nombre": "Agua Mineral",
        "precio": 150,
        "descripcion": "Botella de agua mineral de 2 litros, sin gas",
        "imagen": "/WebProductos/ImagenesProductos/agua.jpg",
        "alt": "Botella de agua mineral",
        "categoria": "Bebidas"
      },
      {
        "id": "8",
        "nombre": "Cerveza",
        "precio": 650,
        "descripcion": "Lata de cerveza de 1 litro, ideal para compartir en familia",
        "imagen": "/WebProductos/ImagenesProductos/cerveza.jpg",
        "alt": "Lata de cerveza",
        "categoria": "Bebidas"
      },
      {
        "id": "9",
        "nombre": "Vino",
        "precio": 1300,
        "descripcion": "Botella de vino de 1 litro, ideal para compartir en familia",
        "imagen": "/WebProductos/ImagenesProductos/vino.jpg",
        "alt": "Botella de vino",
        "categoria": "Bebidas"
      },
      {
        "id": "10",
        "nombre": "Mandarinas",
        "precio": 50,
        "descripcion": "Mandarinas de excelente calidad",
        "imagen": "/WebProductos/ImagenesProductos/mandarina.jpg",
        "alt": "Mandarinas",
        "categoria": "Frutas"
      },
      {
        "id": "11",
        "nombre": "Milannesa de pollo",
        "precio": 500,
        "descripcion": "Milanesa de pollo de 1 kilo, ideal para compartir en familia",
        "imagen": "/WebProductos/ImagenesProductos/milanesa.jpg",
        "alt": "Milanesa de pollo",
        "categoria": "Carnes"
      },
      {
        "id": "12",
        "nombre": "Bananas",
        "precio": 70,
        "descripcion": "Bananas de excelente calidad",
        "imagen": "/WebProductos/ImagenesProductos/bananas.jpg",
        "alt": "Bananas",
        "categoria": "Frutas"
      },
      {
        "id": "13",
        "nombre": "Limones",
        "precio": "30$ Kilo",
        "descripcion": "Limones de excelente calidad",
        "imagen": "/WebProductos/ImagenesProductos/limones.jpg",
        "alt": "Limones",
        "categoria": "Frutas"
      }
  ];

  //Función para crear las cartas de los productos.

  const createCard = (e) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true; // Hacer la tarjeta arrastrable
    card.id = e.id;

    // Añadir contenido a la tarjeta
    card.innerHTML = `
        <div class="car-image">
            <figure class="image is-4by3">
                <img 
                src="${e.imagen}"
                alt="${e.alt}"
                draggable="false">
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
    `;

    // Agregar la tarjeta al contenedor de productos
    document.getElementById('productList').appendChild(card);

    // Agregar el evento dragstart a la tarjeta creada
    addDragEventToCard(card);
  };

const cleanProductList = () => {
    productList.innerHTML = "";
 }

  //Mostrar los productos al inicio.
  let category = [];

    const showProducts = () => { 
        productos.forEach((e) => {

            if (!category.includes(e.categoria)) {
                category.push(e.categoria);
            }

            createCard(e);

            }); 
            
            createDropdownItemsCategory(category);
    }

document.addEventListener("DOMContentLoaded", () => {
    showProducts();

});


//Filtrar productos según el input de búsqueda.

const filterProducts = () => {
    const valorInput = input.value.toLowerCase();

        //Primero filtramos los productos que coinciden con el valor del input
        
        const productosFiltrados = productos.filter((e) => {
            const tituloProducto = e.nombre.toLowerCase();
            return tituloProducto.includes(valorInput);
        });
        
        if(productosFiltrados.length > 0) {
            cleanProductList();
            productosFiltrados.forEach((e) => {
                createCard(e);
        });
        } else {
            card = `<p> No se han encontrado productos </p> `
        }
        productList.innerHTML = card;
    };

input.addEventListener("input", filterProducts);


//Dropdown de filtros.

 const dropdown_button = document.getElementById("dropdown_button");
 const dropdownMenu = document.getElementsByClassName("dropdown")[0];


 dropdown_button.addEventListener("click", () => {
    dropdownMenu.classList.toggle('is-active');
 });

 //Filtrado Default
 const buttonDefault = document.getElementById("boton_default");

 const productosFiltradosDefault = () => {
    
    cleanProductList();

    productos.forEach((f) => {
        console.log(f);
        createCard(f);
    });
 }
 
 buttonDefault.addEventListener("click", productosFiltradosDefault);
 
 //Filtrado MenorPrecio
 const buttonMenorPrecio = document.getElementById("boton_menor_precio");

 const productosFiltradosMenorPrecio = () => {

    cleanProductList();

    //Slice para no modificar el array original.
    const sortedProducts = productos.slice().sort((a, b) => a.precio - b.precio);
    
    sortedProducts.forEach((e) => {
        createCard(e);
    });
  
 }

 buttonMenorPrecio.addEventListener("click", productosFiltradosMenorPrecio); 

 //Filtrado mayorPrecio

 const buttonMayorPrecio = document.getElementById("boton_mayor_precio");

 const filtradoMayorPrecio = () => {
    cleanProductList();

    //Slice para no modificar el array original.
    const sortedProducts = productos.slice().sort((a, b) => b.precio - a.precio);

    sortedProducts.forEach((e) => {
        createCard(e);
    });
 }

 buttonMayorPrecio.addEventListener("click", filtradoMayorPrecio);

//Dropdown categorías dinámico.

const dropdown_button_category = document.getElementById("dropdown_button_category");
const dropdownMenuCategory = document.getElementsByClassName("dropdown")[1];

const createDropdownItemsCategory = (categories) => {
    const dropdownContentCat = document.getElementById('dropdown-content-category');
    dropdownContentCat.innerHTML = '';

    categories.forEach(categoria => {
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.id = `categoria_${categoria.toLowerCase()}`;	
        a.textContent = categoria;

        dropdownContentCat.appendChild(a);
    });
}

dropdown_button_category.addEventListener("click", () => {
    dropdownMenuCategory.classList.toggle('is-active');
    category.forEach(categoria => {
        createAction(`categoria_${categoria.toLowerCase()}`);
    });
});

//Función para crear la acción de los items del dropdown de categorías.
const createAction = (dropdownId) => {
    const dropdownItem = document.getElementById(dropdownId);
    
    dropdownItem.addEventListener('click', () => {
        const category = dropdownItem.textContent;
        productList.innerHTML = '';
        const filteredProducts = productos.filter(product => product.categoria === category);
        filteredProducts.forEach(product => {
            createCard(product);
        });
    });
}
// Lista estática de productos
//JSON de productos
const productos = [
  {
    "nombre": "Coca Cola",
    "precio": 240,
    "descripcion": "Botella de coca cola de 3 litros, ideal para compartir en familia",
    "imagen": "/WebProductos/ImagenesProductos/CocaColaBotella.jpg",
    "categoria": "Bebidas"
  },
  {
    "nombre": "Churrascos",
    "precio": 800,
    "descripcion": "120g 3 Unidades de churrascos, ideal para los asados en familia",
    "imagen": "/WebProductos/ImagenesProductos/Churrascos.jpg",
    "categoria": "Carnes"
  },
  {
    "nombre": "Dulce De Leche",
    "precio": 1200,
    "descripcion": "Dulce de leche La Serenisima importado Argentino",
    "imagen": "/WebProductos/ImagenesProductos/DulceDeLeche.jpg",
    "categoria": "Dulces"
  },
  {
    "nombre": "Manzanas Rojas",
    "precio": 89,
    "descripcion": "Manzanas Rojas de excelente calidad",
    "imagen": "/WebProductos/ImagenesProductos/ManzanasRojas.jpg",
    "categoria": "Frutas"
  },
  {
    "nombre": "Peras",
    "precio": 100,
    "descripcion": "Peras de excelente calidad",
    "imagen": "/WebProductos/ImagenesProductos/Peras.jpg",
    "categoria": "Frutas"
  },
  {
    "nombre": "Sandias",
    "precio": 200,
    "descripcion": "Sandias enteras de excelente calidad",
    "imagen": "/WebProductos/ImagenesProductos/Sandias.jpg",
    "categoria": "Frutas"
  },
  {
      "nombre": "Agua Mineral",
      "precio": 150,
      "descripcion": "Botella de agua mineral de 2 litros, sin gas",
      "imagen": "/WebProductos/ImagenesProductos/agua.jpg",
      "categoria": "Bebidas"
    },
    {
      "nombre": "Cerveza",
      "precio": 650,
      "descripcion": "Lata de cerveza de 1 litro, ideal para compartir en familia",
      "imagen": "/WebProductos/ImagenesProductos/cerveza.jpg",
      "categoria": "Bebidas"
    },
    {
      "nombre": "Vino",
      "precio": 1300,
      "descripcion": "Botella de vino de 1 litro, ideal para compartir en familia",
      "imagen": "/WebProductos/ImagenesProductos/vino.jpg",
      "categoria": "Bebidas"
    },
    {
      "nombre": "Mandarinas",
      "precio": 50,
      "descripcion": "Mandarinas de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/mandarina.jpg",
      "categoria": "Frutas"
    },
    {
      "nombre": "Milannesa de pollo",
      "precio": 500,
      "descripcion": "Milanesa de pollo de 1 kilo, ideal para compartir en familia",
      "imagen": "/WebProductos/ImagenesProductos/milanesa.jpg",
      "categoria": "Carnes"
    },
    {
      "nombre": "Bananas",
      "precio": 70,
      "descripcion": "Bananas de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/bananas.jpg",
      "categoria": "Frutas"
    },
    {
      "nombre": "Limones",
      "precio": 30,
      "descripcion": "Limones de excelente calidad",
      "imagen": "/WebProductos/ImagenesProductos/limones.jpg",
      "categoria": "Frutas"
    }
];

// Cargar los productos desde el local storage
const loadProductosOnLocalStorage = () => {
  const saveProducts = localStorage.getItem("products");
  return saveProducts ? JSON.parse(saveProducts) : [];
}

let dynamicProducts = loadProductosOnLocalStorage();

// Combinamos las dos listas
let products = [...productos, ...dynamicProducts];

// Guardar los productos en el LocalStorage para que no se pierdan al hacer refresh en la página
const saveProductsOnLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(dynamicProducts));
}

const create_product_button = document.getElementById("button_crear_producto");
const nombre_producto = document.getElementById("input_nombre");
const precioProducto = document.getElementById("input_precio");
const descripcion_producto = document.getElementById("descripcion_input");
const categoria = document.getElementById("input_categoria");

const dontAcceptNumbers = (event) => {
  const keyCode = event.keyCode ? event.keyCode : event.which;

  // Permitimos las teclas espacio, tab y las flechitas
  if (keyCode === 8 || keyCode === 9 || (keyCode >= 37 && keyCode <= 40)) {
    return;
  }

  // Prevenimos los números, del 0 al 9
  if (keyCode >= 48 && keyCode <= 57) {
    event.preventDefault();
  }
}

nombre_producto.addEventListener("keydown", dontAcceptNumbers);
descripcion_producto.addEventListener("keydown", dontAcceptNumbers);
categoria.addEventListener("keydown", dontAcceptNumbers);

const crearURLDinamica = (file, callback) => {
  let fr = new FileReader();
  fr.readAsDataURL(file);
  fr.addEventListener("load", () => {
    callback(fr.result);
  });
}

let category = [];

// Crear producto al darle click al botón guardar
const createProduct = () => {
  crearURLDinamica(fileInput.files[0], (urlImagen) => {
    const nuevoProducto = {
      "nombre": nombre_producto.value,
      "precio": parseInt(precioProducto.value),
      "descripcion": descripcion_producto.value,
      "imagen": urlImagen,
      "categoria": categoria.value
    };
    
    // Añadir a productos dinámicos y guardar en el localStorage
    dynamicProducts.push(nuevoProducto);
    saveProductsOnLocalStorage();

    // Añadir a la lista completa de productos
    products.push(nuevoProducto);
    createCard(nuevoProducto);

    if (!category.includes(nuevoProducto.categoria)) {
      category.push(nuevoProducto.categoria);
      createDropdownItemsCategory(category);
    }

    document.getElementById("form_crear_productos").reset();
    document.getElementById("img-result").style.display = "none";
    document.getElementById("result-image").classList.remove("image-uploaded");
  });
}

create_product_button.addEventListener("click", createProduct);

// Imagen crear producto (upload dando click y drag and drop)
const fileInput = document.getElementById("image");
const dropZone = document.getElementById("result-image");
const img = document.getElementById("img-result");

dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("form-file__result--active");
});

dropZone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropZone.classList.remove("form-file__result--active");
});

const uploadImage = (file) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.addEventListener("load", (e) => {
    img.setAttribute("src", e.target.result);
  });
}

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  const file = fileInput.files[0];
  uploadImage(file);
  dropZone.classList.add("image-uploaded");
});

fileInput.addEventListener("change", (e) => {
  const file = fileInput.files[0];
  uploadImage(file);
  dropZone.classList.add("image-uploaded");
});

// Función para limpiar el array de productos y el array de categorías del Local Storage
const cleanProductsAndCategoryArray = () => {
  dynamicProducts = [];
  saveProductsOnLocalStorage();
  cleanProductList();

  products = [...staticProducts]; // Reinicia la lista a los productos estáticos
  products.forEach(createCard); // Vuelve a mostrar los productos estáticos

  category = [];
  createDropdownItemsCategory(category);
};

// Modal
const openModalButton = document.getElementById("open_Modal_Button");
const closeModalButton = document.getElementById("close_Modal_Button");
const cancelModalButton = document.getElementById("cancel_Modal_Button");
const productModal = document.getElementById("product_Modal");

openModalButton.addEventListener("click", () => {
  productModal.classList.add("is-active")
});

cancelModalButton.addEventListener("click", () => {
  productModal.classList.remove("is-active");
});
create_product_button.addEventListener("click", () => {
  productModal.classList.remove("is-active");
});

// Cards de los productos
const productList = document.getElementById("productList");

const cleanProductList = () => {
  productList.innerHTML = "";
}

const noProductosMessage = () => {
  productList.innerHTML = "No se encontraron productos";
}

// Función para crear las cartas de los productos.
const createCard = (e) => {
  let card = "";
  
 card += `<div class="card product-card"" >
                 <div class="car-image">
                     <figure class="image is-4by3">
                         <img 
                         src="${e.imagen}"
                         alt=""
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
};

document.addEventListener("DOMContentLoaded", () => {
  products.forEach((e) => {
    if (!category.includes(e.categoria)) {
      category.push(e.categoria);
    }
    createCard(e);
  });

  createDropdownItemsCategory(category);
});

// Filtrar productos según el input de búsqueda.
const input = document.getElementById("searchInput");

const filterProducts = () => {
  const valorInput = input.value.toLowerCase();

  // Primero filtramos los productos que coinciden con el valor del input
  const productosFiltrados = products.filter((e) => {
    const tituloProducto = e.nombre.toLowerCase();
    return tituloProducto.includes(valorInput);
  });

  if (productosFiltrados.length > 0) {
    cleanProductList();
    productosFiltrados.forEach((e) => {
      createCard(e);
    });
  } else {
    noProductosMessage();
  }
};

input.addEventListener("input", filterProducts);

// Dropdown de filtros.
const dropdown_button = document.getElementById("dropdown_button");
const dropdownMenu = document.getElementsByClassName("dropdown")[0];

dropdown_button.addEventListener("click", () => {
  dropdownMenu.classList.toggle('is-active');
});

// Filtrado Default
const buttonDefault = document.getElementById("boton_default");

const productosFiltradosDefault = () => {
  cleanProductList();

  products.forEach((f) => {
    createCard(f);
  });
}

buttonDefault.addEventListener("click", productosFiltradosDefault);

// Filtrado MenorPrecio
const buttonMenorPrecio = document.getElementById("boton_menor_precio");

const productosFiltradosMenorPrecio = () => {
  cleanProductList();

  // Slice para no modificar el array original.
  const sortedProducts = products.slice().sort((a, b) => a.precio - b.precio);

  sortedProducts.forEach((e) => {
    createCard(e);
  });
}

buttonMenorPrecio.addEventListener("click", productosFiltradosMenorPrecio);

// Filtrado mayorPrecio
const buttonMayorPrecio = document.getElementById("boton_mayor_precio");

const filtradoMayorPrecio = () => {
  cleanProductList();

  // Slice para no modificar el array original.
  const sortedProducts = products.slice().sort((a, b) => b.precio - a.precio);

  sortedProducts.forEach((e) => {
    createCard(e);
  });
}

buttonMayorPrecio.addEventListener("click", filtradoMayorPrecio);

// Dropdown categorías dinámico.
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

// Función para crear la acción de los items del dropdown de categorías.
const createAction = (dropdownId) => {
  const dropdownItem = document.getElementById(dropdownId);

  dropdownItem.addEventListener('click', () => {
    const category = dropdownItem.textContent;
    productList.innerHTML = '';
    const filteredProducts = products.filter((product) => product.categoria === category);
    filteredProducts.forEach((product) => {
      createCard(product);
    });
  });
}

//Modal de productos
document.addEventListener('DOMContentLoaded', () => {
  const productModal = document.getElementById('productModal'); 
  const modalCloseButtons = document.querySelectorAll('.modal .delete, #modal-close-button');

  // Función para abrir el modal y mostrar la información del producto
  const openModal = (product) => {
    document.getElementById('modal-product-name').textContent = product.nombre;
    document.getElementById('modal-product-description').textContent = product.descripcion;
    document.getElementById('modal-product-price').textContent = `$${product.precio}`;
    document.getElementById('modal-product-image').src = product.imagen;

    // Mostrar el modal
    productModal.classList.add('is-active');
  };

  // Función para cerrar el modal
  const closeModal = () => {
    productModal.classList.remove('is-active');
  };

  // Agregar evento a los botones de cierre del modal
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  // Capturar el clic en las tarjetas de productos
  const productList = document.getElementById('productList');

  productList.addEventListener('click', (event) => {
    const card = event.target.closest('.product-card'); 
    if (card) {   
       const product = {
        nombre: card.querySelector('.titulo_producto').textContent, 
        descripcion: card.querySelector('.content').textContent, 
        precio: card.querySelector('.subtitle').textContent.replace('$', ''), 
        imagen: card.querySelector('img').src,
      };
      openModal(product);
    }
  });
});


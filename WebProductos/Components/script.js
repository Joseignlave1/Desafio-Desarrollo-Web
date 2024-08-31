// Filtrado
const input = document.getElementById("searchInput");

// Cards de los productos
const cards = document.getElementsByClassName("card");
const productList = document.getElementById("productList");

const cleanProductList = () => {
    productList.innerHTML = "";
 }

 const noProductosMessage = () => {
  productList.innerHTML = "No se encontraron productos";
 }


  //Cargar los productos desde el local storage
  const loadProductosOnLocalStorage = () => {
    const saveProducts = localStorage.getItem("products");
    return saveProducts ? JSON.parse(saveProducts) : [];
  }

  //Lista de productos cargados dinamicamente en el localStorage
  let products = loadProductosOnLocalStorage();
  
   //Guardar los productos en el LocalStorage para que no se pierdan al hacer refresh en la pagina
   const saveProductsOnLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(products));
  }

    //Crear producto al darle click al boton guardar

const button_crear_producto = document.getElementById("button_crear_producto");
const nombre_producto = document.getElementById("input_nombre");
const precioProducto = document.getElementById("input_precio");
const descripcion_producto = document.getElementById("descripcion_input");
const categoria = document.getElementById("input_categoria");

const crearURLDinamica = (file, callback) => {
  let fr  = new FileReader();
  fr.readAsDataURL(file);
  fr.addEventListener("load", () => {
    callback(fr.result);
  });
}
const crearProducto = () => {
  crearURLDinamica(fileInput.files[0], (urlImagen) => {
    const nuevoProducto = {
      "nombre": nombre_producto.value,
      "precio": parseInt(precioProducto.value),
      "descripcion": descripcion_producto.value,
      "imagen": urlImagen,
      "categoria": categoria.value
    };
    products.push(nuevoProducto);
    saveProductsOnLocalStorage();
    createCard(nuevoProducto);

    if (!category.includes(nuevoProducto.categoria)) {
      category.push(nuevoProducto.categoria);
      createDropdownItemsCategory(category);
  }
  })
}

const limpiarProductos = () => {
  products = []; 
  saveProductsOnLocalStorage();
  cleanProductList(); 

  category = [];
  createDropdownItemsCategory(category); 
};

button_crear_producto.addEventListener("click", crearProducto);

//Modal
const openModalButton = document.getElementById("open_Modal_Button");
const closeModalButton = document.getElementById("close_Modal_Button");
const cancelModalButton = document.getElementById("cancel_Modal_Button");
const productModal = document.getElementById("product_Modal");
const saveModal = document.getElementById("button_crear_producto");
openModalButton.addEventListener("click", () => {
  productModal.classList.add("is-active")

});

cancelModalButton.addEventListener("click", () => {
  productModal.classList.remove("is-active");
});
saveModal.addEventListener("click", () => {
  productModal.classList.remove("is-active");
})

let category = [];


//Función para crear las cartas de los productos.

const createCard = (e) => {
 let card = "";

 card += `<div class="card" >
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


  //Imagen crear producto(upload dandole click y drag and drop)
const fileInput = document.getElementById("image");
const dropZone = document.getElementById("result-image");
const img = document.getElementById("img-result");

dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("dragover", (e) =>  {
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

dropZone.addEventListener("drop", (e) =>  {
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



//Filtrar productos según el input de búsqueda.

const filterProducts = () => {
    const valorInput = input.value.toLowerCase();

        //Primero filtramos los productos que coinciden con el valor del input
        
        const productosFiltrados = products.filter((e) => {
            const tituloProducto = e.nombre.toLowerCase();
            return tituloProducto.includes(valorInput);
        });
        
        if(productosFiltrados.length > 0) {
            cleanProductList();
            productosFiltrados.forEach((e) => {
                createCard(e);
        });
        } else {
            noProductosMessage();
        }
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

    products.forEach((f) => {
        createCard(f);
    });
 }
 
 buttonDefault.addEventListener("click", productosFiltradosDefault);

 
 //Filtrado MenorPrecio
 const buttonMenorPrecio = document.getElementById("boton_menor_precio");

 const productosFiltradosMenorPrecio = () => {

    cleanProductList();

    //Slice para no modificar el array original.
    const sortedProducts = products.slice().sort((a, b) => a.precio - b.precio);
    
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
    const sortedProducts = products.slice().sort((a, b) => b.precio - a.precio);

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
        const filteredProducts = products.filter(product => product.categoria === category);
        filteredProducts.forEach(product => {
            createCard(product);
        });
    });
}

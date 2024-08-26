// Filtrado
const input = document.getElementById("searchInput");

// Cards de los productos
const cards = document.getElementsByClassName("card");

const filtrarProductos = () => {
    const valorInput = input.value.toLowerCase();

    //cards es una HTML collection, un tipo de "array" que no es "real"(no tiene los metodos tipicos de arrays), que esta cargado en el html
    //Con el metodo Array.from() convertimos ese "array" en un array real, para asi ir iterando sobre el

    Array.from(cards).forEach(card => {
        const tituloProducto = card.getElementsByClassName("titulo_producto")[0].textContent.toLocaleLowerCase(); //Obtenemos el contenido del titulo del producto en cada iteraccion
        
        if(tituloProducto.includes(valorInput)) {
            //Mostramos la card si coincide
            card.style.display = "block";
        } else {
            //La ocultamos si no coincide
            card.style.display = "none";
        }
    });
};

input.addEventListener("input", filtrarProductos);


const pintarCarrito = () => { 
    modalContainer.innerHTML="";
         modalContainer.style.display = "flex";
         const modalHeader = document.createElement("div");
         modalHeader.className = "modal-header";
         modalHeader.innerHTML =  `
         <h1 class="modal-header-title">Carrito de compras</h1>
          `;

        modalContainer.append(modalHeader);

        const modalButton = document.createElement("h1");
        modalButton.innerText = "✖️";
        modalButton.className = "modal-header-button";

        modalButton.addEventListener("click", () =>{
             modalContainer.style.display = "none";
        });

        modalHeader.append(modalButton);


       carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
          <img src="${product.img}">
          <h3>${product.nombre}</h3>
          <p>$ ${product.precio} </p>
          <span class="restar"> - </span>
          <p>Cantidad: ${product.cantidad}</p>
          <span class="sumar"> + </span>
          <p>Total: $ ${product.cantidad * product.precio}</p>
       
        `;

        modalContainer.append(carritoContent);
        

        let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click", () => {
            if(product.cantidad !== 1){
                product.cantidad--;
            }

            saveLocal();
          pintarCarrito();

        });

        let sumar = carritoContent.querySelector(".sumar")

        sumar.addEventListener("click", () => {
         
                product.cantidad++;
            
          saveLocal();
          pintarCarrito();

        });



        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    
    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `Total a pagar : $ ${total} `; 
    modalContainer.append(totalBuying);
   
    // const totalcompra = document.createElement("button");
    // totalcompra.innerText = "Finalizar compra";
    // totalcompra.className = "comprar";
    // modalContainer.append(totalcompra);


};


verCarrito.addEventListener("click", pintarCarrito);


const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) =>  {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};


const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLenght = carrito.length;

    localStorage.setItem("carritoLenght", JSON.stringify(carritoLenght));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLenght"));
};

carritoCounter();
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = ` 
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price"> $ ${product.precio}</p>
    `;

    shopContent.append(content);
    
    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {

    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
   
   if (repeat){
    carrito.map((prod) => {
        if(prod.id === product.id){
            prod.cantidad++;
        }
    });
   } else {
    carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        });
    
        console.log(carrito);
        carritoCounter();
        saveLocal();
    }
    });  
});



const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));

};



function renderWeather(weather) {
    console.log(weather);
    var resultsContainer = document.querySelector("#weather-results");
    
    // create h2 for name
    var city = document.createElement("h2");
    city.textContent = weather.name;
    resultsContainer.append(city);


    // create p for humidity, wind, description, temp 
    var temp = document.createElement("p");
    temp.textContent = "Temperatura actual: " + weather.main.temp + " °F"; 
    resultsContainer.append(temp);


    var humidity = doc.createElement("p");
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
    resultsContainer.append(humidity);

    var wind = doc.createElement("p");
    wind.textContent = "Wind: " + weather.wind.speed + " mph, " + weather.wind.deg + "°";
    resultsContainer.append(wind);

    
    var weatherDetails = weather.weather[0]
    if (weatherDetails && weatherDetails.description) {
    
    var description = doc.createElement("p");
    description.textContent = weatherDetails.description;
    resultsContainer.append(description);
    }



    details.append("")
}

// Fetch weather for city
function fetchWeather(query) {
    var url =
        "https://api.openweathermap.org/data/2.5/weather?q=Madrid&units=imperial&appid=9e2d916f5f54324372eed481d3000951";

    fetch(url)
        .then(response => response.json())
        .then(data => renderWeather(data));
}

fetchWeather();


const cotizacionDolar = () => {
    fetch('https://api.bluelytics.com.ar/v2/latest')
        .then((response) => response.json())
        .then(informacion => {
            console.log(informacion);
            let acumulador = ``;
            for (const monedas in informacion) {
                if (monedas === "last_update") {
                    continue
                }
                acumulador += `<div class="card">
                  <h4>${monedas}</h4>
                  <h6>Precio Venta: ${informacion[monedas].value_sell}</h6>
                  <h6>Precio Compra: ${informacion[monedas].value_buy}</h6>
                  </div>`
          }
          
          document.getElementById('cotizacionDolar').innerHTML = acumulador;
       })       
}
cotizacionDolar();





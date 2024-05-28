document.addEventListener("DOMContentLoaded", function() {
    const destinos = [
        {
            continente: "América",
            paises: ["Argentina", "Brasil", "Estados Unidos", "Uruguay", "México"]
        },
        {
            continente: "Europa",
            paises: ["España", "Francia", "Italia", "Alemania", "Reino Unido"]
        }
    ];

    const opcionesTransporte = ["Avión", "Tren", "Autobús", "Coche"];

    const selectDestino = document.getElementById("destination");
    const selectTransporte = document.getElementById("transportType");

    
    destinos.forEach(destino => {
        const optgroup = document.createElement("optgroup");
        optgroup.label = destino.continente;
        destino.paises.forEach(pais => {
            const opcion = document.createElement("option");
            opcion.value = pais;
            opcion.textContent = pais;
            optgroup.appendChild(opcion);
        });
        selectDestino.appendChild(optgroup);
    });

    
    opcionesTransporte.forEach((opcion, indice) => {
        const elementoOpcion = document.createElement("option");
        elementoOpcion.value = indice + 1;
        elementoOpcion.textContent = opcion;
        selectTransporte.appendChild(elementoOpcion);
    });
});
async function obtenerUbicacion() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitud = position.coords.latitude;
                const longitud = position.coords.longitude;
                
                localStorage.setItem('ubicacion', JSON.stringify({ latitud, longitud }));
                resolve({ latitud, longitud });
            }, reject);
        } else {
            reject(new Error("La geolocalización no está disponible en este navegador."));
        }
    });
}

async function mostrarClima() {
    try {
        let ubicacion = JSON.parse(localStorage.getItem('ubicacion'));

        if (!ubicacion) {
            ubicacion = await obtenerUbicacion();
        }

        const { latitud, longitud } = ubicacion;
        const url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${latitud}&lon=${longitud}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f7bb21d554msh365902ba3387730p113f79jsn01af2bf00726',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);
        const result = await response.json();

        if (result.data && result.data.length > 0) {
            const temperaturaActual = result.data[0].temp;
            document.getElementById('temperatura').innerText = `Temperatura: ${temperaturaActual}°C`;
        } else {
            console.error("No se encontraron datos en la respuesta de la API.");
        }
    } catch (error) {
        console.error(error);
    }
}

mostrarClima();

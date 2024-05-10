document.addEventListener("DOMContentLoaded", function() {
    const destinos = [
        {
            continente: "América",
            paises: ["Argentina", "Brasil", "Estados Unidos", "Uruguay", "México"]
        },
        {
            continente: "Europa",
            paises: ["España", "Francia", "Italia", "Alemania", "Reino Unido"]
        },
        
    ];

    const selectDestino = document.getElementById("destination");

    
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

    
    const selectTransporte = document.getElementById("transportType");
    if (selectTransporte.children.length === 0) {
        const opcionesTransporte = ["Avión", "Tren", "Autobús", "Coche"];

        opcionesTransporte.forEach((opcion, indice) => {
            const elementoOpcion = document.createElement("option");
            elementoOpcion.value = indice + 1;
            elementoOpcion.textContent = opcion;
            selectTransporte.appendChild(elementoOpcion);
        });
    }

    const formularioViaje = document.getElementById("travelForm");

    formularioViaje.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const nombreUsuario = document.getElementById("name").value;
        const continente = document.getElementById("destination").selectedOptions[0].parentNode.label;
        const destino = document.getElementById("destination").value;
        const costoPorNocheUsuario = parseFloat(document.getElementById("hotelCost").value);
        const cantidadNochesUsuario = parseInt(document.getElementById("duration").value);
        const costoTransporteUsuario = parseFloat(document.getElementById("transportCost").value);
        const costoComidasUsuario = parseFloat(document.getElementById("comidasCost").value);
        const costoExcursionesUsuario = parseFloat(document.getElementById("excursionCost").value);
        const transporteElegido = parseInt(document.getElementById("transportType").value);
        
        const costoTotalViaje = calcularPresupuestoTotal(costoPorNocheUsuario, cantidadNochesUsuario, costoTransporteUsuario, costoComidasUsuario, costoExcursionesUsuario, transporteElegido);

        
        const datosViaje = {
            nombreUsuario,
            continente,
            destino,
            costoTotalViaje
        };
        localStorage.setItem("datosViaje", JSON.stringify(datosViaje));

        
        mostrarResultado(nombreUsuario, destino, continente, costoTotalViaje);
        
    });
});

function mostrarResultado(nombreUsuario, destino, continente, costoTotalViaje) {
    const resultadoContainer = document.getElementById("resultadoContainer");
    resultadoContainer.classList.remove("hidden"); 
    resultadoContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">¡Hola, ${nombreUsuario}!</h5>
                <p class="card-text">El costo total del viaje a ${destino} en ${continente} es: $${costoTotalViaje.toFixed(2)}</p>
            </div>
        </div>
    `;
    console.log("¡Hola, " + nombreUsuario + "! El costo total del viaje a " + destino + " en "+ continente +" es: $" + costoTotalViaje.toFixed(2));
}


function calcularPresupuestoTotal(costoPorNoche, cantidadNoches, costoTransporte, costoComidasDiarias, costoExcursiones, transporteElegido) {
    let costoTotal = costoPorNoche * cantidadNoches;

    switch (transporteElegido) {
        case 1: 
            costoTotal += costoTransporte * 2;
            break;
        case 2: 
        case 3: 
        case 4: 
            costoTotal += costoTransporte;
            break;
        default:
            console.log("Tipo de transporte no válido");
            return 0;
    }

    costoTotal += (costoComidasDiarias * cantidadNoches) + costoExcursiones;

    return costoTotal;
}

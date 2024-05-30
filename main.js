document.addEventListener("DOMContentLoaded", function() {
    const camposParaValidar = ["duration", "hotelCost", "transportCost", "comidasCost", "excursionCost"];
    validarNumerosPositivos(camposParaValidar);

    const formularioViaje = document.getElementById("travelForm");

    formularioViaje.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nombreUsuario = document.getElementById("name").value;
        const destinoElement = document.getElementById("destination");
        const continente = destinoElement.selectedOptions[0].parentNode.label;
        const destino = destinoElement.value;
        const costoPorNocheUsuario = parseFloat(document.getElementById("hotelCost").value);
        const cantidadNochesUsuario = parseInt(document.getElementById("duration").value);
        const costoTransporteUsuario = parseFloat(document.getElementById("transportCost").value);
        const costoComidasUsuario = parseFloat(document.getElementById("comidasCost").value);
        const costoExcursionesUsuario = parseFloat(document.getElementById("excursionCost").value);
        const transporteElegido = parseInt(document.getElementById("transportType").value);
        const monedaSeleccionada = document.getElementById("divisa").value;

        if (
            isNaN(costoPorNocheUsuario) || isNaN(cantidadNochesUsuario) || 
            isNaN(costoTransporteUsuario) || isNaN(costoComidasUsuario) || 
            isNaN(costoExcursionesUsuario)
        ) {
            Toastify({
                text: "Por favor, completa todos los campos correctamente.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #FF0000, #FF6347)",
                },
                onClick: function(){}
            }).showToast();
            return; 
        }

        const costoTotalViaje = calcularPresupuestoTotal(
            costoPorNocheUsuario, 
            cantidadNochesUsuario, 
            costoTransporteUsuario, 
            costoComidasUsuario, 
            costoExcursionesUsuario, 
            transporteElegido
        );

        const datosViaje = {
            nombreUsuario,
            continente,
            destino,
            costoTotalViaje
        };
        localStorage.setItem("datosViaje", JSON.stringify(datosViaje));

        mostrarResultado(nombreUsuario, destino, continente, costoTotalViaje, monedaSeleccionada);
    });
});

function validarNumerosPositivos(inputs) {
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener("input", function() {
            if (this.value < 0 || isNaN(this.value)) {
                this.value = '';
                Toastify({
                    text: "Por favor, ingresa un número valido.",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "left",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right,#2E86C1 , #117A65)",
                    },
                    onClick: function(){} 
                }).showToast();
            }
        });
    });
}

function calcularPresupuestoTotal(costoPorNoche, cantidadNoches, costoTransporte, costoComidasDiarias, costoExcursionesDiarias, transporteElegido) {
    let costoAlojamiento = costoPorNoche * cantidadNoches;
    localStorage.setItem("costoAlojamiento", costoAlojamiento);

    let costoTotal = costoAlojamiento;

    switch (transporteElegido) {
        case 1:
            costoTotal += costoTransporte * 2;
            localStorage.setItem("costoTransporte", costoTransporte * 2);
            break;
        case 2:
        case 3:
        case 4:
            costoTotal += costoTransporte;
            localStorage.setItem("costoTransporte", costoTransporte);
            break;
        default:
            console.log("Tipo de transporte no válido");
            return 0;
    }

    let costoComidas = costoComidasDiarias * cantidadNoches;
    localStorage.setItem("costoComidas", costoComidas);
    costoTotal += costoComidas;

    let costoExcursiones = costoExcursionesDiarias * cantidadNoches;
    localStorage.setItem("costoExcursiones", costoExcursiones);
    costoTotal += costoExcursiones;

    localStorage.setItem("costoTotal", costoTotal);

    return costoTotal;
}

function mostrarResultado(nombreUsuario, destino, continente, costoTotalViaje, monedaSeleccionada) {
    const resultadoContainer = document.getElementById("resultadoContainer");
    resultadoContainer.classList.remove("hidden"); 
    resultadoContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">¡Hola, ${nombreUsuario}!</h5>
                <p class="card-text">El costo total del viaje a ${destino} en ${continente} es: ${costoTotalViaje.toFixed(2)} ${monedaSeleccionada}</p>
            </div>
        </div>
    `;

    Toastify({
        text: `¡Que disfrutes tu viaje!`,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #2E86C1, #117A65)",
        },
        onClick: function(){} 
    }).showToast();
}

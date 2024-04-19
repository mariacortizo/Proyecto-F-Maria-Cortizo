function obtenerDatosUsuario() {
    const nombreUsuario = prompt("Por favor, ingrese su nombre:");
    if (!nombreUsuario || !isNaN(nombreUsuario)) {
        console.log("Por favor, ingrese un nombre válido.");
        return;
    }

    const destinoUsuario = prompt("Por favor, ingrese el destino de su viaje:");
    if (!destinoUsuario || !isNaN(destinoUsuario)) {
        console.log("Por favor, ingrese un destino válido.");
        return;
    }

    const transporteElegido = parseInt(prompt("Por favor, seleccione el número correspondiente al tipo de transporte:\n1. Avión\n2. Tren\n3. Autobús\n4. Coche"));

    if (transporteElegido < 1 || transporteElegido > 4) {
        console.log("Por favor, seleccione un número válido de la lista.");
        return;
    }

    const costoPorNocheUsuario = parseFloat(prompt("Por favor, ingrese el costo por noche de alojamiento:"));
    if (isNaN(costoPorNocheUsuario) || costoPorNocheUsuario <= 0) {
        console.log("Por favor, ingrese un costo por noche válido.");
        return;
    }

    const cantidadNochesUsuario = parseInt(prompt("Por favor, ingrese la cantidad de noches de estadía:"));
    if (isNaN(cantidadNochesUsuario) || cantidadNochesUsuario <= 0) {
        console.log("Por favor, ingrese una cantidad de noches válida.");
        return;
    }

    const costoTransporteUsuario = parseFloat(prompt("Por favor, ingrese el costo del transporte:"));
    if (isNaN(costoTransporteUsuario) || costoTransporteUsuario < 0) {
        console.log("Por favor, ingrese un costo de transporte válido.");
        return;
    }

    const costoComidasUsuario = parseFloat(prompt("Por favor, ingrese el costo diario de comidas por persona:"));
    if (isNaN(costoComidasUsuario) || costoComidasUsuario < 0) {
        console.log("Por favor, ingrese un costo de comidas válido.");
        return;
    }

    const costoExcursionesUsuario = parseFloat(prompt("Por favor, ingrese el costo de las excursiones adicionales:"));
    if (isNaN(costoExcursionesUsuario) || costoExcursionesUsuario < 0) {
        console.log("Por favor, ingrese un costo de excursiones válido.");
        return;
    }

    const costoTotalViaje = calcularPresupuesto(nombreUsuario, destinoUsuario, costoPorNocheUsuario, cantidadNochesUsuario, costoTransporteUsuario, costoComidasUsuario, costoExcursionesUsuario, transporteElegido);
    console.log(`¡Hola, ${nombreUsuario}! El costo total del viaje a ${destinoUsuario} es: $${costoTotalViaje.toFixed(2)}`);
    alert(`¡Hola, ${nombreUsuario}! El costo total del viaje a ${destinoUsuario} es: $${costoTotalViaje.toFixed(2)}`);
}

obtenerDatosUsuario();

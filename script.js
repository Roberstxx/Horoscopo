// Obtener referencias a los elementos del formulario y resultado
const form = document.getElementById('horoscopeForm');
const resultado = document.getElementById('resultado');
const diaInput = document.getElementById('dia');
const mesInput = document.getElementById('mes');

// Diccionario para convertir nombres de meses en números
const meses = {
    "enero": 1, "febrero": 2, "marzo": 3, "abril": 4,
    "mayo": 5, "junio": 6, "julio": 7, "agosto": 8,
    "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12
};

// Lista de signos del zodiaco con sus rangos de fechas
const signos = [
    { nombre: "Capricornio", inicio: { mes: 1, dia: 1 }, fin: { mes: 1, dia: 19 } },
    { nombre: "Acuario", inicio: { mes: 1, dia: 20 }, fin: { mes: 2, dia: 18 } },
    { nombre: "Piscis", inicio: { mes: 2, dia: 19 }, fin: { mes: 3, dia: 20 } },
    { nombre: "Aries", inicio: { mes: 3, dia: 21 }, fin: { mes: 4, dia: 19 } },
    { nombre: "Tauro", inicio: { mes: 4, dia: 20 }, fin: { mes: 5, dia: 20 } },
    { nombre: "Géminis", inicio: { mes: 5, dia: 21 }, fin: { mes: 6, dia: 20 } },
    { nombre: "Cáncer", inicio: { mes: 6, dia: 21 }, fin: { mes: 7, dia: 22 } },
    { nombre: "Leo", inicio: { mes: 7, dia: 23 }, fin: { mes: 8, dia: 22 } },
    { nombre: "Virgo", inicio: { mes: 8, dia: 23 }, fin: { mes: 9, dia: 22 } },
    { nombre: "Libra", inicio: { mes: 9, dia: 23 }, fin: { mes: 10, dia: 22 } },
    { nombre: "Escorpio", inicio: { mes: 10, dia: 23 }, fin: { mes: 11, dia: 21 } },
    { nombre: "Sagitario", inicio: { mes: 11, dia: 22 }, fin: { mes: 12, dia: 21 } },
    { nombre: "Capricornio", inicio: { mes: 12, dia: 22 }, fin: { mes: 12, dia: 31 } }
];

// Manejar el evento "submit" del formulario
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir recarga de la página

    try {
        // Capturar y limpiar los valores ingresados
        const nombre = document.getElementById('nombre').value.trim();
        const dia = parseInt(diaInput.value.trim());
        let mes = mesInput.value.trim().toLowerCase();

        // Validar nombre (no debe estar vacío)
        if (!nombre) {
            throw new Error("Por favor, ingresa tu nombre.");
        }

        // Convertir el mes de texto a número si es necesario
        if (isNaN(mes)) {
            mes = meses[mes];
            if (!mes) {
                throw new Error("Por favor, selecciona un mes válido.");
            }
        } else {
            mes = parseInt(mes);
        }

        // Validar día y mes
        if (isNaN(dia) || isNaN(mes) || !esFechaValida(dia, mes)) {
            throw new Error("Por favor, ingresa un día y mes válidos.");
        }

        // Determinar el horóscopo
        const horoscopo = determinarHoroscopo(dia, mes);
        if (horoscopo === "Desconocido") {
            throw new Error("No se pudo determinar tu signo zodiacal. Verifica la fecha.");
        }

        // Mostrar el resultado
        mostrarResultado(`Hola, <strong>${nombre}</strong>. Naciste el <strong>${dia}/${mes}</strong> y tu horóscopo es <strong>${horoscopo}</strong>.`);

        // Enviar el formulario
        form.submit();
    } catch (error) {
        // Mostrar mensaje de error si ocurre algún problema
        mostrarError(error.message);
    }
});

// Manejar el evento "change" del campo de mes para ajustar los días permitidos
mesInput.addEventListener('change', function() {
    const mes = this.value.trim().toLowerCase();

    // Obtener el máximo de días para el mes seleccionado
    const diasMaximos = {
        enero: 31, febrero: 29, marzo: 31, abril: 30, mayo: 31,
        junio: 30, julio: 31, agosto: 31, septiembre: 30,
        octubre: 31, noviembre: 30, diciembre: 31
    };

    const maxDias = diasMaximos[mes] || 31;

    // Ajustar el valor y el atributo "max" del campo de día
    diaInput.max = maxDias;

    if (parseInt(diaInput.value) > maxDias) {
        diaInput.value = maxDias; // Ajustar el valor si supera el máximo
    }
});

// Función para determinar si una fecha es válida
function esFechaValida(dia, mes) {
    const diasMaximos = {
        1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
        7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
    };

    // Comprobar si febrero tiene 29 días (año bisiesto)
    if (mes === 2 && dia === 29) {
        return true; // En este caso, no consideramos el año exacto
    }

    // Verificar si el día es válido según el mes
    return dia >= 1 && dia <= diasMaximos[mes];
}

// Función para determinar el signo zodiacal
function determinarHoroscopo(dia, mes) {
    for (const signo of signos) {
        const inicio = signo.inicio;
        const fin = signo.fin;

        // Comprobar si la fecha está dentro del rango del signo actual
        if (
            (mes === inicio.mes && dia >= inicio.dia) || 
            (mes === fin.mes && dia <= fin.dia)
        ) {
            return signo.nombre;
        }
    }
    return "Desconocido";
}

// Función para mostrar resultados exitosos
function mostrarResultado(mensaje) {
    resultado.style.display = "block"; // Hacer visible la caja del resultado
    resultado.style.background = "#e9f7ef";
    resultado.style.borderColor = "#d4edda";
    resultado.style.color = "#155724";
    resultado.innerHTML = mensaje;
}

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    resultado.style.display = "block"; // Hacer visible la caja del resultado
    resultado.style.background = "#f8d7da";
    resultado.style.borderColor = "#f5c6cb";
    resultado.style.color = "#721c24";
    resultado.innerHTML = `<strong>Error:</strong> ${mensaje}`;
}


const form = document.getElementById('horoscopeForm');
const resultado = document.getElementById('resultado');

const meses = {
    "enero": 1, "febrero": 2, "marzo": 3, "abril": 4,
    "mayo": 5, "junio": 6, "julio": 7, "agosto": 8,
    "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12
};

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

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const dia = parseInt(document.getElementById('dia').value.trim());
    let mes = document.getElementById('mes').value.trim().toLowerCase();

    if (isNaN(mes)) {
        mes = meses[mes];
        if (!mes) {
            mostrarError("Mes inválido.");
            return;
        }
    } else {
        mes = parseInt(mes);
    }

    if (!nombre || !dia || !mes || dia < 1 || dia > 31 || mes < 1 || mes > 12) {
        mostrarError("Datos inválidos.");
        return;
    }

    const horoscopo = determinarHoroscopo(dia, mes);
    mostrarResultado(`Hola, <strong>${nombre}</strong>. Naciste el <strong>${dia}/${mes}</strong> y tu horóscopo es <strong>${horoscopo}</strong>.`);
});

function determinarHoroscopo(dia, mes) {
    for (const signo of signos) {
        const inicio = signo.inicio;
        const fin = signo.fin;

        if (
            (mes === inicio.mes && dia >= inicio.dia) || 
            (mes === fin.mes && dia <= fin.dia)
        ) {
            return signo.nombre;
        }
    }
    return "Desconocido";
}

function mostrarResultado(mensaje) {
    resultado.style.display = "block";
    resultado.style.background = "#e9f7ef";
    resultado.style.borderColor = "#d4edda";
    resultado.style.color = "#155724";
    resultado.innerHTML = mensaje;
}

function mostrarError(mensaje) {
    resultado.style.display = "block";
    resultado.style.background = "#f8d7da";
    resultado.style.borderColor = "#f5c6cb";
    resultado.style.color = "#721c24";
    resultado.innerHTML = `<strong>Error:</strong> ${mensaje}`;
}

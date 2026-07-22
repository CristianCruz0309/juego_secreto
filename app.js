let numeroSecreto = 0;
let Intentos = 0;
let numerosSorteados = [];
let numeroMaximo = 50;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function VerificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    console.log(Intentos);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${Intentos} ${(Intentos === 1) ? 'vez!' : 'veces!'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor')
        }
        Intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(numerosSorteados);
    // Si ya sorteamos todos los números
    if (numerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles!')
    } else {
        // Si el número generado está incluido en la lista
        if (numerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            numerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    

}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}!`);
    numeroSecreto = generarNumeroSecreto();
    Intentos = 1;
}

function reiniciarJuego() {
    // Limpiar caja
    limpiarCaja();
    // Indicar mensaje de intervalo de números
    // Generar el número aleatorio
    // Inicializar el número de intentos
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();

document.getElementById('intentar').addEventListener('click', VerificarIntento);
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);
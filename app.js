let numSecre=0;
let intentos=0;
let listaNumerosSorteados=[];
let numeroMaximo = 10;
// -- Declaramos una funsion que automatiza y reduce codigo para hacer cambios de texto en el HTML --
// -- Donde el parametro 'elemento' hace referencia a la etiqueta HTML y el parametro 'texto' hace referencia al texto que queremos colocar --
function asignarTextoElemento (elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    // -- para que esta funsion no traiga un dato como string lo vamos a pasar a valor numerico colocandolo dentro de parseInt --
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); 
    if (numeroDeUsuario === numSecre) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // El usuario no acerto
        if (numeroDeUsuario > numSecre) {
            asignarTextoElemento('p', 'El numero secreto es menor');
        } else {
            asignarTextoElemento('p', 'El numero secreto es mayor');
        }
        intentos++;
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
    console.log(listaNumerosSorteados);
    // si ya sorteamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles, refresca la pagina');
    } else {
        // Si el numero generado esta incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;        
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego Del Número Secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numSecre = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    // Limpiar caja
    limpiarCaja();
    // Indicar mensaje de intervalo de numeros
    // Generar el numero aleatorio
    // Reiniciar conteo de intentos
    condicionesIniciales();
    // Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// -- mandamos a llamar la funcion
condicionesIniciales();

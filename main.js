let puntosUsuario = 0
let puntosCpu = 0
let partidasGanadas = 0
let partidasPerdidas = 0

let instrucciones = document.querySelector("#instrucciones")
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario")
let contenedorPuntosCpu = document.querySelector("#puntos-cpu")
let mensaje = document.querySelector("#mensaje")
let contenedorGanaPunto = document.querySelector("#gana-punto")
let elegituArma = document.querySelector("#elegi-tu-arma")

let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario")
let contenedorEleccionCpu = document.querySelector("#eleccion-cpu")

let botonesArmas = document.querySelectorAll(".arma")
botonesArmas.forEach(boton => {
    boton.addEventListener("click" , iniciarTurno)
})

function iniciarTurno(e) {

    let eleccionCpu = Math.floor(Math.random() * 3);
    let eleccionUsuario = e.currentTarget.id;

    //piedra -> 0
    //papel -> 1
    //tijera -> 2

    if (eleccionCpu === 0) {
        eleccionCpu = "piedra✊";
    } else if (eleccionCpu === 1){
        eleccionCpu = "papel🖐";
    } else if (eleccionCpu === 2) {
        eleccionCpu = "tijera✌"
    }


    if (
       (eleccionUsuario ===  "piedra✊" && eleccionCpu === "tijera✌") || 
       (eleccionUsuario === "tijera✌" && eleccionCpu === "papel🖐") ||
       (eleccionUsuario === "papel🖐" && eleccionCpu === "piedra✊")
    ) {
        ganaUsuario()
    } else if (
        (eleccionCpu ===  "piedra✊" && eleccionUsuario === "tijera✌") || 
       (eleccionCpu === "tijera✌" && eleccionUsuario === "papel🖐") ||
       (eleccionCpu === "papel🖐" && eleccionUsuario === "piedra✊")
    ) {
        ganaCpu()
    } else {
        empate()
    }

    mensaje.classList.remove("disabled");
    contenedorEleccionUsuario.innerText = eleccionUsuario
    contenedorEleccionCpu.innerText = eleccionCpu

    if (puntosUsuario === 5 || puntosCpu === 5) {
        
        if (puntosUsuario === 5) {
            Swal.fire(
                '⭐¡Ganaste la partida!⭐',
                'Asi se hace 😎',
                'success'
              )
            //LOCAL STORAGE
            localStorage.setItem("partidasGanadas", JSON.stringify(partidasGanadas));
        }

        if (puntosCpu === 5) {
            Swal.fire(
                '🤖¡Perdiste!🤖',
                '¡Las CPU gobernaran el mundo!😥',
                'error'
              )
            //LOCAL STORAGE
            localStorage.setItem("partidasPerdidas", JSON.stringify(partidasPerdidas));
        }

        elegituArma.classList.add("disabled")
        reiniciar.classList.remove("disabled")
        reiniciar.addEventListener("click", reiniciarJuego)
    }
}

///////////LOCAL STORAGE
if(localStorage.getItem("partidasGanadas")) {
    partidasGanadas++
    partidasGanadas = JSON.parse(localStorage.getItem("partidasGanadas"));
}
if(localStorage.getItem("partidasPerdidas")) {
    partidasPerdidas++
    partidasPerdidas = JSON.parse(localStorage.getItem("partidasPerdidas"));
}
///////////




    function ganaUsuario() {
        puntosUsuario++;
        contenedorPuntosUsuario.innerText = puntosUsuario;
        contenedorGanaPunto.innerText = "¡Ganaste un punto! ⭐"
    }

    function ganaCpu() {
        puntosCpu++;
        contenedorPuntosCpu.innerText = puntosCpu
        contenedorGanaPunto.innerText = "¡Punto para CPU! 🤖"
    }

    function empate() {
        contenedorGanaPunto.innerText = "¡Empate! 🙄"
    }

    function reiniciarJuego() {
        reiniciar.classList.add("disabled")
        elegituArma.classList.remove("disabled")
        mensaje.classList.add("disabled")

        puntosUsuario = 0
        puntosCpu = 0
        
        contenedorPuntosUsuario.innerText = puntosUsuario;
        contenedorPuntosCpu.innerText = puntosCpu

        instrucciones.innerText = "¡Quien llegue a 5 puntos gana!"
    }
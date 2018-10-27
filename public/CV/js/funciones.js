function suma(a, b) {
    console.log(a + b);
}
function mostrarValor() {
    alert(campo_text.value);
}
var lugar = "r";
function moverBoton() {
    if (lugar == "r") {
        boton.className = "ui button left floated";
        lugar = "l";
    }else if (lugar == "l") {
        boton.className = "ui button right floated";
        lugar = "r";
    }
}

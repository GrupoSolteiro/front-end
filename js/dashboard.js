document.addEventListener("DOMContentLoaded", function() {
    const divOla = document.getElementById("hello");
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));;
    divOla.innerHTML = `Olá ${usuarioSalvo.nome}!`
});
// Call the dataTables jQuery plugin
$(document).ready(function() {

});


async function registrarUsuario(){
    let datos = {};
    datos.nombre=document.querySelector("#nombreHTML").value;
    datos.apellidos=document.querySelector("#apellidoHTML").value;
    datos.email=document.querySelector("#emailHTML").value;
    datos.telefono=document.querySelector("#telefonoHTML").value;
    datos.apellidos=document.querySelector("#apellidoHTML").value;
    datos.password=document.querySelector("#password1HTML").value;
    let psw1 = document.querySelector("#password1HTML").value;
    let psw2 = document.querySelector("#password2HTML").value;
    console.log(datos);
    if(psw1 != psw2) {
        alert("Las contraseñas no coinciden");
        return;
    }
    const request = await fetch('api/usuarios/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(datos)
    });
    alert("Cuenta creada con exito.");
    window.location.href='login.html';
}

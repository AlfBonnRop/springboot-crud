// Call the dataTables jQuery plugin
$(document).ready(function() {
    void cargarUsuario();
});

function cerrarSesion(){
    window.sessionStorage.removeItem("token")
    window.localStorage.clear();
}

async function actualizaNombre(){
    let datos = {};
    let a = document.querySelector('#editarNombre input').value
    if(a != ""){
        datos.nombre = a;
        const request = await fetch ('api/actualizanombre/',
            {
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Autorization' : localStorage.token
                },
                body : JSON.stringify(datos)});
        document.location.reload();
    }else{
        alert("No puedes dejar en blanco el nuevo nombre.");
    }
}

async function actualizaApellidos(){
    let datos = {};
    let a = document.querySelector('#editarNombre input').value;
    if(a != ""){
        datos.apellidos = a;
        const request = await fetch ('api/actualizaapellidos/',
            {
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Autorization' : localStorage.token
                },
                body : JSON.stringify(datos)});
        document.location.reload();
    }else{
        alert("No puedes dejar en blanco los nuevos apellidos.");
    }
}

async function actualizaTelefono(){
    let datos = {};
    let a = document.querySelector('#editarTelefono input').value;
    if(a != ""){
        datos.telefono = a;
        const request = await fetch ('api/actualizatelefono/',
            {
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Autorization' : localStorage.token
                },
                body : JSON.stringify(datos)});
        document.location.reload();
    }else{
        alert("No puedes dejar en blanco el nuevo télefono.");
    }
}

async function actualizaPassword(){
    let datos = {};
    let actual, nueva1, nueva2, b1, b2;
    actual = document.querySelector('#editarPassword #passwordActual').value;
    nueva1 = document.querySelector('#editarPassword #nuevaPassword').value;
    nueva2 = document.querySelector('#editarPassword #nuevaPassword2').value;
    b1 = actual == "" || nueva1 == "" || nueva2 == "";
    b2 = nueva1 != nueva2;
    if(! (b1 || b2)){
        datos.password = nueva1;
        datos.nombre = actual;

        const request = await fetch ('api/actualizapassword/',
            {
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Autorization' : localStorage.token
                },
                body : JSON.stringify(datos)});
        const a = await request.json();
        console.log(a);
        document.location.reload();
    }else{
        if(b1){
            alert("Ningún campo puede quedar vació.");
        }
        if(b2){
            alert("Las contraseñas nuevas no coinciden.")
        }
    }
}


async function cargarUsuario(){
    if(undefined == window.localStorage.token){
        window.location.href="login.html";
    }else{
        const request = await fetch( 'api/usuario/',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Autorization' : localStorage.token
            },});

        const us = await request;

        let tabla = '<tr> <td>'+ us.id +'</td> <td>' + us.nombre + '</td> <td>' + us.apellidos +
        '</td> <td>' + us.email + '</td> <td>' + us.telefono +  '</td> <td> **** </td></tr>'
        document.querySelector("#usrNmbre span").outerHTML = us.email;
        document.querySelector('#usuarios tbody').outerHTML = tabla;
    }


}





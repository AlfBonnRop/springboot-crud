// Call the dataTables jQuery plugin
$(document).ready(function() {
    void cargarUsuario();
    void cargarUsuarios();
    $('#usuarios').DataTable();
});

function cerrarSesion(){
        window.sessionStorage.removeItem("token")
        window.localStorage.clear();
}


async function cargarUsuario(){
    if(undefined == window.localStorage.token){
        window.location.href="login.html"
    }else{
        const request = await fetch( 'api/usuario/',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Autorization' : localStorage.token
            },});
        const us = await request.json();
        document.querySelector("#usrNmbre span").outerHTML = us.email;
    }
}
async function cargarUsuarios(){
  const request = await fetch('api/usuarios/', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Autorization' : localStorage.token
      },
    });

  const us = await request.json();
    let listadoHtm = '';
    if(us.length !== 0){
        //
    for (let u of us){
        let eliminar = '<a href="#" onclick="eliminarUsuario('+ u.id +')" class="btn btn-danger btclassNamecle btn-sm"> <i class="fas fa-trash"></iclassName>'
        let usuarioHTML = '<tr> <td>'+ u.id +'</td> <td>' + u.nombre + " " + u.apellido + '</td> <td>' + u.email +
            '</td> <td>' + u.telefono + '</td> <td>' + eliminar +  '</td> </tr>';

        listadoHtm += usuarioHTML;
    }
    }
    document.querySelector('#usuarios tbody').outerHTML = listadoHtm;
}

async function eliminarUsuario(id){
    if(confirm('¿Estas seguro de querer eliminar este usuari?')){
        const request = await fetch('api/eliminaUsuario/'+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Autorization' : localStorage.token
            },
        });
        location.reload();
    }else{
        return;
    }

}



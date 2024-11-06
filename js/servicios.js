function mostrarServicios() {
    let request = sendRequest('servicios', 'GET', '');
    let table = document.getElementById('servicios-table');
    table.innerHTML = "";
    request.onload = function () {
        let data = request.response;
        //    console.log(data) //Prueba para ver si esta trayendo los datos a la consola
        data.forEach(element => {
            table.innerHTML += `
        <tr>
        <td>${element.tipoServicio}</td>
        <td>${element.area}</td>
        <td>${element.unidadArea}</td>
        <td>${element.precio}</td>
        <td>${element.producto}</td>
        <td>${element.idServicio}</td>
        <td>${element.dirServicio}</td> 
        <td>${element.fechaServicio}</td> 
        <td>
            <button type="button" class = "btn btn-primary" onclick='window.location = "/formServicios.html?id=${element._id}"'>Editar </button>   
            <button type="button" class = "btn btn-danger" onclick='deleteServicios("${element._id}")'>Eliminar </button>   
        </td>
        </tr>`
        });
    }
    request.onerror = function () {
        table.innerHTML = `
    <tr>
    <td colspan="">Error al traer los datos</td>
    </tr>
    `
    }
}

function deleteServicios(id) {
    let request = sendRequest('servicios/' + id, 'DELETE', '')
    request.onload = function () {
        mostrarServicios();
    }
}

function guardarServicios(){
    let ser = document.getElementById('servicio-s').value
    let are = document.getElementById('area-a').value
    let uni = document.getElementById('unidad-u').value
    let pre = document.getElementById('precio-p').value
    let pro = document.getElementById('producto-p').value
    let ids = document.getElementById('idservicio-i').value
    let dirr = document.getElementById('direccion-d').value
    let fech = document.getElementById('fecha-f').value

    let data = {'tipoServicio':ser, 'area':are, 'unidadArea':uni, 'precio':pre, 'producto':pro, 'idServicio':ids, 'dirServicio':dirr,'fechaServicio':fech}
    let request = sendRequest('servicios/', 'POST', data);
    request.onload = function(){
        window.location='servicios.html'
    }
    request.onerror = function(){
        console.log("Error al guardar los datos")
    }
}

function cargarDatos(id){
    console.log('id', id)
    let request = sendRequest('servicios/'+id, 'GET', '');
    let ser = document.getElementById('servicio-s')
    let are = document.getElementById('area-a')
    let uni = document.getElementById('unidad-u')
    let pre = document.getElementById('precio-p')
    let pro = document.getElementById('producto-p')
    let ids = document.getElementById('idservicio-i')
    let dirr = document.getElementById('direccion-d')
    let fech = document.getElementById('fecha-f')

    request.onload = function(){
        let data = request.response;
        ser.value = data.tipoServicio
        are.value = data.area
        uni.value = data.unidadArea
        pre.value = data.precio
        pro.value = data.producto
        ids.value = data.idServicio
        dirr.value = data.dirServicio
        fech.value = data.fechaServicio

        console.log("pepe",data)
    }
    request.onerror = function () {
        console.log("Error al cargar datos")        
    }
}

function modificarServicios(id){
    let ser = document.getElementById('servicio-s').value
    let are = document.getElementById('area-a').value
    let uni = document.getElementById('unidad-u').value
    let pre = document.getElementById('precio-p').value
    let pro = document.getElementById('producto-p').value
    let ids = document.getElementById('idservicio-i').value
    let dirr = document.getElementById('direccion-d').value
    let fech = document.getElementById('fecha-f').value

    let data = {'tipoServicio':ser, 'area':are, 'unidadArea':uni, 'precio':pre, 'producto':pro, 'idServicio':ids, 'dirServicio':dirr,'fechaServicio':fech}
    let request = sendRequest('servicios/'+id, 'PUT', data);
    console.log(request)
    request.onload = function(){
        window.location='servicios.html'
    }
    request.onerror = function(){
        alert("Error al modificar los datos")
    }
}
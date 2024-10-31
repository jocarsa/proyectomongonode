window.onload = function(){
    fetch("http://jotauve.es:3000/colecciones")
    .then(function(response){
        return response.json()
    })
    .then(function(datos){
        console.log(datos)
        let navegacion = document.querySelector("nav")
        datos.forEach(function(dato){
            let elementonavegacion = document.createElement("p")
            elementonavegacion.textContent = dato
            navegacion.appendChild(elementonavegacion);
            elementonavegacion.onclick = function(){
                console.log("Vamos a cargar los elementos de "+this.textContent)
                fetch("http://jotauve.es:3000/coleccion/"+this.textContent)
                .then(function(response){
                    return response.json()
                })
                .then(function(datos){
                    let contenedor = document.querySelector("#contenedor")
                    contenedor.innerHTML = '';
                    datos.forEach(function(dato){
                        let documento = document.createElement("article")
                        contenedor.appendChild(documento)
                        for (const [clave, valor] of Object.entries(dato)) {
                          documento.innerHTML += "<b>"+clave+"</b>:"+valor+"<br><br>";
                        }
                    })
                })
            }
        })
    })
}
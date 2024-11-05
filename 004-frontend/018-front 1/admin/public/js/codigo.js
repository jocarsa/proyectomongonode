var coleccion = ""
window.onload = function(){
    fetch("https://jotauve.es/colecciones")
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
                coleccion = this.textContent
                console.log("Vamos a cargar los elementos de "+this.textContent)
                fetch("https://jotauve.es/coleccion/"+this.textContent)
                .then(function(response){
                    return response.json()
                })
                .then(function(datos){
                    console.log(datos)
                    let contenedor = document.querySelector("#contenedor")
                    contenedor.innerHTML = '';
                    datos.forEach(function(dato){
                        let identificador = dato._id
                        console.log(identificador)
                        let documento = document.createElement("article")
                        contenedor.appendChild(documento)
                        for (const [clave, valor] of Object.entries(dato)) {
                            let contiene = document.createElement("div")
                            let atencion = document.createElement("b")
                            atencion.textContent = clave
                            contiene.appendChild(atencion)
                            let texto = document.createElement("p")
                            texto.textContent = valor
                            contiene.appendChild(texto)
                            documento.appendChild(contiene);
                        }
                        let cerrar = document.createElement("button")
                        cerrar.textContent = "X"
                        documento.appendChild(cerrar);
                        cerrar.onclick = function(){
                            console.log("Eliminamos el elemento: "+identificador)
                            let url = "https://jotauve.es/eliminar/"+coleccion+"/"+identificador
                            console.log(url)
                            fetch(url)
                            this.parentElement.remove()
                        }
                    })
                })
            }
        })
    })
}
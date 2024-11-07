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
						cerrar.classList.add("cerrar")
                        documento.appendChild(cerrar);
                        cerrar.onclick = function(){
                            console.log("Eliminamos el elemento: "+identificador)
                            let url = "https://jotauve.es/eliminar/"+coleccion+"/"+identificador
                            console.log(url)
                            fetch(url)
                            this.parentElement.remove()
                        }
						let ver = document.createElement("button")
						ver.textContent = "V"
						ver.classList.add("ver")
						documento.appendChild(ver);
						ver.onclick = function(){
                            console.log("Vemos el elemento: "+identificador)
                             console.log(dato)
							 document.querySelector("#contienemodal").style.display = "block"
							 displayJsonTree(dato)
                        }
                    })
                })
            }
        })
    })
	document.querySelector("#modal").onclick = function(e){
		e.stopPropagation();
	}
	document.querySelector("#contienemodal").onclick = function(){
		this.style.display = "none";
	}
}

function createJsonTree(data) {
    // Crea un contenedor nuevo para este nivel del JSON
    const container = document.createElement("div");

    if (typeof data === "object" && !Array.isArray(data)) {
        container.classList.add("json-object");
        for (const key in data) {
            const item = document.createElement("div");

            const keySpan = document.createElement("span");
            keySpan.classList.add("json-key");
            keySpan.textContent = key + ": ";

            const valueSpan = document.createElement("span");
            if (typeof data[key] === "object") {
                // Llama recursivamente a createJsonTree y añade el resultado al valueSpan
                valueSpan.appendChild(createJsonTree(data[key]));
            } else {
                valueSpan.classList.add("json-value");
                valueSpan.textContent = JSON.stringify(data[key]);
            }

            item.appendChild(keySpan);
            item.appendChild(valueSpan);
            container.appendChild(item);
        }
    } else if (Array.isArray(data)) {
        container.classList.add("json-array");
        data.forEach((item, index) => {
            const arrayItem = document.createElement("div");

            const indexSpan = document.createElement("span");
            indexSpan.classList.add("json-key");
            indexSpan.textContent = index + ": ";

            const valueSpan = document.createElement("span");
            if (typeof item === "object") {
                // Llama recursivamente a createJsonTree y añade el resultado al valueSpan
                valueSpan.appendChild(createJsonTree(item));
            } else {
                valueSpan.classList.add("json-value");
                valueSpan.textContent = JSON.stringify(item);
            }

            arrayItem.appendChild(indexSpan);
            arrayItem.appendChild(valueSpan);
            container.appendChild(arrayItem);
        });
    } else {
        container.classList.add("json-value");
        container.textContent = JSON.stringify(data);
    }

    return container;
}

// Llama a esta función para mostrar el JSON en el contenedor #modal
function displayJsonTree(data) {
    const container = document.querySelector("#modal");
    container.innerHTML = ""; // Limpia el contenido anterior
    container.appendChild(createJsonTree(data)); // Agrega el árbol JSON generado
}


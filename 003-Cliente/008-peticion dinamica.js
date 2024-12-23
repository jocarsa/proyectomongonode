<!doctype html>
<html>
    <head>
        <script>
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
                            console.log(datos)
                        })
                    }
                })
            })
        </script>
        <style>
            :root{
                --primario: #6F4E37;
                --texto:#4e3927;
                --secundario1:#ffeedf;
                --secundario2:#ffdebf;
            }
            body,html{
                font-family: sans-serif;
                color:var(--secundario1);
                background:var(--primario);
                height:100%;
                padding:0px;
                margin:0px;
            }
            header,nav{
                background:var(--primario);
                color:var(--secundario1);
            }
            h1{
                padding:0px;
                margin:0px;
            }
            main{
                height:100%;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                align-items: stretch;
                align-content: stretch;
            }
            section{
                background:var(--secundario1);
                color:var(--primario);
                border-radius:20px 0px 0px 0px;
            }
            nav{
                width:20%;
                box-sizing: border-box;
                padding:20px;
            }
            nav p{
                border-bottom:1px solid var(--secundario2);
                padding-bottom:20px;
            }
            section{
                width:80%
            }
            header{
                box-sizing: border-box;
                padding:20px;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Panel de control NodeMongo</h1>
        </header>
        <main>
            <nav>
                
            </nav>
            <section>
            </section>
        </main>
    </body>
</html>
const estilos = `
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: Arial, Helvetica, sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items:center;
            flex-wrap: wrap;
            gap: 2em;
            padding: 1em;
        }

        .card {
            background-color: rgb(245, 245, 245);
            border: 1px solid gray;
            border-radius: 15px;
            overflow: hidden;
            min-width: 235px;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1em;
        }

        img {
            width: 100%;
            object-fit: cover;
        }

        .data {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: .5em;
        }

        article{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .5em;
            min-height: 452.5px;
            min-width: 400px;
            border: solid 1px black;
            padding: 1em;
        }

        input, select{
            padding: .4em;
        }

        button{
            min-width: 80px;
            padding: .4em .5em;
        }

        .tp2{
            min-width: 1273px;
            justify-content: space-between;

            #cardContainerTp2{
                display:flex;
                flex-direction: row;
                gap:1em;
                height: 305px;
            }
        }

        .tp3{
            min-width: 520px;
            min-height: 583px;
        }

        #cardContainerTp3{
            display:flex;
            flex-direction: row;
            gap:1em;
        }

        #cardContainerTp4{
            display:flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 1239px;
            min-height: 331px;
            gap:1em;
        }
    `;

const styles = document.createElement('style');
styles.textContent = estilos;
document.head.appendChild(styles);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//mode 0 = sin stats | mode 1 = con stats
function buscarPKM(nombre, idSpawn, mode){
    const respuesta = fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
   
    respuesta.then((data)=>{
        const informacion = data.json();
        informacion.then((datita)=>{  
            // Tarjeta
            let card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("id", "card");

            //img
            let img = document.createElement("img");
            img.src = datita.sprites.front_default

            //Contenedor datos
            let dataContainer = document.createElement("div");
            dataContainer.classList.add("data");

            let name = document.createElement("legend");
            name.textContent = "Nombre: " + datita.name;

            let weight = document.createElement("legend");
            weight.textContent = "Peso: " + datita.weight;

            let height = document.createElement("legend");
            height.textContent = "Altura: " + datita.height;

            card.appendChild(img);
            card.appendChild(dataContainer);
            dataContainer.appendChild(name);
            dataContainer.appendChild(weight);
            dataContainer.appendChild(height);

            if(mode == 1){
                let hp = document.createElement("legend");
                hp.textContent = "HP: " + datita.stats[0].base_stat;

                let atq = document.createElement("legend");
                atq.textContent = "Ataque: " + datita.stats[1].base_stat;

                let def = document.createElement("legend");
                def.textContent = "Defensa: " + datita.stats[2].base_stat;

                let specialAtq = document.createElement("legend");
                specialAtq.textContent = "Ataque especial: " + datita.stats[3].base_stat;

                let specialDef = document.createElement("legend");
                specialDef.textContent = "Defensa especial: " + datita.stats[4].base_stat;

                dataContainer.appendChild(hp);
                dataContainer.appendChild(atq);
                dataContainer.appendChild(def);
                dataContainer.appendChild(specialAtq);
                dataContainer.appendChild(specialDef);
            }

            document.getElementById(idSpawn).appendChild(card);
   
        });
        informacion.catch((error)=>{
            let card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("id", "card");
            card.setAttribute("style", "align-items:center; justify-content:center;");
            let errorMessage = document.createElement("legend");
            errorMessage.textContent = "Pokemon no encontrado, revise el nombre escrito.";
            card.appendChild(errorMessage);
            document.getElementById(idSpawn).appendChild(card);
        })
    })
    .catch((error)=>{
        console.error(error);
    })
}

// Para fede:
// chatgpt solo me reorganizo el codigo para devolver true o false prq no me salio, el resto lo hice yo
async function verificarTipo(idPoke, tipo, idSpawn) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPoke}`);
        const datita = await respuesta.json();

        const esDelTipo = datita.types.some(t => t.type.name === tipo);

        if (esDelTipo) {
            // Tarjeta
            let card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("id", "card");

            // img
            let img = document.createElement("img");
            img.src = datita.sprites.front_default;

            // Contenedor datos
            let dataContainer = document.createElement("div");
            dataContainer.classList.add("data");

            let name = document.createElement("legend");
            name.textContent = "Nombre: " + datita.name;

            let type = document.createElement("legend");
            type.textContent = "Tipo: " + datita.types.map(t => t.type.name).join(", ");

            let weight = document.createElement("legend");
            weight.textContent = "Peso: " + datita.weight;

            let height = document.createElement("legend");
            height.textContent = "Altura: " + datita.height;

            card.appendChild(img);
            card.appendChild(dataContainer);
            dataContainer.appendChild(name);
            dataContainer.appendChild(type);
            dataContainer.appendChild(weight);
            dataContainer.appendChild(height);

            document.getElementById(idSpawn).appendChild(card);
        }

        return esDelTipo;
    } catch (error) {
        console.error("Error al verificar el tipo del Pokémon:", error);
        return false;
    }
}



//tp 1 
document.getElementById('mostrar').addEventListener('click',()=>{
    document.getElementById('cardContainerTp1').innerHTML = '';

    const nombre = document.getElementById('nombre').value;
    buscarPKM(nombre, "cardContainerTp1", 0);
});

//tp2
document.getElementById('generarTp2').addEventListener('click',()=>{
    document.getElementById('cardContainerTp2').innerHTML = '';

    buscarPKM(getRandomInt(1, 1025), "cardContainerTp2", 0);
    buscarPKM(getRandomInt(1, 1025), "cardContainerTp2", 0);
    buscarPKM(getRandomInt(1, 1025), "cardContainerTp2", 0);
    buscarPKM(getRandomInt(1, 1025), "cardContainerTp2", 0);
    buscarPKM(getRandomInt(1, 1025), "cardContainerTp2", 0);
});

//tp 3
document.getElementById('generarTp3').addEventListener('click',()=>{
    document.getElementById('cardContainerTp3').innerHTML = '';

    const pokemon1 = document.getElementById('tp3Pkm1').value;
    const pokemon2 = document.getElementById('tp3Pkm2').value;
    buscarPKM(pokemon1, "cardContainerTp3", 1);
    buscarPKM(pokemon2, "cardContainerTp3", 1);
});

//tp 4
document.getElementById('generarTp4').addEventListener('click', async () => {
    document.getElementById('cardContainerTp4').innerHTML = '';

    const type = document.getElementById('tp4Select').value;
    const cant = document.getElementById('cantidadTp4').value;

    let count = 1;
    let encontrados = 0;

    while (encontrados < cant) { // Puse 1000 por seguridad, pero podés cambiarlo
        const resultado = await verificarTipo(count, type, "cardContainerTp4");
        if (resultado) {
            encontrados++;
        }
        count++;
    }
});
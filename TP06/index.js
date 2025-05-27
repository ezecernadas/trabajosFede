async function obtenerDatosPokemon(nombre) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!respuesta.ok) throw new Error("No se encontró el Pokémon");
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener datos del Pokémon:", error.message);
        return null;
    }
}

// Of course, you are handling two different IDs there.

//     Fetch the pokemon-species: https://pokeapi.co/api/v2/pokemon-species/ivysaur
//     look at .evolution_chain -> https://pokeapi.co/api/v2/evolution-chain/1/
//     Fetch the chain: https://pokeapi.co/api/v2/evolution-chain/1/
//     Parse the JSON and get the full list of evolutions.


async function obtenerLineaEvolutiva(idPoke) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${idPoke}`);
        if (!respuesta.ok) throw new Error("No se encontró el Pokémon");
        const datos = await respuesta.json();
        console.log(datos);
        arrayEvolution = [datos.chain.species.name];
        aux = datos.chain.evolves_to;
        //Verifico si tiene evolucion
        if(aux.length > 0){
            arrayEvolution.push(datos.chain.evolves_to[0].species.name);
            aux = datos.chain.evolves_to[0].species.name;
            //Verifico 2da evolucion
            if(aux.length > 0){
                arrayEvolution.push(datos.chain.evolves_to[0].evolves_to[0].species.name);
            }
        }
        return arrayEvolution;
    } catch (error) {
        console.error("Error al obtener datos del Pokémon:", error.message);
        return null;
    }
}

function mostrarTarjetaPokemon(datos, idSpawn) {
    const contenedor = document.getElementById(idSpawn);

    // Si hubo error
    if (!datos) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.alignItems = "center";
        card.style.justifyContent = "center";

        let errorMessage = document.createElement("legend");
        errorMessage.textContent = "Pokemon no encontrado, revise el nombre escrito.";
        card.appendChild(errorMessage);
        contenedor.appendChild(card);
        return;
    }

    // Crear tarjeta con datos válidos
    let card = document.createElement("div");
    card.classList.add("card");

    let img = document.createElement("img");
    img.src = datos.sprites.front_default;

    let dataContainer = document.createElement("div");
    dataContainer.classList.add("data");

    let name = document.createElement("legend");
    name.textContent = "Nombre: " + datos.name;

    // console.log(datita);

    card.appendChild(img);
    card.appendChild(dataContainer);
    dataContainer.appendChild(name);

    contenedor.appendChild(card);
}

async function buscarYMostrar(nombre, idSpawn) {
    const datos = await obtenerDatosPokemon(nombre);
    console.log(datos);
    mostrarTarjetaPokemon(datos, idSpawn);
}

async function buscarYMostrarLineaEvolutiva(nombre, idSpawn) {
    const datos = await obtenerDatosPokemon(nombre);
    console.log(datos);
    mostrarTarjetaPokemon(datos, idSpawn);
    console.log(datos.id);
    const datosEvolucion = await obtenerLineaEvolutiva(datos.id);
    
    console.log(datosEvolucion);
}

document.getElementById('mostrar').addEventListener('click',()=>{
    document.getElementById('cardContainerTp1').innerHTML = '';

    const nombre = document.getElementById('nombre').value;
    
    buscarYMostrarLineaEvolutiva(nombre, "cardContainerTp1");
    // obtenerDatosPokemon("pikachu").then((datos) => {
    //     console.log(datos); // También te muestra el resultado
    // });
});
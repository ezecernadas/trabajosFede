/**
 * Obtiene los datos de un Pokémon por su nombre.
 *
 * @param {string} nombre - El nombre del Pokémon.
 * @returns {Promise<Object | null>} - Promesa que resuelve con los datos del Pokémon,
 * o null si ocurre un error.
 */
async function obtenerDatosPokemon(nombre) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!respuesta.ok) throw new Error("No se encontró el Pokémon");
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error(error.message, nombre);
        return null;
    }
}

// Of course, you are handling two different IDs there.

//     Fetch the pokemon-species: https://pokeapi.co/api/v2/pokemon-species/ivysaur
//     look at .evolution_chain -> https://pokeapi.co/api/v2/evolution-chain/1/
//     Fetch the chain: https://pokeapi.co/api/v2/evolution-chain/1/
//     Parse the JSON and get the full list of evolutions.

/**
 * Obtiene la línea evolutiva de un Pokémon dado su ID.
 * Realiza una petición a la API de Pokémon para obtener la cadena evolutiva
 * del Pokémon especificado y devuelve una lista con los nombres de las especies
 * en el orden de su evolución.
 *
 * @param {number} idPoke - ID del Pokémon para obtener su línea evolutiva.
 * @returns {Promise<string[] | null>} - Promesa que resuelve con un array de nombres
 * de especies en orden de evolución, o null si ocurre un error.
 */
async function obtenerLineaEvolutiva(idPoke) {
    try {
        // Obtener datos del Pokémon
        const pokemon = await obtenerDatosPokemon(idPoke);

        // Obtener datos de la especie del Pokémon
        const pokemonSpecie = await fetch(pokemon.species.url);
        const datosSpecie = await pokemonSpecie.json();

        // Obtener datos de la cadena evolutiva
        const respuesta = await fetch(datosSpecie.evolution_chain.url);
        if (!respuesta.ok) throw new Error("No se encontró el Pokémon");
        const datos = await respuesta.json();

        // Inicializar array con la especie base
        const arrayEvolution = [datos.chain.species.name];
        let aux = datos.chain.evolves_to;

        // Verificar si hay evolución
        if (aux.length > 0) {
            arrayEvolution.push(aux[0].species.name);
            aux = aux[0].evolves_to;

            // Verificar si hay segunda evolución
            if (aux.length > 0) {
                arrayEvolution.push(aux[0].species.name);
            }
        }

        return arrayEvolution;
    } catch (error) {
        console.error("Error al obtener datos del Pokémon:", error.message);
        return null;
    }
}

/**
 * Muestra una tarjeta de un Pokémon en el contenedor especificado.
 *
 * Si los datos del Pokémon son nulos, muestra un mensaje de error.
 * De lo contrario, crea una tarjeta con la imagen del Pokémon y
 * su nombre.
 *
 * @param {Object | null} pokemonData - Datos del Pokémon a mostrar.
 * @param {string} containerId - ID del contenedor donde spawnear la tarjeta.
 */
function mostrarTarjetaPokemon(pokemonData, containerId) {
    const container = document.getElementById(containerId);

    // Si hubo error
    if (!pokemonData) {
        return;
    }

    // Crear tarjeta con datos válidos
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("card");

    // Imagen del Pokémon
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.sprites.front_default;

    // Contenedor de datos
    const dataContainer = document.createElement("div");
    dataContainer.classList.add("data");

    // Nombre del Pokémon
    const pokemonName = document.createElement("legend");
    pokemonName.textContent = "Nombre: " + pokemonData.name;

    // Añadir elementos a la tarjeta
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(dataContainer);
    dataContainer.appendChild(pokemonName);

    // Añadir tarjeta al contenedor
    container.appendChild(pokemonCard);
}

function mostrarTarjetaPokemonError(containerId) {
    const container = document.getElementById(containerId);

    // Crear tarjeta de error
    const errorCard = document.createElement("div");
    errorCard.classList.add("card");
    errorCard.style.alignItems = "center";
    errorCard.style.justifyContent = "center";

    // Mensaje de error
    const errorMessage = document.createElement("legend");
    errorMessage.textContent = "No se encontro el Pokémon, revise el nombre escrito.";
    errorCard.appendChild(errorMessage);
    container.appendChild(errorCard);
}

async function buscarYMostrar(nombre, idSpawn) {
    const datos = await obtenerDatosPokemon(nombre);
    console.log(datos);
    mostrarTarjetaPokemon(datos, idSpawn);
}

/**
 * Busca un pokemon por nombre y muestra su tarjeta y su linea de evolucion.
 * @param {string} nombre nombre del pokemon a buscar
 * @param {string} idSpawn id del div donde se va a spawnear la tarjeta
 */
async function buscarYMostrarLineaEvolutiva(nombre, idSpawn) {
    const pokemon = await obtenerDatosPokemon(nombre);

    if (!pokemon) {
        mostrarTarjetaPokemonError(idSpawn);
        return;
    }

    const evoluciones = await obtenerLineaEvolutiva(pokemon.id);

    if (!evoluciones) {
        console.error("No se encontraron evoluciones para el pokemon", nombre);
        return;
    }

    evoluciones.forEach(async nombreEvolucion => {
        const evolucion = await obtenerDatosPokemon(nombreEvolucion);
        mostrarTarjetaPokemon(evolucion, idSpawn);
    });
}

document.getElementById('mostrar').addEventListener('click',()=>{
    document.getElementById('cardContainerTp1').innerHTML = '';

    const nombre = document.getElementById('nombre').value;
    
    buscarYMostrarLineaEvolutiva(nombre, "cardContainerTp1");
    // obtenerDatosPokemon("pikachu").then((datos) => {
    //     console.log(datos); // También te muestra el resultado
    // });
});
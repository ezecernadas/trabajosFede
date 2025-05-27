/**
 * Muestra una tarjeta de un Pokémon en el contenedor especificado.
 * koulen
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
    pokemonName.textContent = pokemonData.name;

    // Añadir elementos a la tarjeta
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(dataContainer);
    dataContainer.appendChild(pokemonName);

    // Añadir tarjeta al contenedor
    container.appendChild(pokemonCard);
}

/**
 * Muestra un mensaje de error en el contenedor especificado.
 *
 * @param {string} containerId - ID del contenedor donde spawnear el mensaje de error.
 */
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

function mostrarTarjetaMisteriosa(pokemonData, containerId) {
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
    pokemonImage.setAttribute("style", "filter: brightness(0);");

    // Contenedor de datos
    const dataContainer = document.createElement("div");
    dataContainer.classList.add("data");

    // Nombre del Pokémon
    const pokemonName = document.createElement("legend");
    pokemonName.textContent = "?";

    // Añadir elementos a la tarjeta
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(dataContainer);
    dataContainer.appendChild(pokemonName);

    // Añadir tarjeta al contenedor
    container.appendChild(pokemonCard);
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

//Punto 2
async function pelea(pokemon1,pokemon2){
    const stats1 = await obtenerStats(pokemon1);
    const stats2 = await obtenerStats(pokemon2);
    const power1 = stats1.attack + stats1.defense + stats1.speed;
    const power2 = stats2.attack + stats2.defense + stats2.speed;
    if (power1 > power2) {
        return pokemon1;
    } else {
        return pokemon2;
    }
}

/**
 * Obtiene los stats de un Pokémon como un objeto asociativo.
 * @param {string} pokemon - Nombre del Pokémon cuyos stats se van a obtener.
 * @returns {Promise<Object | null>} - Promesa que resuelve con un objeto asociativo
 * con los stats del Pokémon, o null si ocurre un error.
 */
async function obtenerStats(pokemon){
    const pokemonData = await obtenerDatosPokemon(pokemon);
    const pokemonStatsAsociativo = pokemonData.stats.reduce((acumulado, stat) => ({ ...acumulado, [stat.stat.name]: stat.base_stat }), {});
    return pokemonStatsAsociativo;
}

//Punto 3
async function obtenerPokemonesPorHabilidad(habilidad) {
    const pokemones = await fetch(`https://pokeapi.co/api/v2/ability/${habilidad}`);
    if (!pokemones.ok) {
        console.error("Error al obtener los Pokémon por habilidad:", habilidad);
        return [];
    }
    const datos = await pokemones.json();
    return datos.pokemon.map(p => p.pokemon.name);
}

//Punto 5
async function obtenerPokemonesPorGeneracion(generacion, idSpawn) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/generation/${generacion}`);
        if (!respuesta.ok) {
            throw new Error("Error al obtener los Pokémon por generación");
        }
        const datos = await respuesta.json();
        const pokemones = datos.pokemon_species.map(p => p.name);

        document.getElementById(idSpawn).innerHTML = '';
        for (const nombre of pokemones) {
            const pokemon = await obtenerDatosPokemon(nombre);
            mostrarTarjetaPokemon(pokemon, idSpawn);
        }
    } catch (error) {
        console.error(error.message);
    }
}

document.getElementById('mostrar').addEventListener('click',()=>{
    document.getElementById('cardContainerPunto1').innerHTML = '';

    const nombre = document.getElementById('nombre').value;
    
    buscarYMostrarLineaEvolutiva(nombre, "cardContainerPunto1");
});

document.getElementById('ptn2Batalla').addEventListener('click',()=>{
    document.getElementById('cardContainerPunto2').innerHTML = '';

    const pokemon1 = document.getElementById('pnt2Pokemon1').value;
    const pokemon2 = document.getElementById('pnt2Pokemon2').value;
    
    pelea(pokemon1, pokemon2).then(async ganador => {
        ganador = await obtenerDatosPokemon(ganador);
        if (!ganador) {
            mostrarTarjetaPokemonError("cardContainerPunto2");
            return;
        }
        mostrarTarjetaPokemon(ganador, "cardContainerPunto2");
    });
    
    
});

document.getElementById('ptn3Buscar').addEventListener('click',()=>{
    document.getElementById('cardContainerPunto3').innerHTML = '';

    const habilidad = document.getElementById('pnt3Habilidad').value;
    
    obtenerPokemonesPorHabilidad(habilidad).then(pokemones => {
        pokemones.forEach(async nombrePokemon => {
            const pokemon = await obtenerDatosPokemon(nombrePokemon);
            if (pokemon) {
                mostrarTarjetaPokemon(pokemon, "cardContainerPunto3");
            } else {
                mostrarTarjetaPokemonError("cardContainerPunto3");
            }
        }
        );
    });
});

const numeroRandom = Math.floor(Math.random() * 1025) + 1;
let datosPokemonRandom;

obtenerDatosPokemon(numeroRandom).then(datos => {
    datosPokemonRandom = datos;
    mostrarTarjetaMisteriosa(datosPokemonRandom, "cardContainerPunto4");
});


document.getElementById('pnt4Adivinar').addEventListener('click',()=>{
    const buscado = document.getElementById('pnt4Nombre').value;
    const nombre = datosPokemonRandom.name;

    if (!buscado || !nombre) {
        mostrarTarjetaPokemonError("cardContainerPunto4");
        return;
    }

    if (buscado == nombre) {
        document.getElementById('cardContainerPunto4').innerHTML = '';
        mostrarTarjetaPokemon(datosPokemonRandom, "cardContainerPunto4");
    }
});

document.getElementById('pnt5Buscar').addEventListener('click', () => {
    const generacion = document.getElementById('generacion').value;
    if (generacion) {
        obtenerPokemonesPorGeneracion(generacion, 'cardContainerPunto5');
    }
});
const pokemones = [
    {
        nombre: 'Pikachu',
        peso: 2.0,
        tipo: 'Electrico',
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg ' 
    }, {
        nombre: 'Raichu',
        peso: 2.0,
        tipo: 'Electrico',
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/26.svg ' 
    }, {
        nombre: 'Bulbasaur',
        peso: 10.0,
        tipo: 'Planta',
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg ' 
    }, {
        nombre: 'Charmander',
        peso: 3.0,
        tipo: 'Fuego',
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg ' 
    }, {
        nombre: 'Squirtle',
        peso: 9.0,
        tipo: 'Agua',
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg ' 
    }
];

function crearCelda(valorDeCelda){
    let celda = document.createElement("td");
    celda.innerHTML = valorDeCelda;
    return celda;
}

function mostrarPokemones(conjuntoPokemons){
    conjuntoPokemons.forEach((pokemon) => {
        //creo al fila
        let fila = document.createElement("tr");

        //creo las celdas y la añado a la fila
        fila.appendChild(crearCelda(pokemon.nombre));
        
        fila.appendChild(crearCelda(pokemon.tipo));
        
        fila.appendChild(crearCelda(pokemon.peso));

        fila.appendChild(crearCelda(`<img src="${pokemon.url}">`));

        //inserto la fila con las celdas en la tabla
        let contenedor = document.getElementById("contenedor");
        contenedor.appendChild(fila);
        
    });
}

mostrarPokemones(pokemones);
async function buscarJuego(juego){
    const url = `https://games-details.p.rapidapi.com/search?sugg=${juego}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '699f7659b3msh25897f469b9ebd0p15068fjsne642b8b7e0fa',
            'x-rapidapi-host': 'games-details.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        gamesResult = result.data.search;
        gamesResult.forEach(gameData => {
            appendGameCard(gameData);
        });
        
    } catch (error) {
        console.error(error);
    }
}

function appendGameCard(gameData){
    const gameCard = document.createElement("article");
    gameCard.classList.add("gameCard");

    const image = document.createElement("img");
    image.src = gameData.image;
    gameCard.append(image);

    const id = document.createElement("legend");
    id.innerText = "ID: " + gameData.id;
    gameCard.append(id);

    const name = document.createElement("legend");
    name.innerText = "TITLE: " + gameData.name;
    gameCard.append(name);

    const price = document.createElement("legend");
    price.innerText = "PRICE: " + gameData.price;
    gameCard.append(price);

    console.log(gameData);
    document.getElementById("searchContainer").append(gameCard);
}

const formulario = document.getElementById("formBusqueda");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    document.getElementById("searchContainer").innerHTML = "";

    const datos = new FormData(formulario);

    const nombre = datos.get("gameName");
    buscarJuego(nombre);
});

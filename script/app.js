"use strict"

// API: https://pokeapi.co/api/v2/pokemon/

document.addEventListener('DOMContentLoaded', function () {
    getAPI();
});

let getAPI = () => {
    var url = "https://thppokedex.azurewebsites.net/api/v1/pokemon/";
    fetch(url).then(function (response) {
            return response.json();
        })
        .then(function (json) {
            var sorted = json.sort((a, b) => {
                return a.id - b.id;
            });
            console.log(sorted);
            createDiv(sorted);
        });
}

let createDiv = (pokelist) => {
    var divMain, btnPokemon, imgPokemon, pPokemon, url;

    // for (var i = 0; i < pokelist.length; i++) {
    for (var i = 0; i < 30; i++) {
        divMain = document.createElement('div');
        divMain.id = pokelist[i].name;
        divMain.className = 'o-layout__item o-layout__gutter u-1-of-3-bp1 u-1-of-3-bp2 u-1-of-3-bp3 c-pokemon';

        btnPokemon = document.createElement('button');
        btnPokemon.id = i //pokelist[i].name;
        btnPokemon.addEventListener('click', function () {
            showInfoPokemon(this.id);
        });
        btnPokemon.className = 'o-button-reset c-button-pokemon';

        imgPokemon = document.createElement('img');
        url = "http://static.pokemonpets.com/images/monsters-images-800-800/" + pokelist[i].id + "-" + pokelist[i].name + ".png";
        imgPokemon.src = url;
        imgPokemon.className = 'c-pokemon_img';
        imgPokemon.alt = pokelist[i].name;

        pPokemon = document.createElement('p');
        pPokemon.innerHTML = pokelist[i].name.charAt(0).toUpperCase() + pokelist[i].name.slice(1);

        btnPokemon.appendChild(imgPokemon);
        btnPokemon.appendChild(pPokemon);
        divMain.appendChild(btnPokemon);
        document.getElementById('main').appendChild(divMain);
    }
}

let showInfoPokemon = (pokemon) => {
    var div = document.getElementById('tooninfo');
    div.style.zIndex = 1;
    div.style.visibility = "visible";

    getData(pokemon);

    document.addEventListener("dblclick", function (e) {
        if (e.target.getAttribute('id') != div.getAttribute('id')) {
            div.style.zIndex = -1;
            div.style.visibility = "hidden";
        }
    });


    // document.addEventListener("keyup", function (e) {
    //     if (e.key == "Escape") {
    //         div.style.zIndex = -1;
    //         div.style.visibility = "hidden";
    //     }
    // });
}


let vulGegevensIn = (pokemon) => {
    document.getElementById("txtName").value = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById("txtId").value = pokemon.id;
    document.getElementById("txtHeight").value = pokemon.height;
    document.getElementById("txtWeight").value = pokemon.weight;
    imgPokemon = document.getElementById("imgPokemon")
    imgPokemon.src = pokemon.url;
    imgPokemon.className = 'c-pokemon_img';
    imgPokemon.alt = pokemon.name;
    console.log("Gegevens ingevuld");
}

let getData = (id) => {
    var url = "https://thppokedex.azurewebsites.net/api/v1/pokemon/";
    fetch(url).then(function (response) {
            return response.json();
        })
        .then(function (json) {
            var sorted = json.sort((a, b) => {
                return a.id - b.id;
            });
            var pokemon = sorted[id];
            vulGegevensIn(pokemon);
        });
}
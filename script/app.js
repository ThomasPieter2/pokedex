"use strict"

// API: https://pokeapi.co/api/v2/pokemon/

document.addEventListener('DOMContentLoaded', function() {
    getAPI();
});

let getAPI = () => {
    var url = "https://pokeapi.co/api/v2/pokemon/";

    fetch(url).then(function(response) {
            //console.log(response);
            return response.json();
        })
        .then(function(json) {
            console.log(json);
            var data = json.results;
            showResult(data);
        });
}

let showResult = (data) => {
    var pokelist = [];
    for (var i = 0; i < data.length; i++) {
        pokelist.push(data[i]);
    }
    console.log(pokelist);
    createDiv(pokelist);
};

let createDiv = (pokelist) => {
    var divMain, btnPokemon, newDivFull, divPokemon, imgPokemon, pPokemon, url;

    for (var i = 0; i < pokelist.length; i++) {
        divMain = document.createElement('div');
        divMain.className = 'c-pokemon-div';

        btnPokemon = document.createElement('button');
        btnPokemon.id = pokelist[i].name;
        btnPokemon.addEventListener('click', function() {
            showInfoPokemon(this.id);
        });
        btnPokemon.className = 'o-button-reset c-button-pokemon';

        newDivFull = document.createElement('div');
        newDivFull.className = 'c-pokemon';

        imgPokemon = document.createElement('img');
        url = "http://static.pokemonpets.com/images/monsters-images-800-800/" + (i + 1) + "-" + pokelist[i].name + ".png";
        imgPokemon.src = url;
        imgPokemon.className = 'c-pokemon_img';
        imgPokemon.alt = pokelist[i].name;

        pPokemon = document.createElement('p');
        pPokemon.innerHTML = pokelist[i].name.charAt(0).toUpperCase() + pokelist[i].name.slice(1);

        divPokemon = document.createElement('div');
        divPokemon.className = "c-pokemon__info";
        divPokemon.appendChild(imgPokemon);
        divPokemon.appendChild(pPokemon);

        newDivFull.appendChild(divPokemon);
        btnPokemon.appendChild(newDivFull);
        divMain.appendChild(btnPokemon);
        document.getElementById('main').appendChild(divMain);
    }
}

let showInfoPokemon = (pokelist) => {
    var div = document.getElementById('info');
    document.addEventListener('click', function(e) {
        console.log(e.target.getAttribute('id'), div.getAttribute('id'));
        console.log(pokelist);
        if ((e.target.getAttribute('id') != div.getAttribute('id')) && (e.target.getAttribute('id') != 'null')) {
            if (div.style.zIndex == 0) {
                div.style.zIndex = 10;
                var pokemon = e.target.getAttribute('id');
            } else if (div.style.zIndex == 10) {
                div.style.zIndex = 0;
            }
        }
    });
}
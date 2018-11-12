"use strict"

// API: https://pokeapi.co/api/v2/pokemon/

document.addEventListener('DOMContentLoaded', function() {
    // 1 We will query the API with longitude and latitude.
    getAPI();
});

function getAPI() {
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
    var pokelist = []
    for (var i = 0; i < data.length; i++) {
        pokelist.push(data[i]);
    }
    console.log(pokelist);
    createDiv(pokelist);
};

let createDiv = (pokelist) => {
    var newDivFull, newDivSmall, newImg, newP, url;

    for (var i = 0; i < pokelist.length; i++) {
        newDivFull = document.createElement('div');
        newDivFull.id = pokelist[i].name;
        newDivFull.className = 'c-pokemon';

        newImg = document.createElement('img');
        url = "http://static.pokemonpets.com/images/monsters-images-800-800/" + (i + 1) + "-" + pokelist[i].name + ".png";
        newImg.src = url;
        newImg.className = 'pokemon_img';
        newImg.alt = pokelist[i].name;

        newP = document.createElement('p');
        newP.innerHTML = pokelist[i].name.charAt(0).toUpperCase() + pokelist[i].name.slice(1);

        newDivSmall = document.createElement('div');
        newDivSmall.className = "c-pokemon__info";
        newDivSmall.appendChild(newImg);
        newDivSmall.appendChild(newP);

        newDivFull.appendChild(newDivSmall)
        document.getElementById('main').appendChild(newDivFull);
    }
}
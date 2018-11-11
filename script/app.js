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
    var newDiv, newImg;

    for (var i = 0; i < pokelist.length; i++) {
        //Automatisch generen van DIV's voor iedere pokemon
        newDiv = document.createElement('div');
        newDiv.id = pokelist[i].name;
        newDiv.className = 'test';
        newDiv.innerHTML = pokelist[i].name;

        //Automatisch afbeelding instellen voor de pokemon
        newImg = document.createElement('img');
        var url = "http://static.pokemonpets.com/images/monsters-images-800-800/" + (i + 1) + "-" + pokelist[i].name + ".png";
        newImg.src = url;
        newImg.className = 'pokemon_img';

        newDiv.appendChild(newImg);
        document.getElementById('main').appendChild(newDiv);
    }
}
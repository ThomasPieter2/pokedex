"use strict"

// API: https://pokeapi.co/api/v2/pokemon/

document.addEventListener('DOMContentLoaded', function() {
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
    var testDiv, newBtn, newDivFull, newDivSmall, newImg, newP, url;

    // for (var i = 0; i < pokelist.length; i++) {
    for (var i = 0; i < pokelist.length; i++) {
        testDiv = document.createElement('div');
        testDiv.className = 'c-pokemon-div';

        newBtn = document.createElement('button');
        newBtn.id = pokelist[i].name;
        newBtn.addEventListener('click', function() {
            showInfoPokemon(this.id, i);
        });
        newBtn.className = 'o-button-reset c-button-pokemon';

        newDivFull = document.createElement('div');
        newDivFull.className = 'c-pokemon';

        newImg = document.createElement('img');
        url = "http://static.pokemonpets.com/images/monsters-images-800-800/" + (i + 1) + "-" + pokelist[i].name + ".png";
        newImg.src = url;
        newImg.className = 'c-pokemon_img';
        newImg.alt = pokelist[i].name;

        newP = document.createElement('p');
        newP.innerHTML = pokelist[i].name.charAt(0).toUpperCase() + pokelist[i].name.slice(1);

        newDivSmall = document.createElement('div');
        newDivSmall.className = "c-pokemon__info";
        newDivSmall.appendChild(newImg);
        newDivSmall.appendChild(newP);

        newDivFull.appendChild(newDivSmall);
        newBtn.appendChild(newDivFull);
        testDiv.appendChild(newBtn);
        document.getElementById('main').appendChild(testDiv);
    }
}

let showInfoPokemon = (pokelist, id) => {
    var div = document.getElementById('info');
    //console.log(pokelist, id);
    document.addEventListener('click', function(e) {
        console.log(e.target.getAttribute('id'), div.getAttribute('id'));
        if (e.target.getAttribute('id') != div.getAttribute('id')) {
            if (div.style.zIndex == 0) {
                div.style.zIndex = 10;
            } else {
                div.style.zIndex = 0;
            }
        }
    });
}
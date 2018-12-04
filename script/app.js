"use strict"

document.addEventListener('DOMContentLoaded', function () {
    getAPI();
});

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
            vulGegevensIn(pokemon, getInfo(sorted));
        });
}

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
    var divMain, btnPokemon, imgPokemon, pPokemon;

    //for (var i = 0; i < pokelist.length; i++) {
    for (var i = 0; i < 30; i++) {
        divMain = document.createElement('div');
        divMain.id = pokelist[i].name;
        divMain.className = 'o-layout__item o-layout__gutter-sm u-1-of-3-bp1 u-1-of-3-bp2 u-1-of-3-bp3 c-pokemon';

        btnPokemon = document.createElement('button');
        btnPokemon.id = i
        btnPokemon.addEventListener('click', function () {
            showInfoPokemon(this.id);
        });
        btnPokemon.className = 'o-button-reset c-button-pokemon';

        imgPokemon = document.createElement('img');
        imgPokemon.src = pokelist[i].url;
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
    document.getElementById("main").style.filter = "blur(8px)";
    getData(pokemon);

    // div.body.addEventListener("click", function () {
    //     div.style.visibility = "hidden";
    //     div.style.zIndex = -1;
    //     document.getElementById("main").style.filter = "";
    // })

    // document.addEventListener("click", function (event) {
    //     event.stopPropagation();
    // });


    document.addEventListener("dblclick", function (e) {
        if (e.target.getAttribute('id') != div.getAttribute('id')) {
            div.style.visibility = "hidden";
            div.style.zIndex = -1;
            document.getElementById("main").style.filter = "";
        }
    });
    // Met escape knop het info venster sluiten
    // document.addEventListener("keyup", function (e) {
    //     if (e.key == "Escape") {
    //         div.style.zIndex = -1;
    //         div.style.visibility = "hidden";
    //     }
    // });
}


let vulGegevensIn = (pokemon, info) => {
    document.getElementById("txtName").value = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById("txtId").value = pokemon.id;

    var imgPokemon = document.getElementById("imgPokemon")
    imgPokemon.src = pokemon.url;
    imgPokemon.className = 'c-pokemon_img--div';
    imgPokemon.alt = pokemon.name;
    console.log("Gegevens ingevuld");

    var maxH = info[0],
        maxW = info[1];

    animationHeight(pokemon, maxH, "height");
    animationHeight(pokemon, maxW, "weight");
}

let getInfo = (pokemon) => {
    var maxH, maxW;
    var arrayHeight = [],
        arrayWeight = [];
    for (var i = 0; i < pokemon.length; i++) {
        arrayHeight.push(pokemon[i].height);
        arrayWeight.push(pokemon[i].weight);
    }
    maxH = Math.max(...arrayHeight);
    maxW = Math.max(...arrayWeight);

    return [maxH, maxW];
}

let animationHeight = (pokemon, max, type) => {
    var elem = document.getElementById("isLoading" + type);
    var elem2 = document.getElementById("" + type);
    elem.style.width = '0%';

    var width = 1;
    var id = setInterval(frame, 10);
    var maxPokemon;
    if (type == "height") {
        elem2.innerHTML = pokemon.height + "/" + max;
        maxPokemon = (pokemon.height / max) * 100;
    } else {
        elem2.innerHTML = pokemon.weight + "/" + max;
        maxPokemon = (pokemon.weight / max) * 100;
    }

    console.log(maxPokemon);

    function frame() {
        if (width >= maxPokemon) {
            clearInterval(id);
        } else {
            console.log("test");
            width++;
            elem.style.width = width + '%';
        }
    }
}
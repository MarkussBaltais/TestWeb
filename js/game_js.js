/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// pievieno masīvam cards vias atsevišķās kārtis
let card = document.getElementsByClassName("card");
let cards = [...card];


//funkcija kāršu sajaukšanai
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// kad kārtis ir sajauktas, var sākt spēli
document.body.onload = startGame();

function startGame() {

    // tiek attēlotas sajauktās kārtis
    const deck = document.querySelector(".deck");
    function startGame() {
        var shuffledCards = shuffle(cards);
        for (var i = 0; i < shuffledCards.length; i++) {
            [].forEach.call(shuffledCards, function (item) {
                deck.appendChild(item);
            });
        }
    }
}


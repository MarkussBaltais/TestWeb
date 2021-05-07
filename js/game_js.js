/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// pievieno masīvam cards visas atsevišķās kārtis
var icons = ["fa fa-dropbox card", "fa fa-amazon card", "fa fa-bitcoin card", "fa fa-apple card", "fa fa-facebook card", "fa fa-spotify card", "fa fa-twitter card", "fa fa-whatsapp card", "fa fa-behance card", "fa fa-slack card", "fa fa-tripadvisor card", "fa fa-pinterest card", "fa fa-tumblr card", "fa fa-skype card", "fa fa-google card", "fa fa-github card"];
var brands = ["Dropbox", "Amazon", "Bitcoin", "Apple", "Facebook", "Spotify", "Twitter", "Whatsapp", "Behance", "Slack", "Tripadvisor", "Pinterest", "Tumblr", "Skype", "Google", "Github"];
var cards = [];
var openedCards = [];
var dict = {"Dropbox": 0, "Amazon": 1, "Bitcoin": 2, "Apple": 3, "Facebook": 4, "Spotify": 5, "Twitter": 6, "Whatsapp": 7, "Behance": 8, "Slack": 9, "Tripadvisor": 10, "Pinterest": 11, "Tumblr": 12, "Skype": 13, "Google": 14, "Github": 15};
var dict2 = {"fa fa-dropbox card": 0, "fa fa-amazon card": 1, "fa fa-bitcoin card": 2, "fa fa-apple card": 3, "fa fa-facebook card": 4, "fa fa-spotify card": 5, "fa fa-twitter card": 6, "fa fa-whatsapp card": 7, "fa fa-behance card": 8, "fa fa-slack card": 9, "fa fa-tripadvisor card": 10, "fa fa-pinterest card": 11, "fa fa-tumblr card": 12, "fa fa-skype card": 13, "fa fa-google card": 14, "fa fa-github card": 15};
var value = document.getElementById("numberOfCards").value;
let closeicon = document.querySelector(".close");
let modal = document.getElementById("popup1");

var sec = 0, min = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;
timer.innerHTML = "0 min 0 sek";


// sākotnējā sajaukšana, lai vislaik nebūtu vienas un tās pašas kārtis
function initialShuffle() {

    for (let t = 0; t < icons.length; t++) {
        var rand = Math.floor(Math.random() * icons.length);
        var tmp = icons[rand];
        var tmp2 = brands[rand];
        icons[rand] = icons[t];
        brands[rand] = brands[t];
        icons[t] = tmp;
        brands[t] = tmp2;
        console.log("tmp: " + tmp + " tmp2: " + tmp2);
    }
}

// iegūst ievadīto vērtību - kāršu pāru skaitu
function inputValue() {
    var value = document.getElementById("numberOfCards").value;
    var a = icons.slice(0, value);
    var b = brands.slice(0, value);
    icons = a;
    brands = b;
}

// funkcija uz kārts klikšķa --> parāda kārti
var displayCard = function () {
    this.classList.toggle("open");
};

// sajauc kārtis
function shuffling() {

    for (let i = 0; i < icons.length; i++) {
        cards.push(icons[i]);
        cards.push(brands[i]);
    }
    
    for (let i = 0; i < cards.length; i++) {
        var rand = Math.floor(Math.random() * cards.length);
        var tmp = cards[rand];
        cards[rand] = cards[i];
        cards[i] = tmp;
    }
}


function cardCheck() {
    var value = cards.length / 2;

    for (let m = 0; m < cards.length; m++) {

        let char = cards[m].charAt(0);
        var span = document.createElement("SPAN");


        // pārbauda vai ir teksts (tas sākas ar lielo burtu)
        // teksta value atrod iekš dictionary pēc key innerHTML
        if (char >= "A" && char <= "Z") {
            span.innerHTML = cards[m];
            span.setAttribute("class", "card");
            span.setAttribute("id", "a" + dict[span.innerHTML]);
            span.addEventListener("click", displayCard);
            document.getElementById("cardsID").appendChild(span);

           
        // ja nav teksts, tad ikona
        // ikonas value atrod iekš dictionary pēc key class
        } else {
            span.setAttribute("class", cards[m]);
            console.log(dict[span.getAttribute("class")]);
            span.setAttribute("id", "b" + dict2[span.getAttribute("class")]);
            span.addEventListener("click", displayCard);
            document.getElementById("cardsID").appendChild(span);
        }
        
        // reakcija uz kārts klikšķa
        span.addEventListener("click", function() {
            openedCards.push(this.getAttribute("id"));
            var length = openedCards.length;
            if (length === 2) {
                
                //pārbauda vai id numuri ir vienādi (piem. a12, b12)
                if (openedCards[0].slice(1) === openedCards[1].slice(1)) {

                    //classListes ir definētas iekš css
                    document.getElementById(openedCards[0]).classList.add("match", "disabled");
                    document.getElementById(openedCards[1]).classList.add("match", "disabled");
                    document.getElementById(openedCards[0]).classList.remove("show", "open");
                    document.getElementById(openedCards[1]).classList.remove("show", "open");
                    value--;
                    
                    // ja value ir 0, pabeidz spēli, ja nav --> turpina
                    if (value === 0) {
                        congratulations();
                    } else {
                        openedCards = [];
                    }

                } else {
                    document.getElementById(openedCards[0]).classList.add("unmatched");
                    document.getElementById(openedCards[1]).classList.add("unmatched");

                    setTimeout(function () {
                        document.getElementById(openedCards[0]).classList.remove("open", "unmatched");
                        document.getElementById(openedCards[1]).classList.remove("open", "unmatched");
                        openedCards.pop();
                        openedCards.pop();;
                    }, 600);
                }
            }
        });
    }
}

//popup paziņojums
function congratulations() {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    modal.classList.add("show");
    document.getElementById("totalTime").innerHTML = finalTime;
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
    });
}


// laika atskaite
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = min + " min " + sec + " sek";
        sec++;
        if (sec === 60) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            hour++;
            min = 0;
        }
    }, 1000);
}


// spēles kods
function startGame() {
    
    // reseto laukumu
    while (document.getElementById("cardsID").hasChildNodes()){
        document.getElementById("cardsID").removeChild(document.getElementById("cardsID").lastChild);
        console.log("remove");
    }
    cards = [];
//    openedCards = [];
    
    // veic sajaukšanu
    initialShuffle();
    inputValue();
    shuffling(cards);
    
    // reseto laiku
    sec = 0;
    min = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 min 0 sek";
    clearInterval(interval);
    
    //uzsāk laika atskaiti
    startTimer();
    
    //spēle
    cardCheck();
}





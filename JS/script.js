// Hier worden alle variables gedeclareerd en toegewezen

const gridContainer = document.querySelector(".grid-container");
let kaarten = [];
let eerste_kaart, tweede_kaart;
let gameklaar = false;
let score = 0;

// Hier wordt de score element in de index gekoppeld met de score variable
function updatescore() {
    document.querySelector(".score").textContent = score;
}
updatescore()

//hier worden alle kaart fotos uit de json gehaald. en in een array gestopt
fetch("data/config.json")
    .then((res) => res.json())//hier wordt de json file in een javascript object gezet
    .then((data) => {
        kaarten = [...data, ...data]; //we hebben 2 nodig van elke kaart. Dus zo maak je 2 kaarten in kaarten
        shuffleKaarten(); //kaarten worden geshuffeld
        generateCards(); // kaarten worden gegeneerd
    });


// In deze functie worden alle kaarten geshuffeld die in het spel zijn.
function shuffleKaarten() {
    let currentIndex = kaarten.length, //hoeveelheid kaarten wordt vastgesteld aan deze variable
        randomIndex, // Dit zorgt ervoor dat alle kaarten op een random plek staan
        temporaryValue; // temporaryvalue is er zodat we niet de current index kwijt raken
    while (currentIndex !== 0) { //loop
        randomIndex = Math.floor(Math.random() * currentIndex); // genereert een nummer om te wisselen met de huidige kaart in de herhaling.
        currentIndex -= 1; // dan wordt de currentindex vermindert met 1 zodat de loop naar een andere kaart kan gaan
        temporaryValue = kaarten[currentIndex]; // huidige waarde van card[currentindex] hier opgeslagen
        kaarten[currentIndex] = kaarten[randomIndex]; // De waarde van het huidige element wordt vervangen door de waarde van de willekeurig geselecteerde kaart.
        kaarten[randomIndex] = temporaryValue; //De waarde van de willekeurig geselecteerde kaart wordt vervangen door de eerder opgeslagen waarde van het huidige element.
    }
}

//kaarten worden hier gegenereerd
    function generateCards() {
        for (let card of kaarten) {
            const cardElement = document.createElement("div"); //maakt voor elke kaart een div element aan
            cardElement.classList.add("card"); // en met elke div element wordt er een class card aangemaakt
            cardElement.setAttribute("data-name", card.name); //de datanaam van de json file wordt nu ingesteld op de div
            //Hier wordt de voorkant en achterkant van de kaart gecreëerd
            cardElement.innerHTML = `
          <div class="front">
            <img class="front-image" src=${card.image} /> <!--hier wordt er een foto geplaatst op de voorkant-->
          </div>
          <div class="back"><h1>JD</h1></div>
        `;
            gridContainer.appendChild(cardElement); // De kaart wordt toegevoegd aan gridcontainer
            cardElement.addEventListener("click", flipCard); //
        }
    }

function flipCard() {
    if (gameklaar) return;
    if (this === eerste_kaart) return;

    this.classList.add("flipped");

    if (!eerste_kaart) {
        eerste_kaart = this;
        return;
    }

    tweede_kaart = this;
    // score++;
    document.querySelector(".score").textContent = score;
    gameklaar = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = eerste_kaart.dataset.name === tweede_kaart.dataset.name;
    // isMatch ? disableCards(), score++ : unflipCards();
    if (isMatch == true){
        disableCards()
        score++
        updatescore()
        // Controleer of alle paren zijn gevonden (het aantal paren is gelijk aan de helft van de kaarten).
        if (score === kaarten.length / 2) {
            // Laat het win-scherm zien als alle paren zijn gevonden.
            document.getElementById("win-screen").style.display = "block";
        }

    }else{
        unflipCards()
    }
}

function disableCards() {
    eerste_kaart.removeEventListener("click", flipCard);
    tweede_kaart.removeEventListener("click", flipCard);

    resetBoord();
}

function unflipCards() {
    setTimeout(() => {
        eerste_kaart.classList.remove("flipped");
        tweede_kaart.classList.remove("flipped");
        resetBoord();
    }, 1000);
}

function resetBoord() {
    eerste_kaart = null;
    tweede_kaart = null;
    gameklaar = false;
}

function restart() {
    resetBoord();
    shuffleKaarten();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
    document.getElementById("win-screen").style.display = "none";
}
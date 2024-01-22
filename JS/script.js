// speler1 = {
//     name: "Speler1",
//     symbol: "X",
//     points: 0
// }
//
// speler2 = {
//     name: "Speler2",
//     symbol: "O",
//     points: 0
// }
// spel = {
//     currentplayer: speler1,
//     move: 1,
//     spelklaar: false,
//     kaart: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//     // wincondities: [
//     //
//     // ],
//
//     kaartklikken() {
//         if (this.spelklaar == false) {
//             if(this.kaart == )
//         }
//     }
// }


function toggleAfbeelding(afbeeldingId) {
    // Zoek het afbeeldingselement op basis van de meegegeven ID
    var afbeelding = document.getElementById(afbeeldingId);

    // Toggle het 'hidden' attribuut
    afbeelding.hidden = !afbeelding.hidden;
}
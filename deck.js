const Card = require("./card");
const Discord = require('discord.js');
module.exports = class Deck {
    constructor() {
            this.cards = [];
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            // pick random card
            const j = Math.floor(Math.random() * (i + 1));
            // swap it with current one
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // add a deck of cards
    addDeck() {
        for (let s = 0; s < 4; s++)
            for (let v = 0; v < 13; v++)
                this.cards.push(new Card(s, v));
        this.cards.push(new Card(4,13));
        console.log("Pushed cards! \n");
        this.cards.push(new Card(4,14));
    }

    deal(players) { //array of players[]

        const cardsPerPlayer = this.cards.length / players.length;
        // console.log("Cards per player: " + cardsPerPlayer);
        // console.log("Length of cards before dealing: " + this.cards.length);
        // console.log("Num of cards: " + cards.length);
        // console.log("One card value name: " + Card.valueName(2));
        //  for (let i = 0; i < this.cards.length; i++) {
        //      console.log("Cards " + this.cards[i].toString());
        //  }
        // console.log(this.cards);

        for (let i = 0; i < players.length; i++) {
            players[i].cards = this.cards.splice(0,cardsPerPlayer);
            players[i].update();
         }   
        // console.log("Length of cards after dealing: " + this.cards.length);
        // console.log(this.cards);
        // console.log(cards);
        if (this.cards.length % players.length != this.cards.length)
            console.log("remaining cards after dealing appears invalid");
    }

    at(ind) { return this.cards[ind]; }

};

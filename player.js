const Card = require("./card");
const Deck = require("./deck");

module.exports = class Player {


    constructor(user,id) {
        this.user = user; //type User
        this.cards = [];
        this.sets = [0,0,0,0,0,0,0,0,0] //half suites
        this.id = id; // 0 - 5
    }

    update() { //updates the sets array
        this.sets = [0,0,0,0,0,0,0,0,0]
        for (let i = 0; i < this.cards.length; i++) { 
            this.sets[Card.halfSuite(this.cards[i])]++; //check
        
        }
    }

    contains(card) { // returns if this has card
        for (let i = 0; i < this.cards.length; i++) {
            if (card.value === this.cards[i].value && this.card.suite === this.cards[i].suite)
                return true;
        }
        return false;
    }
    

    cards() {
        return this.cards;
    }

    add(card) { //adds a card to this.cards
        this.cards.push(card);
        sets[Card.halfSuite(card)]++;
    }

    remove(card) { //removes Card card from  this.cards
        for (let i = 0; i = 6; i++) {
            if (this.cards[i].equals(card)) {
                delete this.cards[i];
                sets[Card.halfSuite(card)]--;
                return;
            }
        }
    }




    // remove given number of cards from hand
    // // returns cards removed
    // discard(num) {
    //     return this.cards.splice(-num);
    // }

    // // adds given card array to the cards list
    // accept(cards) {
    //     this.cards = this.cards.concat(cards);
    // }

    // // add card to hand
    // push(c) {
    //     this.cards.push(c);
    // }

    // pop() {
    //     return this.cards.pop();
    // }
    // how many cards
    size() {
        return this.cards.length;
    }
};



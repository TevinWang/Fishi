module.exports = class Card {

    constructor(suite,value) {
        // if (!value) {

        // } 
        // else {
            this.suite = suite;
            this.value = value;
        // }
    }
    
    // Provides numerical value of a half-suit
//0-12 represents 2-A, jokers are 13 & 14
//0 is club, 1 is Spade, 2 is Diamond, 3 is Heart, 4 is Joker
// First if case describes the 8 and Joker halfsuits
// Else uses value of suite. Second if uses val
    static halfSuite(card) { //0=LC,1=HC,2=LS,3=HS,4=LD,5=HD,6=LH,7HH,8=8J   //check
        if (card.suite === 4 || card.value === 6) { // 8J HS
            return 8;
        } else {
            return card.suite * 2 + (card.value > 6 ? 1 : 0); //wait alex this is big brain
        }
            
    }

    equals (card) {
        if (this.suite === card.suite && this.value === card.value) return true;
        else return false;
    }

    static valid(suite,value) {
        if (suite >= 0 && suite <4 && value >= 0 && value < 13)
            return true;
        else if (suite === 5 && value >= 13 && value < 15)
            return true;
        else
            return false;
    }



    static suiteName(suite) {
        return ["♧", "♤", "♢", "♡","🃏"][suite]; //what does the blackslash do?
        // return ["Clubs", "Spades", "Diamonds", "Hearts","Joker"][suite];
    }


    static valueName(value) {
        // return [ "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
        //     "Nine", "Ten", "Jack", "Queen", "King", "Ace", "Small", "Big"][value];
        return [ "2", "3", "4", "5", "6", "7", "8",
            "9", "10", "J", "Q", "K", "A", "S", "B"][value];
    }


    faceCard() {
        return this.value < 8;
    }



    toString() {
        return '' + Card.valueName(this.value) + Card.suiteName(this.suite);
        // return Card.valueName(this.value) + (this.suite != 4 ? " of " : " ") + Card.suiteName(this.suite);
    } //why is this broken?

    // is this needed?
    valueOf() {
        return 13 * this.suite + this.value;
    }

    equals(card) {
        return this.suite == card.suite && this.value == card.value;
    }
};

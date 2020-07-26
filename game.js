const Card = require("./card");
const Deck = require('./deck');
const Player = require('./player');
const Discord = require('discord.js');

module.exports = class Game {
    turn = Math.floor(0); //SHOULD BE RANDOM
    //turn = Math.floor(Math.random() * (5)); 
    deck = new Deck();
    players = new Array(6);  // array of players
    playerUsers = new Array(6); // User[];
    ongoing = false;
    phase =  0; //0 = waiting for target, 1 = waiting for card 
    target = -1;

    constructor(playerUsers) {

        this.playerUsers = playerUsers; //Type User[]
         
        //  this.deck = deck;
    
        for (let i = 0; i < playerUsers.length; i++) {
            this.players[i] = new Player(playerUsers[i],i);
            this.players[i].update();
        }
    }

    ongoing() {
        return this.ongoing;
    }

    endturn() {
        playerUsers[turn].send('Your turn! Who do you want to ask?') //how to tag them
        this.phase = 0;
    }

    onMessage(message,botPrefix) {
        // var prefix;
        // if (message.channel.type === 'dm') {
        //     prefix = '';
        // } else {
        //     prefix = botPrefix;
        // }

        // if(!message.content.startsWith(prefix)) return;
        // const args = message.content.slice(prefix.length).split(/ +/);
        // const command = args.shift().toLowerCase();
        // //const amount = parseInt(args[0]);
        const args = message.content.split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'players') {
            const mentions = message.mentions.users.array();
            const gamecard = new Discord.MessageEmbed()
                .setTitle("Play Fish!")
                .setDescription(mentions);
            message.channel.send(gamecard)
        }

        if (command === `setturn`) {
            this.turn = parseInt(args[0]);
            message.channel.send('It is now Player ' + this.turn + ", <@" + this.players[this.turn].user + '>\'s turn.');
       }

        if (command === `turn`)
            message.channel.send('It is currently Player ' + this.turn + ", <@" + this.players[this.turn].user + '>\'s turn.');
        if (command === `declare`) return declare();

        if (message.author.tag === this.players[this.turn].user.tag) { //check
            //message.channel.send(this.players[2].sets);
            //message.channel.send(Card.halfSuite(new Card(2,3)));
            console.log(this.phase);
            if (this.phase === 0) {
                if (message.mentions.users.array().length === 0) {
                    console.log('hihihih');
                    message.channel.send('Who do you want to ask? (mention)');
                    return;
                }
                console.log("hi" + message.mentions.users.array());
                console.log(message.mentions.users.array().length);
                console.log(message.mentions.users.first());
                console.log(message.mentions.users.array().length === 0);
                console.log(message.mentions.users.first().tag);


                var tag = message.mentions.users.first().tag; //first mention message TODO
                message.channel.send(tag);
                this.target = -1; // 
                for (let i = 0; i < 6; i++) {
                    message.channel.send(this.players[i].user.tag);
                    if (this.players[i].user.tag === tag) {
                        this.target = i;
                        this.phase = 1;
                        break;
                    }
                }
                if (this.target === -1) {
                    console.log('ERROR');
                }



             } else if (this.phase = 1) {
                if (message.content.split(',').length != 2) {
                    message.channel.send('Ask for a card. Format: suite,value');
                    return;
                }
                var suite = message.content.split(',')[0];
                var value = message.content.split(',')[1];
                if (!Card.valid(parseInt(suite),parseInt(value))) {
                    message.channel.send('Not a card.')
                    return;
                }
                var card = new Card(suite,value); //msg in formate suite,value (numerical)
                if (Game.valid(card,this.players[this.turn],message)) {
                    this.ask(this.players[this.target],card,message);
                    //why are u guys so good
                    //bro u guys are so good at coding bruh howwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
                }
            }



        }
    }
    // ask for a card
    ask(target,card,message) {
        if (target.contains(card)) {
            target.remove(card);
            this.players[turn].add(card);
            for (var i = 0; i < this.players.length; i++) {
                this.players[i].user.send('Player ' + `${this.players[this.turn].user}` + 'has taken ' + card + ' from ' + `${target.user}`);
            }
            message.channel.send(this.players[i].user.send('Player ' + `${this.players[this.turn].user}` + 'has taken ' + card + ' from ' + `${target.user}`));
            //DM EVERYONE
        } else {
            for (var i = 0; i < this.players.length; i++) {
                this.players[i].user.send('Player ' + `${this.players[this.turn].user}` + '\'s ask for ' + card + ' is unsuccessful. It is now ' + `${target.user}` + '\'s turn.');
          
            }
            message.channel.send('Player ' + `${this.players[this.turn].user}` + '\'s ask for ' + card + ' is unsuccessful. It is now ' + `${target.user}` + '\'s turn.');
            this.turn = target.id;
        }
    }
    
    /*declare() {
        message.channel.send("Which Half-Suite do you want to declare?");
        var hsuite = message.content;
        if(hsuite == 5){
            for(var i = 0; i < 4; i++){

            }
        }
    }*/

    static valid(card,player,message) { //type Card, Player
        if ((!player.contains(card)) && player.sets[Card.halfSuite(card)] > 0) //already has card from half suite
            return true;
        if (player.contains(card))
            message.channel.send('You already have this card.');
        if (!(player.sets[Card.halfSuite(card)] > 0))
            message.channel.send('You don\'t have a card from the same half suite');
        return false;

            
    }

    startGame() {
        this.deck.addDeck();
        this.deck.shuffle();
        this.deck.deal(this.players);
        this.ongoing.true;
    }

    showDeck() {
        for(let i = 0; i < 6; i++) {
            var description = ' ---------------------------------------------------------------------------------' + '\n';
            console.log(this.players[i].cards.length);
            for (let j = 0 ; j< this.players[i].cards.length; j++) {
                description = description + ' | ' + this.players[i].cards[j].toString() + ' | ';
                console.log(this.players[i].cards[j].toString());
            }
            description = description + '\n --------------------------------------------------------------------------------- ';
            console.log(this.playerUsers);
            const playercards = new Discord.MessageEmbed()
                .setTitle('Let\'s play fish! \n\n**Your cards:**')
                .setDescription(description)
                .setFooter('Card game made by FBS.')
            this.playerUsers[i].send(playercards);
        }

    }

}

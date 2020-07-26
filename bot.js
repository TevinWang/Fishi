const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

// FISH GAME VARS
const Deck = require("./deck");
const Game = require("./game");
var game;


const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html';
const covid = new Array(); 
        rp(url)
            .then(function(html) {
            // console.log($('.card-body ul li', html).text());
            $('.2019coronavirus-summary .card .card-body ul li', html).each(function(i, elem) {
                covid[i] = $(this).text();
            });
        }).catch(function(err) {
            //handle error
             });

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {
     //does not work with multiple servers
    if (message.author.bot) return;

    // if (game.ongoing()) {
    //     game.onMessage(message);
    //     return;
    // }

    if (game != undefined) {
        game.onMessage(message,prefix);
        
    }


    const mentions = message.mentions.users.array();
    
    if (message.author.tag.split('#')[1] === '9022') message.delete({timeout:0}).catch();
    
    if(!message.content.startsWith(prefix)) return;
    

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const amount = parseInt(args[0]);
    
    const card = new Discord.MessageEmbed()
                .setImage(
                    'https://us.123rf.com/450wm/ahasoft2000/ahasoft20001801/ahasoft2000180110147/93505788-stock-vector-hearts-ace-playing-card-vector-icon-style-is-flat-graphic-symbol-.jpg?ver=6'
                )
    // const card2 = {
    //     image: {
    //         'https://us.123rf.com/450wm/ahasoft2000/ahasoft20001801/ahasoft2000180110147/93505788-stock-vector-hearts-ace-playing-card-vector-icon-style-is-flat-graphic-symbol-.jpg?ver=6'
            
    //     }, 
    // };
    if (command === 'emoji') {
        message.channel.send('\🃏h');
        message.channel.send(':black_joker:');
    }
    if (command === 'card') {
        message.channel.send(card);
    }
    else if (command === 'startgame') {
        // message.channel.send(mentions.length)
        if (mentions.length === 6) {
            const gamecard = new Discord.MessageEmbed()
                .setTitle("Play Fish!")
                .setDescription(mentions);
            message.channel.send(gamecard)
            game = new Game(mentions);
            message.channel.send('started' + game);
            game.startGame();
            game.showDeck();
        } else {
            message.reply("Not enough players provided.");
        }
    
    //other commands
    } else if (command === 'ping') {
        const msg = await message.channel.send('Pinging...');
        msg.edit(`Pong. ${msg.createdTimestamp - message.createdTimestamp }ms. Please finish this bot if you are pinging.`);
    } else if (command === 'pong') {
        message.channel.send('no');
    } 
    else if (command == "rules"){
        message.channel.send("Here are the rules: https://www.pagat.com/quartet/literature.html#players"); //random link with rules
    }
    else if (command==='help'){
        message.channel.send("List of commands:\n>card\n>help\n>rules\n>startgame\n>ping\n>pong"); //oops I'll alphabetize later
    } else if (command === 'covidinfo') {
        const covidcard = new Discord.MessageEmbed()
                    .setTitle("Covid info by arku")
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/US_CDC_logo.svg/1280px-US_CDC_logo.svg.png")
                    .setDescription('**' + covid[0] + '\n' + covid[1] + '**');
        message.channel.send(covidcard);
    } 
    
});

client.login(token);

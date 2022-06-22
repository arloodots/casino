const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

//Write your token here
const TOKEN = "5537160350:AAGjoiwitaslrx594LGLovY6EoQO2o1sdLM";
const server = express();
const bot = new TelegramBot(TOKEN, { polling: true } );

const port = process.env.PORT || 5000;

//Write your telegram game name here
const gameBaseURL = "https://roulette.arloodots.repl.co"
const gameName = ["montee","roulette","bingo","blackjack","championslot","craps","highlow","plinko"];
const gameLocations = ["/montee","/roulette","/bingo","/blackjack","/championslot","/craps","/highlow","/plinko"]
const queries = {};



bot.onText(/help|h/, (msg) => bot.sendMessage(msg.from.id, "This bot implements casino games. Say /game if you want to play."));

bot.onText(/buy/, (msg) => bot.sendMessage(msg.from.id, "Message @iqbalexperience to buy telegram games."));


bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName[0]));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName[1]));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName[2]));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName[3]));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName[4]));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName[5]));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName[6]));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName[7]));



bot.on("callback_query", function (query) {
	console.log(query.from.username)
	let gameIndexValue = gameName.indexOf(query.game_short_name)
    if (gameIndexValue < 0) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        queries[query.id] = query;
      
//write your game url here
        let gameurl = gameBaseURL + gameLocations[gameIndexValue] + "/?id="+query.id;
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameurl
        });
    }
});
bot.on("inline_query", function(iq) {
      bot.answerInlineQuery(iq.id, [ { type: "game", id: "0", game_short_name: gameName } ] ); 
});




server.use(express.static(path.join(__dirname, 'game')));





server.get("/highscore/:score", function(req, res, next) {
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return next();
    let query = queries[req.query.id];
    let options;
    if (query.message) {
        options = {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id
        };
    } else {
        options = {
            inline_message_id: query.inline_message_id
        };
    }
    bot.setGameScore(query.from.id, parseInt(req.params.score), options, 
        function (err, result) {});
});
server.listen(port);
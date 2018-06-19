/**
 * The Bot Itself
 */
"use strict";
const path = require("path")
const Bot = require('@menome/botframework')
const config = require("../config/config.json")


// Start the actual bot here.
var bot = new Bot({config});



// Set up our security middleware.
bot.registerControllers(path.join(__dirname+"/controllers"));

bot.start();
bot.changeState({state: "idle"});
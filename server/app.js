'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const smoochBot = require('smooch-bot');
const MemoryStore = smoochBot.MemoryStore;
const MemoryLock = smoochBot.MemoryLock;
const Bot = smoochBot.Bot;
const StateMachine = smoochBot.StateMachine;
const script = require('./script');
const _ = require('lodash');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function(req, res) {
    res.render('index');
});



class ConsoleBot extends Bot {
    constructor(options) {
        super(options);
    }

    say(text) {
        return new Promise((resolve) => {
            this.response.send(text);
            resolve(text);
        });
    }

    setResponse (response) {
        this.response = response;
    }
}

const userId = 'testUserId';
const store = new MemoryStore();
const lock = new MemoryLock();
const bot = new ConsoleBot({
    store,
    lock,
    userId
});

const stateMachine = new StateMachine({
    script,
    bot,
    userId
});


app.post('/bot/emit', (request, response)=> {
    bot.setResponse(response);
    stateMachine.receiveMessage({
            text: request.body.userText.trim()
        })
        .catch((err) => {
            console.error(err);
            console.error(err.stack);
        });

});

module.exports = app;
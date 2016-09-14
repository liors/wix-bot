'use strict';

const _ = require('lodash');
const Script = require('smooch-bot').Script;
const scriptRules = require('./script.json');
const imageRecognition = require('./imageRecognition');

module.exports = new Script({
    processing: {
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say(scriptRules['BOT'])
                .then(() => 'speak');
        }
    },

    speak: {
        receive: (bot, message) => {
            let upperText = message.text.trim().toUpperCase();

            function updateSilent() {
                switch (upperText) {
                    case "CONNECT ME":
                        return bot.setProp("silent", true);
                    case "DISCONNECT":
                        return bot.setProp("silent", false);
                    default:
                        return Promise.resolve();
                }
            }

            function getSilent() {
                return bot.getProp("silent");
            }

            function processMessage(isSilent) {
                if (isSilent) {
                    return Promise.resolve("speak");
                }

                if (upperText === 'START AGAIN') {
                    bot.say(scriptRules[upperText])
                        .then(() => 'speak');
                }

                if (!_.has(scriptRules, upperText)) {
                    if (upperText.startsWith("I'M LOOKING FOR")) {
                        return imageRecognition.process(upperText.split("I'M LOOKING FOR")[1].split(' ')).then((data) => {
                            bot.say('I found a pic here\'s a <a href="http://google.com">link</a>').then(()=> 'speak');
                        });

                    } else {
                        return bot.say(`I didn't understand that.`).then(() => 'speak');
                    }
                }

                var response = scriptRules[upperText];
                if (upperText === 'FIND ME AN IMAGE') {
                    return bot.say(`I didn't find this image.`).then(() => 'speak');
                }
                var lines = response.split('\n');

                var p = Promise.resolve();
                _.each(lines, function (line) {
                    line = line.trim();
                    p = p.then(function () {
                        return bot.say(line);
                    });
                })

                return p.then(() => 'speak');
            }

            return updateSilent()
                .then(getSilent)
                .then(processMessage);
        }
    }
});
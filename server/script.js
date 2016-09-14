'use strict';

const _ = require('lodash');
const Script = require('smooch-bot').Script;
const scriptRules = require('./script.json');
const imageRecognition = require('./imageRecognition');
const data = require('./data');

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
                        const normalizedkeywords = upperText.split("I'M LOOKING FOR")[1].trim();
                        const link = data.getImageFor(normalizedkeywords);//'Designer Living Room');
                        console.log('got a link.... ' + link);



                        return bot.say('I found something check it out! <a href=' + link.src + '>link.src</a>').then(()=> 'speak');
                        //return imageRecognition.process(upperText.split("I'M LOOKING FOR")[1].split(' ')).then((data) => {

                        //});

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
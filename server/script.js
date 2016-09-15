'use strict';

const _ = require('lodash');
const Script = require('smooch-bot').Script;
const scriptRules = require('./script.json');
const imageRecognition = require('./imageRecognition');
const dataService = require('./data');

module.exports = new Script({
    processing: {
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            var data = {
                text: scriptRules['BOT']
            }
            return bot.say(JSON.stringify(data)).then(() => 'speak');
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
                    if (upperText.startsWith("HI")) {
                        var data = {
                            text: scriptRules['HELLO']
                        }
                        return bot.say(JSON.stringify(data)).then(() => 'speak');

                    } if (upperText.startsWith("SURE") || upperText.startsWith("YES")) {
                        var data = {
                            text: scriptRules['YES']
                        }
                        return bot.say(JSON.stringify(data)).then(() => 'speak');

                    } else if (upperText.startsWith("I'M LOOKING FOR")) {
                        console.log('starting to look for keywords');
                        const normalizedkeywords = upperText.split("I'M LOOKING FOR")[1].trim();
                        console.log(normalizedkeywords);
                        const links = dataService.getImageFor(normalizedkeywords);
                        console.log('got a link.... ' + links);
                        var result = {

                        };

                        if (_.size(links) === 0) {
                            result = {
                                text: 'Could not find anything :{ please search for something else...'
                            };
                        } else {
                            result = {
                                text: `I found ${_.size(links)} images. Creating you an amazing new Gallery. Wait for it...`,
                                links: links
                            };
                        }

                        return bot.say(JSON.stringify(result)).then(()=> 'speak');
                    } else {
                        var data = {
                            text: 'I did not understand that.'
                        }
                        return bot.say(JSON.stringify(data)).then(() => 'speak');
                    }
                }


                console.log('here.....');
                var response = scriptRules[upperText];
                var lines = response.split('\n');

                var p = Promise.resolve();
                _.each(lines, function (line) {
                    line = line.trim();
                    p = p.then(function () {
                        var data = {
                            text: line
                        }
                        return bot.say(JSON.stringify(data));
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
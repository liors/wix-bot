'use strict';

const fetch = require('node-fetch');
const Clarifai = require('clarifai');

let ImageRecognition = {
    process: (keywords) => {
        console.log('here:' + keywords);
        return new Promise((resolve) => {
            /*
            const client_id = 'R3StJz0IQMadQE-girBkvPpPrMprnumiWlBYeQ_0';
            const client_secret = 'oSY9ulpTP4y47KSx_WXBTOM8BUEslBslzOYIf9y3';

            Clarifai.initialize({
                'clientId': client_id,
                'clientSecret': client_secret
            });

            Clarifai.getTagsByUrl('https://samples.clarifai.com/wedding.jpg').then(
                (response) => {
                    const result = response.results[0].result.tag.classes;
                    console.log(result);
                    resolve(result)
                },
                (e)=> {}
            );
            */
            resolve(["ceremony","people","religion","many","woman","group","adult","city","man","leader","wear","veil","street","crowd","military","celebration","wedding","administration","festival","police"])
        });
    }
};


function handleResponse(resolve, response){
    console.log('promise response:', JSON.stringify(response));
    console.log(response.data.results[0].result.tag.classes);
    resolve(response.data.results[0].result.tag.classes)
};


module.exports = ImageRecognition;
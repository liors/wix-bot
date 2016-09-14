'use strict';
const _ = require('lodash');


let imagesSources;
let Data = {
    set: (images) => {
        imagesSources = images;
        console.log('got images ' + images.length + ' images');

    },

    getImageFor: (keyword) => {
        console.log('got a keyword   => ' + keyword);
        // dump non-words
        keyword = keyword.replace(/[^\w]/g, ' ');
        // dump multiple white-space
        keyword = keyword.replace(/\s+/g, ' ');
        // split
        var wordlist = keyword.split(' ');
        console.log('before   => ' + wordlist);
        var stopwords = [ "a", "about", "above", "accordingly", "after",
            "again", "against", "ah", "all", "also", "although", "always", "am", "among", "amongst", "an",
            "and", "any", "anymore", "anyone", "are", "as", "at", "away", "be", "been",
            "begin", "beginning", "beginnings", "begins", "begone", "begun", "being",
            "below", "between", "but", "by", "ca", "can", "cannot", "come", "could",
            "did", "do", "doing", "during", "each", "either", "else", "end", "et",
            "etc", "even", "ever", "far", "ff", "following", "for", "from", "further", "furthermore",
            "get", "go", "goes", "going", "got", "had", "has", "have", "he", "her",
            "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into",
            "is", "it", "its", "itself", "last", "lastly", "less", "many", "may", "me",
            "might", "more", "must", "my", "myself", "near", "nearly", "never", "new",
            "next", "no", "not", "now", "o", "of", "off", "often", "oh", "on", "only",
            "or", "other", "otherwise", "our", "ourselves", "out", "over", "perhaps",
            "put", "puts", "quite", "s", "said", "saw", "say", "see", "seen", "shall",
            "she", "should", "since", "so", "some", "such", "t", "than", "that", "the",
            "their", "them", "themselves", "then", "there", "therefore", "these", "they",
            "this", "those", "though", "throughout", "thus", "to", "too",
            "toward", "unless", "until", "up", "upon", "us", "ve", "very", "was", "we",
            "were", "what", "whatever", "when", "where", "which", "while", "who",
            "whom", "whomever", "whose", "why", "with", "within", "without", "would",
            "yes", "your", "yours", "yourself", "yourselves", ",", ";", "?", ".", "$", " ", "example", "using"];
        for(var i=0; i<wordlist.length; i++) {
            console.log('checking if ' + wordlist[i] + ' is a stopword');
            if (isStopword(stopwords, wordlist[i])) {
                console.log('it is -  removing ' + wordlist[i] + ' for the search');
                wordlist.splice(i, 1);
            } else {
                console.log('it is not keeping ' + wordlist[i] + ' for the search');
            }
        }
        console.log('images =>' + imagesSources.length);
        console.log('after   => ' + wordlist);


        var results = [];
        _.forEach(wordlist, (word)=> {
            const resultsForWord = getImgs(imagesSources, word);
            results = _.union(results, resultsForWord);
        });

        return results;
    }
};

function getImgs (imagesSources, keyword) {
    return _.filter(imagesSources, (img) => {
        if (_.includes(img.title.toUpperCase(), keyword)) {
            console.log(`title: ${img.title.toUpperCase()}, keyword ${keyword}`);
            return img;
        }
    })
}


function isStopword(stopWordArray, element) {
    var flag = 0;
    for (var i = 0; i < stopWordArray.length; i++) {
        if (stopWordArray[i].toLowerCase() === element.toLowerCase()) {
            return true;
        }
        if (element == " " || element == "") {
            return true;
        }
    }
    if (flag == 0) {
       return false;
    }
}

module.exports = Data;
function initAppForPage () {
    return Promise.resolve();
}

function createControllers (controllerConfigs) {
    return controllerConfigs.map(function (_ref) {
        var type = _ref.type;
        var config = _ref.config;
        return controllerByType[type] ? Promise.resolve(controllerByType[type](config)) : Promise.reject(new Error('Unknown controller type [' + type + ']'));
    });
}

var controller = function () {
    return {
        start: function start($w) {
            const bot = $w('@wix-bot');
            if (bot.length > 0) {
                bot.show();
            }
            const gallery = $w('@gallery');
            if (gallery.length > 0) {
                images = gallery.images;


                fetch('http://localhost:8000/images/', {
                    method: 'post',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({ images: images })
                })
                    .then(response => {
                        return response.text();
                    })
                    .then(text => {

                    });
            }
        }
    }
};

var controllerByType = {
    botType: controller
};

module.exports = {
    initAppForPage: initAppForPage,
    createControllers: createControllers
};
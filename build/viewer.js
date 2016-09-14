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

function foo () {
    debugger;
}

var controller = function () {
    return {
        start: function start($w) {
            const bot = $w('@wix-bot');
            if (bot.length > 0) {
                bot.show();
            }
            const gallery = $w('@pro-gallery');
            if (gallery.length > 0) {
                gallery.onReady().then(api => {
                    api.getUrl().then(url => {
                        debugger;
                    });
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
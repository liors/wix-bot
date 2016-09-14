export const initial_state = {
    fields: ['', '', '', '', '', '', '', '', ''],
    nextStone: 'x',
    winningCombination: undefined,
    gameIsOver: false
};

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let settingsUpdated = function (action, oldState) {
    var state = Object.assign({}, oldState);
    state.shouldShowWinnerBar = _.get(action, 'data.booleans.layout_show_winner', true);
    state.nextStone = _.get(action, 'data.numbers.rules_player', 'x') == 1 ? 'o' : 'x'
    return state;
};

let selectField = function (action, oldState) {
    var fieldId = action.id;
    var fields = oldState.fields;

    if (oldState.gameIsOver) {
        return _.merge(initial_state, {
            shouldShowWinnerBar: oldState.shouldShowWinnerBar
        });
    }

    // Only set a stone if there is none yet.
    if (fields[fieldId] != '') {
        return oldState;
    }

    // Make a new state object by cloning the old one.
    var state = Object.assign({}, oldState);

    // Which stone to set?
    var nextStone = state.nextStone;
    state.nextStone = nextStone === 'x' ? 'o' : 'x';

    // Set the stone.
    state.fields = fields.slice();
    state.fields[fieldId] = nextStone;

    // Find the winner (if any).
    var oldWinningCombination = state.winningCombination;
    state.winningCombination = (oldWinningCombination) ? oldWinningCombination : winningCombination(state.fields);

    var isTie = !state.winningCombination && numberOfStones(state.fields) == 9;

    state.gameIsOver = state.winningCombination || isTie;

    return state;
};

let winningCombination = function (fields) {
    for (var i = 0; i < WINNING_COMBINATIONS.length; i++) {
        var combination = WINNING_COMBINATIONS[i];
        if (fields[combination[0]] !== '' && fields[combination[0]] === fields[combination[1]] && fields[combination[1]] === fields[combination[2]]) {
            return combination[0] + ',' + combination[1] + ',' + combination[2];
        }
    }

    return undefined;
};


let numberOfStones = function (fields) {
    return fields.reduce(function (sum, stone) {
        return sum + ((stone !== '') ? 1 : 0);
    }, 0);
};


let reducer = function (state, action, type) {
    switch (action.type) {
        case 'CLICK':
            return selectField(action, state);
        case 'RESET_GAME':
            return _.merge(initial_state, {
                shouldShowWinnerBar: state.shouldShowWinnerBar
            });
        case 'SETTINGS_UPDATED':
            return settingsUpdated(action, state);
        default:
            return state;
    }
};

export {
    reducer
}
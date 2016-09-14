let actions = {
    click (fieldId) {
        return {
            type: 'CLICK',
            id: fieldId
        }
    },

    resetGame () {
        return {
            type: 'RESET_GAME'
        }
    },

    settingsUpdated (data) {
        return {
            type: 'SETTINGS_UPDATED',
            data: data
        }
    }
}

export default actions;
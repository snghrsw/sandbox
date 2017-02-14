export const changeNewValue = (newValue) => {
    console.log("Action: changeNewValue", newValue);
    return {
        type: 'CHANGE_NEW_VALUE',
        newValue: newValue
    }
}

export const setState = (state) => {
    console.log("Action: setState", state);
    return {
        type: 'SET_STATE',
        state: state
    }
}

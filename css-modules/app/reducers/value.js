const helloWorldLabel = (state = 'current value', action = {type:'', newValue:''}) => {
    console.log("Reduce: helloWorldLabel", {state, action});
    switch (action.type) {
        case 'CHANGE_NEW_VALUE':
            return action.newValue;
        default:
            return state
    }
}

export default helloWorldLabel;
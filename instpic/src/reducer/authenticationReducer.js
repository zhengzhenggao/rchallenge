const authenticationReducer = (state = {
    signed: false,
    token: undefined,
    username: undefined
}, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, 
                signed: true, 
                token: action.payload.token,
                username: action.payload.username
            };
        case "LOGOUT":
            return {...state, 
                signed: false,
                token: undefined,
                username: undefined
            }
        default:    // Default
            return {...state};
    }
}


export default authenticationReducer;
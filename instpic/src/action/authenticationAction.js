export const loginAction = (loginData) => {
    return {
        type: "LOGIN",
        payload: loginData
    };
}

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    };
}
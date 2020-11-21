import {createContext} from "react";

const noop = ()=>{}

export const AuthContext = createContext({
    token: null,
    role: false,
    login: noop,
    logout: noop,
    isAuthenticated: false
})
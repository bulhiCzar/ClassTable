import {createContext} from "react";

const noop = ()=>{}

export const AuthContext = createContext({
    token: null,
    role: false,
    name: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})
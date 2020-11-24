import {createContext} from "react";

const noop = ()=>{}

export const DataContext = createContext({
    lessons: null,
    students: null,
    teacher: null,
})
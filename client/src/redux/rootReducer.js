import {combineReducers} from "redux";
import {lessonsReducer} from "./reducers/lessonsReducer";

export const rootReducer = combineReducers({
    lessons: lessonsReducer
})
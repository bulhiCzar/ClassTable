import {ADD_LESSON} from "./types";

export const addLesson = (post)=>{
    return {
        type: ADD_LESSON,
        payload: post
    }
}
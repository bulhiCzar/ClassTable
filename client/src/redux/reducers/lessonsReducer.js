import {ADD_LESSON} from "../types";

const initialState = {
    lessons: []
}

export const lessonsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case ADD_LESSON:
            return { ...state, lessons: state.lessons.concat([action.payload]) }
        default: return state
    }
}
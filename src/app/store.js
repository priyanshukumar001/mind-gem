import { createStore } from 'redux';

// Define initial state
const initialState = {
    mood: 'Happy', // Default mood
};

// Define a reducer
const moodReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOOD':
            return {
                ...state,
                mood: action.payload,
            };
        default:
            return state;
    }
};

// Create the Redux store
const store = createStore(moodReducer);

export default store;

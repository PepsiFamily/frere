import { 
    RECEIVE_CURRENT_USER,
    RECEIVE_SESSION_ERRORS
 } from '../actions/session_actions.js';

export const sessionErrorsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    // const newState = Object.assign([], oldState);

    switch (action.type) {
        // was originally supposed to clear my errors
        // instead, a blank array was passed as the payload
        // if clearSessionErrors action was called

        // case RECEIVE_CURRENT_USER:
        //     return {};
        
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        default:
            return oldState;
    }
};

export default sessionErrorsReducer;
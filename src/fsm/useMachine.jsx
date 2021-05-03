import {useReducer} from "react";

export const buildMachineReducer = (spec) => (currentState, event) => {
    //  get all possible transitions for the current State
    const stateTransitions = spec.states[currentState];

    // check transition exists
    if (stateTransitions === undefined) {
        throw new Error(`No transitions defined for ${currentState}`);
    }
    // next stage
    const nextState = stateTransitions[event];

    if (nextState === undefined) {
        throw new Error(
            `Unknown transition for event ${event} in state ${currentState}`
        );
    }
    return nextState;
};

export const useStateMachine = (spec) => {
    return useReducer(buildMachineReducer(spec), spec.initialState);
};

export const loginMachine = {
    initialState: "disconnected",
    states: {
        disconnected: {
            CONNECT: "connecting",
        },
        connecting: {
            CONNECTION_SUCCESS: "connected",
            CONNECTION_ERROR: "error",
        },
        connected: {
            DISCONNECT: "disconnected",
        },
        error: {
            CONNECT: "connecting",
        },
    },
};

import {buildMachineReducer} from "./useMachine";

export const stateMachine = {
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

const runMachine = (state, event) =>
    buildMachineReducer(stateMachine)(state, event);

describe("connectionMachine spec", () => {
    it("starts disconnected", () => {
        expect(stateMachine.initialState).toBe("disconnected");
    });

    describe("when disconnected", () => {
        it("can connect", () => {
            expect(runMachine("disconnected", "CONNECT")).toBe("connecting");
        });
    });

    describe("when connecting", () => {
        it("can connect", () => {
            expect(runMachine("connecting", "CONNECTION_SUCCESS")).toBe("connected");
        });
    });

    describe("when connected", () => {
        it("can disconnect", () => {
            expect(runMachine("connected", "DISCONNECT")).toBe("disconnected");
        });
    });
});

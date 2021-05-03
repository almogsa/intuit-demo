import React, {useContext, useEffect} from "react";
import {useStateMachine} from "../../fsm/useMachine";
import SocialPlayer from "../SocialPlayer/SocialPlayer";
import './Login.scss'
import {SocketContext} from "../../socketContext";
import {loginMachine} from "./LoginMachineState";


const Disconnected = (props) => (
    <div className="login-container  ">
        <div className=" overlay overlay-panel overlay-right">
            <h1>Welcome to Social Music Player!</h1>
            <p>Connect to stream and start your journey with us</p>
            {props.loading ? <button className="loading"></button> :
                <button onClick={props.onConnect} className="connect">Connect</button>}
            {props.error ? <div className="error-message">Oops something went wrong, try again</div> : ''}
        </div>
    </div>
);

const Login =  () => {
    const [currentState, sendEvent] = useStateMachine(loginMachine);
    const socket = useContext(SocketContext);
    const onConnect = () => {
        sendEvent('CONNECT');
    }

    const onDisconnect = () => {
        sendEvent("DISCONNECT")
        socket.disconnect();
    }

    useEffect(() => {
        if (currentState === "connecting") {
            if (socket.disconnected) {
                socket.open();
            }
            socket.emit('login');
        }
        const connectHandler = () => {
            if (currentState === "disconnected") {
                sendEvent('CONNECT');
            }
        }
        const errorHandler = (error) => {
            if (currentState === "connecting") {
                sendEvent('CONNECTION_ERROR');
            }
        }
        const disconnectHandler = () => {
            socket.disconnect();
        }
        const initHandler = () => {
            if (currentState === "connecting") {
                setTimeout(_ => {
                    sendEvent('CONNECTION_SUCCESS');
                }, 3000)

            }
        }
        socket.on('connect', connectHandler);
        socket.on('connect_error', errorHandler);
        socket.on('disconnect', disconnectHandler);
        socket.on('ready', initHandler);


        return () => {
            // before the component is destroyed unbind all event handlers used in this component
            socket.off('connect', connectHandler);
            socket.off('connect_error', errorHandler);
            socket.off('disconnect', errorHandler);
            socket.off("ready", initHandler);

        };
    }, [currentState, sendEvent, socket]);

    switch (currentState) {
        case "disconnected":
            return <Disconnected onConnect={onConnect}/>;
        case "connecting":
            return <Disconnected loading='true' onConnect={onConnect}/>;
        case "connected":
            return <div>
                <SocialPlayer onDisconnect={onDisconnect}/>
            </div>;
        case "error":
            return <Disconnected error='error occurred during connecting ' onConnect={onConnect}/>;
        default:
            throw new Error(`Don't know how to render state ${currentState}`);
    }
};
export default Login;

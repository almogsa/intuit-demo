import React from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

const SocketProvider = ({ children }) => {
   // const ENDPOINT = 'https://socket-chat-ak.herokuapp.com/';
    const ENDPOINT = "http://localhost:4000";
    const socket = io(ENDPOINT, { transports: ['websocket', 'polling'], reconnection: false, autoConnect: false })
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }

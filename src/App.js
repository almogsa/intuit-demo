import React from "react";
import './App.scss';
import Login from "./components/Login/Login";
import {SocketProvider} from "./socketContext";

function App() {
    return (
        <SocketProvider>
            <div className="App">
                <Login></Login>
            </div>
        </SocketProvider>
    );
}

export default App;

import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../socketContext";

const NEW_SONG_EVENT = "newSongEvent";
const HISTORY_PLAYLIST_EVENT = "historyPlaylistEvent";
const UPDATE_PLAYLIST_EVENT = "updatePlaylistEvent";
const GET_HISTORY_EVENT = "getHistoryEvent";


const usePlaylist = () => {
    const [playlist, setPlaylist] = useState([]);
    const socket = useContext(SocketContext);


    useEffect(() => {

        if (!playlist.length) {
            socket.emit(GET_HISTORY_EVENT);
        }
        const newSongHandler = (song) => {
            setPlaylist((playlist) => [...playlist, song]);
        }
        const historyHandler = (playlist) => {
            setPlaylist(() => playlist);
        }
        socket.on(NEW_SONG_EVENT, newSongHandler);
        socket.on(HISTORY_PLAYLIST_EVENT, historyHandler);
        socket.on(UPDATE_PLAYLIST_EVENT, historyHandler);

        return () => {
            socket.off(NEW_SONG_EVENT, newSongHandler);
            socket.off(HISTORY_PLAYLIST_EVENT, historyHandler);
            socket.off(UPDATE_PLAYLIST_EVENT, historyHandler)
            socket.disconnect();
        };
    }, []);

    const addSong = (song) => {
        socket.emit(NEW_SONG_EVENT, song);
    };
    const updatePlaylist = (song) => {
        socket.emit(UPDATE_PLAYLIST_EVENT, song);
    };
    const getCurrent = () => {
        return playlist[0] || '';
    };


    return {playlist, addSong, updatePlaylist, getCurrent};
};

export default usePlaylist;

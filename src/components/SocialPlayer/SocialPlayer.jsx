import React from "react";
import "./SocialPlayer.scss";
import AddSong from "../AddSong/AddSong";
import usePlaylist from "../Playlist/usePlaylist";
import Playlist from "../Playlist/Playlist";
import Player from "../Player/Player";


const SocialPlayer = (props) => {
    const {playlist, addSong, updatePlaylist, getCurrent} = usePlaylist();
    const Logout = () => (
        <div>
            <button className="logout" onClick={props.onDisconnect}>Disconnect</button>
        </div>
    );
    const Load = (props) => (
        <div>
            <button className="logout" onClick={props.onLoad}>Load</button>
        </div>
    );
    const handleAddSong = (url) => {
        const id = new Date().getTime().toString(); // unique number
        if (playlist.findIndex(item => item.url === url) > -1) {
            console.log('found duplicate song , will not be added to the list')
        } else {
            addSong({url, id});
        }
    };
    const handleSongEnded = (song) => {
        updatePlaylist(song);
    };
    const handleOnLoad = () => {
        let id = new Date().getTime().toString(); // unique number
        addSong({url: 'https://www.youtube.com/watch?v=sLPt028Iao8',id});
        id = new Date().getTime().toString(); // unique number
        setTimeout(_ => {
            id = new Date().getTime().toString(); // unique number
            addSong({url: 'https://www.youtube.com/watch?v=kiqEEr7CK2g',id});
            console.log(id);
        },800)
        setTimeout(_ => {
            id = new Date().getTime().toString(); // unique number
            addSong({url: 'https://www.youtube.com/watch?v=AzfZ7hLR17s',id});
            console.log(id);
        },1200)

     //   addSong({url: 'https://www.youtube.com/watch?v=kiqEEr7CK2g'}, id);
     //    id = new Date().getTime().toString(); // unique number
    //    addSong({url: 'https://www.youtube.com/watch?v=AzfZ7hLR17s'}, id);
    };


    return (
        <div className="app-container">
            <div className="songs-container">
                <AddSong onNewSong={handleAddSong}/>
                <Playlist playlist={playlist} onRemove={handleSongEnded}/>
            </div>
            <div data-testid="player-container" className="player-container">
                <Player song={getCurrent()} onSongEnded={handleSongEnded}/>
            </div>
            <Load onLoad={handleOnLoad}/>
            <Logout/>
        </div>
    );
};

export default SocialPlayer;

import React from "react";
import "./Playlist.scss"

function ListItem(props) {
    const song = props.song;
    const handleRemove = () => {
        props.onRemove(song);
    }
    return (
        <div className="song-container">
            <div data-testid="song-item" className="song-item">{song.url}</div>
            <button className="btn " onClick={handleRemove}>X</button>
        </div>

    );
}

function Playlist(props) {
    const playlist = props.playlist;
    const handleRemove = (song) => {
        props.onRemove(song);
    }
    const listItems = playlist.map((song, i) =>
        <ListItem key={i} onRemove={handleRemove}
                  song={song}/>
    );
    return (
        <div data-testid="song-list" className="song-list">
            {listItems}
        </div>
    );
}

export default Playlist;

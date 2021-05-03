import React, {useState} from "react";
import "./AddSong.scss"

function AddSong(props) {

    const [newSong, setNewSong] = useState('');
    const [error, setError] = useState('');
    const handleNewSongChange = (event) => {
        setError('');
        setNewSong(event.target.value);
    };

    function matchYoutubeUrl(url) {
        let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
            return url.match(p)[1];
        }
        return false;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (matchYoutubeUrl(newSong)) {
            props.onNewSong(newSong);
            setNewSong('');
        } else {
            setError('please insert a valid youtube video url');
        }

    };
    return (

        <div>
            <form onSubmit={handleSubmit} className="add-song-container">
                <input data-testid="song-url" className="add-song-input" type="text" placeholder={"Enter video id"} value={newSong}
                       onChange={handleNewSongChange}/>
                <div className="spacer"></div>
                <button className="add-song-button" data-testid="add-song" type="submit">Add Song</button>
            </form>
            {error.length > 0 &&
            <div className="error">
                {error}
            </div>
            }
        </div>
    );
}

export default AddSong;

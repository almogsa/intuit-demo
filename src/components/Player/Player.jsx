import ReactPlayer from "react-player";
import "./Player.scss"

function Player(props) {
    const song = props.song;
    const handleOnEnded = () => {
        props.onSongEnded(song);
    }
    return (
        <div style={{height: '100%'}}>
            {
                song.url ?
                    <ReactPlayer url={song.url}
                        //key={song.id} // support duplicate song url
                                 width='100%'
                                 height='100%'
                                 controls={false}
                                 playing={true}
                                 muted={false}
                                 onEnded={handleOnEnded}
                    />
                    : <div className="empty-playlist"> Please add some songs to playlist</div>
            }
        </div>
    );
}

export default Player;

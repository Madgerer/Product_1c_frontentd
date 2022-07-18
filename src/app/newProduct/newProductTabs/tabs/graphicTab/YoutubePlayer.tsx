import './YoutubePlayer.scss'

export default function YoutubePlayer(props: IYoutubePlayerProps) {
    return <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={props.url}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
}

interface IYoutubePlayerProps {
    url: string
}
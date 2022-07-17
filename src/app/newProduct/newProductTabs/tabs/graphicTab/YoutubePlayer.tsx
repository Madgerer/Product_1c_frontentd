import './YoutubePlayer.scss'

export default function YoutubePlayer(props: IYoutubePlayerProps) {
    return <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${props.url}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
}

interface IYoutubePlayerProps {
    url: string
}
import MediaCard from "./MediaCard"
import "./../styles/MediaContainer.css"
import LoadingAnimation from "./LoadingAnimation"

const MediaContainer = ({ medias }) => {

    return (
        <>
            {medias.length === 0
                ?
                <LoadingAnimation />
                :
                <div className="mediaCard_container">
                    {medias.map((media) => (
                        <MediaCard key={media.id} media={media} />
                    ))}
                </div>
            }
        </>
    )
}

export default MediaContainer

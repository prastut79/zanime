import "./../styles/MediaCard.css"
import { colorList } from "./../data/config"

import { useRef } from "react"
import { Link } from "react-router-dom"
import { getContrastYIQ } from "../data/useful"


const MediaCard = ({ media }) => {

    const imageRef = useRef()

    if (media === []) return



    const { title, coverImage, meanScore, averageScore } = media
    const color = coverImage.color || colorList.cyan

    const loaded = (e) => {
        imageRef.current.classList.add("set_visible")
    }


    return (

        <div className="mediaCard">
            <Link to={`/${media.type}/${media.id}`}>
                <div className="score" style={{ backgroundColor: color, color: getContrastYIQ(color) }}>{meanScore || averageScore || "na"}</div>
                <div className="coverImage_container" style={{ backgroundColor: color }}>
                    <img
                        ref={imageRef}
                        loading="lazy"
                        className="media__coverImage"
                        src={coverImage.extraLarge}
                        alt=""
                        style={{ borderBottom: `4px solid ${color}` }}
                        onLoad={loaded}
                    />
                </div>
                <h4 className="media__title" style={{ textTransform: "capitalize" }} >
                    {(title.english || title.userPreferred || title.romaji || title.native || "No Title Available").toLowerCase()}
                </h4>
            </Link>
        </div>
    )
}

export default MediaCard

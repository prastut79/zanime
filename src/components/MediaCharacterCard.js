import { Link } from "react-router-dom"
import "./../styles/MediaCharacterCard.css"

const MediaCharacterCard = ({ character, color }) => {
    console.log("character")
    return (

        <Link to="#" className="character_link">
            <div className="mediaCharacterCard" style={{ borderRight: `4px solid ${color}` }}>
                <img src={character.node.image.medium} alt="" className="character_image" />
                <div className="character_container" >
                    <div>
                        <h5>{character.node.name.full}</h5>
                        <p >{character.role}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MediaCharacterCard

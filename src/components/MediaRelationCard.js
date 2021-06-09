import { Link } from "react-router-dom"
import { colorList } from "../data/config"
import "./../styles/MediaRelationCard.css"

const MediaRelationCard = ({ relation }) => {
    console.log("relation")
    const title = relation.node.title.english || relation.node.title.romanji || relation.node.title.userPreferred
    return (
        <Link to={`/${relation.node.type}/${relation.node.id}`}>
            <div className="mediaRelationCard">
                <div style={{ background: `url(${relation.node.coverImage.large})`, backgroundSize: "cover", backgroundPosition: "center", borderBottom: `0.4vh solid ${relation.node.coverImage.color || colorList.cyan}` }} className="image" >
                    <div className="imageContent_container">
                        <p className="imageContent">{relation.relationType}</p>
                    </div>
                </div>
                <p className="relationcard_title">{title}</p>
            </div>
        </Link>
    )
}


export default MediaRelationCard

import "./../styles/HomeSection.css"
import { Link } from "react-router-dom"
import MediaContainer from "./MediaContainer"

const HomeSection = ({ title, medias, mediaType }) => {
    console.log("Home section: " + medias.length + " Title: " + title)

    return (
        <div className="homeSection">
            <Link to={`/browse/${title.replaceAll(' ', '-')}/${mediaType}`} className="container_title">
                {title.toUpperCase()}

                <span>View All</span>
                <hr />
            </Link>
            <MediaContainer medias={medias} />
        </div>
    )
}

export default HomeSection
import { useEffect, useState } from "react"
import MediaCharacterCard from "./MediaCharacterCard"
import "./../styles/MediaCharacters.css"

const MediaCharacters = ({ characters, color }) => {

    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        setShowAll(false);
        (characters.edges.length
            <=
            characters.edges.filter(character => character.role === "MAIN").length
        )
            &&
            setShowAll(true)
    }, [characters])

    function toggleShowAll() {
        setShowAll(true)
    }

    console.log("Characterssssss")

    return (
        <div className="mediaCharacters">
            <h3 className="block_header">Characters</h3>
            <div className="characterCard_container" >

                {characters.edges.map((character) => (
                    (showAll ? true : character.role === "MAIN") &&
                    <MediaCharacterCard character={character} color={color} key={character.id} />
                ))
                }

            </div>
            {
                !showAll &&
                <b>
                    <p
                        onClick={toggleShowAll}
                        className="show_more"
                        style={{ color: color }}
                    >Show All
                    </p>
                </b>
            }
        </div>
    )
}

export default MediaCharacters

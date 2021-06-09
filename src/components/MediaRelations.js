import MediaRelationCard from "./MediaRelationCard"
import "./../styles/MediaRelations.css"
import { useEffect, useState } from "react"

const MediaRelations = ({ relations, color }) => {

    const [showAll, setShowAll] = useState()

    useEffect(() => {
        setShowAll(false);

        (relations.edges.length
            <=
            relations.edges.filter(relation => ['PREQUEL', 'SEQUEL', 'SOURCE', 'ADAPTATION'].includes(relation.relationType)).length
        )
            &&
            setShowAll(true)
    }, [relations])

    function toggleShowAll() {
        setShowAll(true)
    }
    console.log("RElationsss")

    return (
        <div className="mediaRelations">
            <h3 className="block_header">Relations</h3>
            <div className="relationCard_container">
                {relations.edges.map((relation) => (
                    (showAll ? true :
                        ['PREQUEL', 'SEQUEL', 'SOURCE', 'ADAPTATION'].includes(relation.relationType))
                    &&
                    < MediaRelationCard relation={relation} key={relation.id} />
                ))}
            </div>
            {!showAll &&
                <p
                    onClick={toggleShowAll}
                    className="show_more"
                    style={{ color: color }}
                >Show All
                </p>
            }
        </div>
    )
}

export default MediaRelations

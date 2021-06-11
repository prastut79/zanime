import { useState, useEffect } from "react"
import { colorList } from "../data/config"

const ParagraphCrop = ({ text, maxCharacter = 500, style, className }) => {

    const [showAll, setShowAll] = useState()

    useEffect(() => {
        console.log("USEEFF")
        setShowAll(false);
        text.length <= maxCharacter && setShowAll(true)

    }, [text, maxCharacter])

    function toggleReadMore() {
        setShowAll(true)
    }

    console.log("ParaCrop")
    return (
        <>
            <p
                className={className}
                style={style}
                dangerouslySetInnerHTML={{ __html: showAll ? text : text.slice(0, maxCharacter) + "..." }}
            />{console.log("afterUSEEFF")}
            {!showAll &&
                <p onClick={toggleReadMore} className={className}
                    style={{
                        ...style,
                        fontWeight: 700,
                        cursor: "pointer",
                        color: `${colorList.cyan}`,
                        width: "100%",
                        textAlign: "center",
                        marginBottom: "3vh"
                    }}>Read More</p>
            }

        </>
    )
}

export default ParagraphCrop

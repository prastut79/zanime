import { useState } from "react"
import { colorList } from "../data/config"

const ParagraphCrop = ({ text, maxCharacter = 500, style, className }) => {

    const [showAll, setshowAll] = useState(text.length <= maxCharacter)


    function toggleReadMore() {
        setshowAll(true)
    }
    console.log("ParaCrop")
    return (
        <>
            <p
                className={className}
                style={style}
                dangerouslySetInnerHTML={{ __html: showAll ? text : text.slice(0, maxCharacter) + "..." }}
            />
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

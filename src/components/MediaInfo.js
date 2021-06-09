import { useEffect, useState } from "react"
import { unstable_batchedUpdates } from "react-dom"
import { useParams, Redirect } from "react-router-dom"
import "./../styles/MediaInfo.css"
import { getMediaById } from "./../anilist/Anilist"
import LoadingAnimation from "./LoadingAnimation"
import { colorList, pagePath } from "../data/config"
import { getRemainingDays } from "../data/useful"
import MediaRelations from "./MediaRelations"
import ParagraphCrop from "./ParagraphCrop"
import VideoEmbed from "./VideoEmbed"
import MediaCharacters from "./MediaCharacters"


const MediaInfo = () => {
    const { mediaType, id } = useParams()

    const [loading, setLoading] = useState(true)
    const [media, setMedia] = useState([])
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (!["anime", "manga"].includes(mediaType.toLowerCase())) {
            setNotFound(true)
            return
        }
        (async () => {
            const request = await getMediaById(id, mediaType.toUpperCase())
            if (request.status !== 200) {
                setNotFound(true)
                return
            }

            const data = await request.json()
            unstable_batchedUpdates(() => {
                setMedia(data.data.Media)
                setLoading(false)
            })
        })()
    }, [mediaType, id])

    if (notFound) {
        return (<Redirect to={pagePath.notFound} />)
    }

    let color, title, summary, airingTime;
    if (!loading) {
        color = media.coverImage.color || colorList.cyan
        title = (media.title.english || media.title.userPreferred || media.title.romaji || media.title.native || "No Title Available").toUpperCase()

        if (media.nextAiringEpisode && media.nextAiringEpisode.airingAt && media.nextAiringEpisode.episode) {
            const airingDate = getRemainingDays(media.nextAiringEpisode.airingAt)
            airingTime = `Epi ${media.nextAiringEpisode.episode}: ${airingDate.days ? airingDate.days + 'd ' : ""}${airingDate.hours ? airingDate.hours + 'h ' : ""}${airingDate.minutes ? airingDate.minutes + 'm' : ""}`
        }

        summary = [
            ["Format", media.format || '-'],
            (media.episodes && ["Episodes", media.episodes]),
            (media.volumes && ["Volumes", media.volumes]),
            (media.chapters && ["Chapters", media.chapters]),
            (media.duration && ["Duration", `${media.duration} mins`]),
            (media.startDate.year && ["Start Date", `${media.startDate.year}-${media.startDate.month || '?'}-${media.startDate.day || '?'}`]),
            (media.endDate.year && ["End Date", `${media.endDate.year}-${media.endDate.month || '?'}-${media.endDate.day || '?'}`]),
            (media.season && ["Season", `${media.season}${media.startDate.year && " " + media.startDate.year}`]),
            ((media.averageScore || media.meanScore) && ["Score", media.averageScore || media.meanScore]),
            (media.popularity && ["Popularity", media.popularity]),
            (media.favourites && ["Favourites", media.favourites]),
            (media.studios.nodes.length > 0 && ["Main Studio", media.studios.nodes[0].name || "-"]),
            (media.source && ["Source", media.source]),
            (media.title.native && ["Native", media.title.native]),
            (media.synonyms && ["Synonyms", <span dangerouslySetInnerHTML={{ __html: media.synonyms.join(",<br />") || title }} />])
        ]
    }


    return (
        <>
            { loading ? <LoadingAnimation /> :
                <>
                    <div className="banner" style={media.bannerImage ?
                        { backgroundImage: `url(${media.bannerImage}`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", backgroundPosition: "center" }
                        :
                        { backgroundColor: color }
                    } />
                    <div className="mediaInfo_container">
                        <div className="header_container">
                            <div className="left_container" >
                                <div className="cover_container">
                                    <img src={media.coverImage.extraLarge || media.coverImage.large} alt="" className="coverImage" />
                                    <h4 style={{ backgroundColor: color }}>{media.status.replaceAll("_", " ")}</h4>
                                </div>
                            </div>
                            <div className="media_details">
                                <a className="title"
                                    href={media.siteUrl}
                                    target="_blank" rel="noreferrer"
                                >{title}</a>

                                <ParagraphCrop text={media.description} className="description" />

                                <div className="genre_container">
                                    {media.genres.map((genre, i) => (
                                        <h5 className="genre" style={{ backgroundColor: color }} key={i}>{genre}</h5>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mediaBody_container">

                        <div className="sidebar">
                            <div className="sidebar_content">
                                <h3 className="block_header">Summary</h3>
                                <div className="sidebar_data_container">
                                    {airingTime && <BodySummary title="Airing" value={airingTime} valueStyle={{ color: colorList.cyan, opacity: "0.8" }} />}
                                    {summary.map((media, i) => (
                                        media && <BodySummary title={media[0]} value={media[1]} key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mediaBody_right">
                            <div className="mediaBody_content" >
                                {media.characters.edges.length > 0 &&
                                    <MediaCharacters characters={media.characters} color={color} />
                                }
                                {media.relations.edges.length > 0 &&
                                    <MediaRelations relations={media.relations} color={color} />
                                }
                                {media.trailer && <>
                                    <h3 className="block_header">Trailer</h3>
                                    <VideoEmbed id={media.trailer.id} /></>}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

const BodySummary = ({ title, value, titleStyle, valueStyle }) => {
    return (
        <div className="sidebar_data">
            <h5 className="sidebar_title" style={titleStyle}>{title}</h5>
            <h6 className="sidebar_value" style={valueStyle}>{value}</h6>
        </div>
    )
}


export default MediaInfo

import { useEffect, useState } from "react"
import { unstable_batchedUpdates } from "react-dom"
import { useParams, Redirect } from "react-router-dom"
import "./../styles/MediaInfo.css"
import { getAnimeById } from "./../anilist/Anilist"
import LoadingAnimation from "./LoadingAnimation"
import { colorList, pagePath } from "../data/config"
import { getRemainingDays } from "../data/useful"


const MediaInfo = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [media, setMedia] = useState([])
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        (async () => {
            const request = await getAnimeById(id)

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
    }, [id])

    if (notFound) {
        return (<Redirect to={pagePath.notFound} />)
    }

    let color, title, summary, airingTime;
    if (!loading) {
        color = media.coverImage.color || colorList.cyan
        title = (media.title.english || media.title.userPreferred || media.title.romaji || media.title.native || "No Title Available").toUpperCase()

        if (media.nextAiringEpisode && media.nextAiringEpisode.airingAt && media.nextAiringEpisode.episode) {
            const airingDate = getRemainingDays(media.nextAiringEpisode.airingAt)
            airingTime = `Epi ${media.nextAiringEpisode.episode}: ${airingDate.days !== 0 && airingDate.days + 'd '}${airingDate.hours !== 0 && airingDate.hours + 'h '}${airingDate.minutes !== 0 && airingDate.minutes + 'm'}`
        }

        summary = [
            ["Format", media.format || '-'],
            (media.episodes && ["Episodes", media.episodes]),
            (media.startDate.year && ["Start Date", `${media.startDate.year}-${media.startDate.month || '?'}-${media.startDate.day || '?'}`]),
            (media.endDate.year && ["End Date", `${media.endDate.year}-${media.endDate.month || '?'}-${media.endDate.day || '?'}`]),
            (media.season && ["Season", `${media.season}${media.startDate.year && " " + media.startDate.year}`]),
            ((media.averageScore || media.meanScore) && ["Score", media.averageScore || media.meanScore]),
            (media.popularity && ["Popularity", media.popularity]),
            (media.favourites && ["Favourites", media.favourites]),
            (media.studios && media.studios.nodes && ["Main Studio", media.studios.nodes[0].name || "-"]),
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
                        { background: `url(${media.bannerImage}`, backgroundSize: "cover", backgroundPosition: "center" }
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
                                    href={`https://www.anilist.co/${media.type.toLowerCase()}/${media.id}`}
                                    target="_blank" rel="noreferrer"
                                >{title}</a>

                                <p className="description" dangerouslySetInnerHTML={{ __html: media.description }} />
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
                            <h3 className="block_header">Summary</h3>
                            <div className="sidebar_data_container">
                                {airingTime && <BodySummary title="Airing" value={airingTime} />}
                                {summary.map((media, i) => (
                                    media && <BodySummary title={media[0]} value={media[1]} key={i} />
                                ))}
                            </div>
                        </div>
                        <div className="mediaBody_right">
                            <h3 className="block_header">Relations</h3>

                        </div>
                    </div>

                </>
            }
        </>
    )
}

const BodySummary = ({ title, value }) => {
    return (
        <div className="sidebar_data">
            <h5 className="sidebar_title">{title}</h5>
            <h6 className="sidebar_value">{value}</h6>
        </div>
    )
}


export default MediaInfo

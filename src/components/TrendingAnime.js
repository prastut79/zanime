import { useEffect, useState } from "react"
import { getTrending, getUpcomingSeason } from "./../anilist/Anilist"
import MediaContainer from "./MediaContainer"
import { colorList } from "./../data/config"
import LoadingAnimation from "./LoadingAnimation"
import { unstable_batchedUpdates } from "react-dom"
import "./../styles/MediaList.css"
const TrendingAnime = () => {

    const [medias, setMedias] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {

        (async () => {
            const request = await getTrending("anime", page, 30)
            unstable_batchedUpdates(() => {
                setMedias(medias => {
                    return ([...medias, ...request.data.Page.media].filter((value, index, array) => array.findIndex(arr => (arr.id === value.id)) === index))
                })
                setHasMore(request.data.Page.pageInfo.hasNextPage)
                setLoading(false)
            })
        })()
    }, [page])

    const handleOnClick = () => {
        if (hasMore) {
            setLoading(true)
            setPage(page => { return page + 1 })
        }
    }

    return (
        <div className="mediaList">
            <h1 style={{ marginBottom: "7vh", color: colorList.cyan }}>Trending Now</h1>
            <MediaContainer medias={medias} />
            {loading && <LoadingAnimation />}
            {hasMore
                ?
                <button onClick={handleOnClick} >Load More</button>
                :
                <h1>No More Results</h1>
            }
        </div>
    )
}

export default TrendingAnime

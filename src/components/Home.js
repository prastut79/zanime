import "./../styles/Home.css"
import { useEffect, useState, useRef } from "react"
import { getTrending, getPopularNow, getUpcomingSeason, getPopularManhwa } from "./../anilist/Anilist.js"
import HomeSection from "./HomeSection"
import { pageTitle } from "./../data/config"
import { unstable_batchedUpdates } from "react-dom"
import LoadingAnimation from "./LoadingAnimation"

const Home = () => {

    console.log("Home Rendered")
    const [mediaType, setMediaType] = useState("Anime")

    const [trendingAnime, setTrendingAnime] = useState([]);
    const [trendingManga, setTrendingManga] = useState([]);
    const [popularNowAnime, setPopularNowAnime] = useState([]);

    const [popularNowManga, setPopularNowManga] = useState([]);
    const [popularManhwa, setPopularManhwa] = useState([]);
    const [upcomingSeasonAnime, setUpcomingSeasonAnime] = useState([]);

    const [loading, setLoading] = useState(true)

    const viewAnimeButton = useRef()
    const viewMangaButton = useRef()

    useEffect(() => {

        async function getData() {
            const trendingRequest = await getTrending(mediaType, 1, 5);
            const popularNowRequest = await getPopularNow(mediaType, 1, 5);

            if (mediaType === "Anime") {
                const upcomingSeasonRequest = await getUpcomingSeason(mediaType, 1, 5);
                unstable_batchedUpdates(() => {
                    setTrendingAnime(trendingRequest.data.Page.media)
                    setPopularNowAnime(popularNowRequest.data.Page.media)
                    setUpcomingSeasonAnime(upcomingSeasonRequest.data.Page.media);
                })
            } else {
                const popularManhwaRequest = await getPopularManhwa(mediaType, 1, 5)
                unstable_batchedUpdates(() => {
                    setTrendingManga(trendingRequest.data.Page.media)
                    setPopularNowManga(popularNowRequest.data.Page.media)
                    setPopularManhwa(popularManhwaRequest.data.Page.media)
                })
            }
            setLoading(false)
        }
        getData()
    }, [mediaType])

    const handleAnimeClick = (e) => {
        if (mediaType !== "Anime") {
            setMediaType("Anime")
            viewAnimeButton.current.classList.add('media_button_active')
            viewMangaButton.current.classList.remove('media_button_active')
            setButtonInactive()
        }
    }

    const handleMangaClick = (e) => {
        if (mediaType !== "Manga") {
            setMediaType("Manga")
            viewMangaButton.current.classList.add('media_button_active')
            viewAnimeButton.current.classList.remove('media_button_active')
            setButtonInactive()
        }
    }

    //Setting both anime and manga button to Inactive after click of either
    const setButtonInactive = () => {
        viewAnimeButton.current.disabled = true
        viewMangaButton.current.disabled = true
        setTimeout(() => {
            try {
                viewAnimeButton.current.disabled = false
                viewMangaButton.current.disabled = false
            } catch (e) {
                if (!e instanceof TypeError) {
                    console.log("Error" + e)
                }
            }
        }, 3000)
    }

    return (
        <div className="home">
            <div className="home_button_container">
                <button ref={viewAnimeButton} onClick={handleAnimeClick} className="media_button media_button_active">Anime</button>
                <button ref={viewMangaButton} onClick={handleMangaClick} className="media_button">Manga</button>
            </div>


            { loading
                ?
                <LoadingAnimation />
                :
                (mediaType === "Anime"
                    ?
                    <>
                        <HomeSection title={pageTitle.trendingNow} medias={trendingAnime} mediaType={mediaType} />
                        <HomeSection title={pageTitle.currentlyAiring} medias={popularNowAnime} mediaType={mediaType} />
                        <HomeSection title={pageTitle.upcomingSeason} medias={upcomingSeasonAnime} mediaType={mediaType} />
                    </>
                    :
                    <>
                        <HomeSection title={pageTitle.popularManhwa} medias={popularManhwa} mediaType={mediaType} />
                        <HomeSection title={pageTitle.popularManga} medias={popularNowManga} mediaType={mediaType} />
                        <HomeSection title={pageTitle.trendingNow} medias={trendingManga} mediaType={mediaType} />
                    </>
                )}
        </div >
    )
}

export default Home

const URL = 'https://graphql.anilist.co'

const pageTitle = {
    view: "browse",
    trendingNow: "Trending Now",
    currentlyAiring: "Popular This Season",
    highestRated: "Higest Rated",
    upcomingSeason: "Upcoming Next Season",
    popularManga: "All Time Popular",
    popularManhwa: "Popular Manhwa"
}

const pagePath = {
    animeTrending: `/${pageTitle.view}/${pageTitle.trendingNow.replaceAll(' ', '-')}/anime`,
    home: "/home",
    currentlyAiring: `/${pageTitle.view}/${pageTitle.currentlyAiring.replaceAll(' ', '-')}/anime`,

    popularManga: `/${pageTitle.view}/${pageTitle.popularManga}/manga`,
    popularManhwa: `/${pageTitle.view}/${pageTitle.popularManhwa}/manga`,

    notFound: '/404'
}

const colorList = {
    headerBg: "#292929",
    clearHeaderBg: "rgba(41,41,41,0.3)",
    white: "#fff",
    bodyBg: "#555",
    cyan: "#0CD4C7",

}

export { URL, pageTitle, pagePath, colorList }
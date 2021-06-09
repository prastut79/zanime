const URL = 'https://graphql.anilist.co'

async function getMediaById(id, mediaType) {
    const query = `
        query($id: Int!) {
            Media(id: $id, type: ${mediaType}) {
                id
                idMal
                title {
                    romaji
                    english
                    native
                }
                type
                format
                status
                description
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                season
                seasonYear
                seasonInt
                episodes
                duration
                chapters
                volumes
                countryOfOrigin
                isLicensed
                source
                hashtag
                trailer {
                    id
                    site
                    thumbnail
                }
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
                bannerImage
                genres
                synonyms
                averageScore
                meanScore
                popularity
                isLocked
                trending
                favourites
                rankings {
                    rank
                    type
                    allTime
                    context
                }
                characters(sort: ROLE) {
                    edges {
                        id
                        node {
                            id
                            name {
                                full
                            }
                            image {
                                medium
                            }
                        }
                        role
                    }
                }
                studios(isMain: true) {
                    nodes {
                        name
                    }
                }
                relations {
                    edges {
                        id
                        relationType(version: 2)
                        node {
                            id
                            title {
                                romaji
                                english
                                userPreferred
                            }
                            coverImage {
                                large
                                color
                            }
                            status
                            format
                            type
                        }
                    }
                }
                nextAiringEpisode {
                    airingAt
                    episode
                }
                siteUrl
            }
        } `

    const response = await fetch(URL, getOptions(getVariableId(id), query))
    // const data = await response.json()

    return (response)
}

async function getTrending(mediaType, page, perPage) {
    const query = `
        query($page: Int, $perPage: Int){
            Page(page: $page, perPage: $perPage){
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media(type: ${mediaType.toUpperCase()}, sort: TRENDING_DESC, genre_not_in: "HENTAI") {
                    id
                    averageScore
                    type
                    meanScore
                    title {
                        romaji
                        english
                        userPreferred
                        native
                    }
                    coverImage {
                        extraLarge
                        color
                    }

                }
            }
} `

    const response = await fetch(URL, getOptions(getVariablePage(page, perPage), query))
    const data = await response.json()

    return (data)
}


async function getPopularNow(mediaType, page, perPage) {
    const query = `
        query($page: Int, $perPage: Int){
            Page(page: $page, perPage: $perPage){
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media(type: ${mediaType.toUpperCase()}, sort: POPULARITY_DESC ${mediaType.toLowerCase() === "anime" ? ", status: RELEASING" : ""}, genre_not_in: "HENTAI") {
                    id
                    averageScore
                    meanScore
                    type
                    title {
                        romaji
                        english
                        userPreferred
                        native
                    }
                    coverImage {
                        extraLarge
                        color
                    }
                }
            }
} `

    const response = await fetch(URL, getOptions(getVariablePage(page, perPage), query))
    const data = await response.json()

    return (data)
}
async function getUpcomingSeason(mediaType, page, perPage) {
    const query = `
query($page: Int, $perPage: Int){
    Page(page: $page, perPage: $perPage){
        pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
        }
        media(type: ${mediaType.toUpperCase()}, sort: POPULARITY_DESC, status: NOT_YET_RELEASED, season: ${getSeason()}, genre_not_in: "HENTAI") {
            id
            averageScore
            type
            meanScore
            title {
                romaji
                english
                userPreferred
                native
            }
            coverImage {
                extraLarge
                color
            }
        }
    }
} `

    const response = await fetch(URL, getOptions(getVariablePage(page, perPage), query))
    const data = await response.json()

    return (data)
}
async function getPopularManhwa(mediaType, page, perPage) {
    console.log("MANWa api call")
    const query = `
query($page: Int, $perPage: Int){
    Page(page: $page, perPage: $perPage){
        pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
        }
        media(type: ${mediaType.toUpperCase()}, sort: POPULARITY_DESC, countryOfOrigin: KR) {
            id
            averageScore
            meanScore
            type
            title {
                romaji
                english
                userPreferred
                native
            }
            coverImage {
                extraLarge
                color
            }
        }
    }
} `

    const response = await fetch(URL, getOptions(getVariablePage(page, perPage), query))
    const data = await response.json()

    return (data)
}

function getVariablePage(page, perPage) {
    return {
        "page": page,
        "perPage": perPage
    }
}
function getVariableId(id) {
    return {
        "id": id
    }
}
function getOptions(variables, query) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            'query': query,
            'variables': variables
        })
    }

    return options
}

function getSeason() {
    const date = new Date()
    const month = date.getMonth()
    if ([11, 0, 1].includes(month)) {
        return "WINTER"
    } else if ([2, 3, 4].includes(month)) {
        return "SPRING"

    } else if ([5, 6, 7].includes(month)) {
        return "SUMMER"
    } else {
        return "FALL"
    }
}
export { getMediaById, getTrending, getPopularNow, getUpcomingSeason, getPopularManhwa }
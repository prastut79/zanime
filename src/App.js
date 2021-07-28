import "./App.css"
import Header from "./components/Header"
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom"
import { pagePath } from "./data/config"
import Home from "./components/Home"
import TrendingAnime from "./components/TrendingAnime"
import MediaInfo from "./components/MediaInfo"

const App = () => {

    return (
        <div id="App">
            <Router>
                <Header />
                <div className="content_container">
                    <Switch>
                        <Route exact path="/">
                            <Redirect to={pagePath.home} />
                        </Route>
                        <Route exact path={pagePath.home}>
                            <Home />
                        </Route>
                        <Route exact path={pagePath.animeTrending}>
                            <TrendingAnime />
                        </Route>
                        <Route exact path="/:mediaType/:id">
                            <MediaInfo />
                        </Route>
                        <Route>
                            <Redirect to="/404" />
                            <h1>Page Not Found</h1>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div >
    )
}

export default App

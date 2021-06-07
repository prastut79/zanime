import "./../styles/Header.css";
import { NavLink, Link } from "react-router-dom"
import { pagePath } from "./../data/config"

const Header = () => {
    return (
        <div id="header">

            <div className="header_title_container">
                <Link to={pagePath.home} style={{ display: "flex" }}>
                    <h2 style={{ color: "#0CD4C7", fontSize: "40px" }}>Z</h2>
                    <h2>anime</h2>
                </Link>
            </div>

            <div className="header_button_container">
                <NavLink to={pagePath.home} className="navLink" activeClassName="header_button_active">
                    Home
                </NavLink>
                <NavLink to={pagePath.animeTrending} className="navLink" activeClassName="header_button_active">
                    Trending
                </NavLink>
                <NavLink to={pagePath.currentlyAiring} className="navLink" activeClassName="header_button_active">
                    Seasonal
                </NavLink>
            </div>
        </div>
    );
};

export default Header;

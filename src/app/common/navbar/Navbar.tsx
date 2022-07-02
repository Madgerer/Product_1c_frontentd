import LanguageSelector from "./LanguageSelector";
import './navbar.scss'

function Navbar() {

    return <div className={"row"}>
        <div className={"item col-md-12 navbar-container"}>
            <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                {/*todo: add href*/}
                <a className={"navbar-brand"}>
                    <img src={"/images/avtodelo.png"} className={".navbar_logo_image d-inline-block align-top"}/>
                </a>
                <div className={"collapse navbar-collapse"}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link">Товары </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link">Категории</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link">Дерево</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link">Переводы</a>
                        </li>
                    </ul>
                    <form className="form-inline">
                        <LanguageSelector/>
                        <div className="form-group navbar-logout-button">
                            <button type="button" title="Выйти из системы" id="logOut"
                                    className="btn btn-danger btn-sm"><i className="fa fa-sign-out"
                                                                         aria-hidden="true"></i></button>
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    </div>
}

export default Navbar;
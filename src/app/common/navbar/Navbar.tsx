import LanguageSelector from "./LanguageSelector";
import './navbar.scss'
import {Link} from "react-router-dom";
import {} from "react-router-dom";
import {useLocation} from "react-router";
import {useDispatch} from "react-redux";
import {actions} from "../../../redux/reducers/auth";

function Navbar() {
    const history = useLocation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(actions.clearCredentials())
    }

    return <div className={"navbar-wrapper"}>
        <div className={"item col-md-12 navbar-container"}>
            <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                <a className={"navbar-brand"}>
                    <img src={"/images/avtodelo.png"} className={".navbar_logo_image d-inline-block align-top"}/>
                </a>
                <div className={"collapse navbar-collapse"}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/products" className="nav-link">Товары</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/categories" className="nav-link">Категории</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={"/tree"} className="nav-link">Дерево</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={"/translate"} className="nav-link">Переводы</Link>
                        </li>
                        {
                            history.pathname == "/products"
                                ?
                                    <Link to={"/new-product"} target="_blank" className="nav-button-new-card">Новая карточка</Link>

                                : <></>
                        }
                    </ul>
                    <form className="form-inline">
                        <LanguageSelector/>
                        <div className="form-group navbar-logout-button">
                            <button type="button" title="Выйти из системы" id="logOut" className="btn btn-danger btn-sm" onClick={() => logout()}>
                                <i className="fa fa-sign-out" aria-hidden="true"/>
                            </button>
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    </div>
}

export default Navbar;
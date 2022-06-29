import {useState} from "react";

interface INavbarState {
    languages: string[]
}

const INITIAL_STATE: INavbarState = {
    languages: ["Английский", "Русский"]
}

function Navbar() {
    const [state, setState] = useState<INavbarState>({...INITIAL_STATE})

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
                        <div className="form-group input-group-sm navbar-select-container">
                            <select className="form-control navbar-select" id="langSelect">
                                <option value="1">Английский</option>
                                <option value="2">Немецкий</option>
                                <option value="3">Польский</option>
                                <option value="4">Латышский</option>
                                <option value="5">Чешский</option>
                                <option value="6">Венгерский</option>
                                <option value="7">Румынский</option>
                                <option value="8">Французский</option>
                                <option value="9">Итальянский</option>
                                <option value="10">Испанский</option>
                                <option value="11" selected={true}>Русский</option>
                                <option value="12">Литовский</option>
                                <option value="13">Эстонский</option>
                                <option value="14">Украинский</option>
                                <option value="15">Болгарский</option>
                            </select>
                        </div>
                     {/*   <div className="form-group" style="margin-left:10px">
                            <button type="button" title="Выйти из системы" id="logOut"
                                    className="btn btn-danger btn-sm"><i className="fa fa-sign-out"
                                                                         aria-hidden="true"></i></button>
                        </div>*/}
                    </form>
                </div>
            </nav>
        </div>
    </div>
}

export default Navbar;
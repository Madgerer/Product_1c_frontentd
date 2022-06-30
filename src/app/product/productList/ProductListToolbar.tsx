import PriceGroupSelector from "../../priceGroupSelector/PriceGroupSelector";
import "./productListToolbar.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, ProductListComponentState} from "../../../redux/reducers/local/productComponent/productList";

function ProductListToolbar() {

    const dispatch = useDispatch();

    const setFilter = (filter: string) => {
        dispatch(actions.setFilter(filter));
    }

    return  <div className="product-left-column-toolbar">
        <form className="form-inline">
            <div className={"product-left-column-selector-container"}>
                <PriceGroupSelector/>
            </div>
            <div className="product-left-column-add-button">
                <button id="addButton" title="Добавить выделенный товар в выделенную карточку" type="button"
                        className="btn btn-dark"><i className="fa fa-plus" aria-hidden="true"></i></button>
            </div>
            <div className="ml-auto product-left-column-search">
                <input type="search" className="form-control" placeholder="Search" onChange={e => setFilter(e.target.value)}/>
            </div>
        </form>
    </div>
}

export default ProductListToolbar;
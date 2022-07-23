import PriceGroupSelector from "../../common/priceGroupSelector/PriceGroupSelector";
import "./productListToolbar.scss"
import {useDispatch, useSelector} from "react-redux";
import {actions, ProductListComponentState} from "../../../redux/reducers/local/productComponent/productList";
import {AppState} from "../../../redux/reducers";
import {ProductGroupListComponentState} from "../../../redux/reducers/local/productComponent/productGroupList";
import {addProductToGroupAsyncThunk} from "../../../redux/reducers/local/productComponent/productList/thunks";
import {useDebouncedCallback} from "use-debounce";

function ProductListToolbar() {

    const groupsState = useSelector<AppState, ProductGroupListComponentState>(x => x.local.productGroupListComponent);
    const productState = useSelector<AppState, ProductListComponentState>(x => x.local.productListComponent);
    const dispatch = useDispatch();

    const debouncedFilter = useDebouncedCallback(args => dispatch(actions.setFilter(args)), 300)

    const addProductsToGroup = () => {
        const products = productState.selectedProducts.map(x => x.id);
        if(products.length === 0) {
            alert('Выберите продукты для перемещения в карточку')
            return
        }
        const group = groupsState.selectedProductGroup
        if(group === null) {
            alert('Выберите карточку для перемещения продуктов')
            return;
        }

        dispatch(addProductToGroupAsyncThunk({productGroupId: group.id, productIds: products}))
    }

    return  <div className="product-left-column-toolbar">
        <form className="form-inline">
            <div className={"product-left-column-selector-container"}>
                <PriceGroupSelector/>
            </div>
            <div className="product-left-column-add-button">
                <button onClick={() => addProductsToGroup()}
                        title="Добавить выделенный товар в выделенную карточку"
                        type="button"
                        className="btn btn-dark"><i className="fa fa-plus" aria-hidden="true"/>
                </button>
            </div>
            <div className="ml-auto product-left-column-search">
                <input type="search"
                       className="form-control"
                       placeholder="Search"
                       onChange={e => debouncedFilter(e.target.value)}/>
            </div>
        </form>
    </div>
}

export default ProductListToolbar;
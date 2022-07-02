import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, ProductGroupListComponentState} from "../../../redux/reducers/local/productComponent/productGroupList";
import SimpleSelect from "../../common/SimpleSelect";
import "./ProductGroupListToolbar.scss"

function ProductGroupListToolbar() {
    const local = useSelector<AppState, ProductGroupListComponentState>(x => x.local.productGroupListComponent);
    const dispatch = useDispatch();

    const changeSelected = (id: number) => {
        dispatch(actions.setSelectedCardType(id));
    }

    const setFilter = (filter: string) => {
        dispatch(actions.setFilter(filter));
    }

    return <div id="groupTableToolBar" className="product-right-column-toolbar">
        <form className="form-inline">
            <div className="product-right-column-select">
                <SimpleSelect
                    value={local.selectedCardType}
                    options={local.cardTypes}
                    onChange={e => changeSelected(e)}
                    toOption={opt => opt}
                    className={null}/>
            </div>
            <div className="product-right-column-refresh-button">
                <button id="refreshImages"
                        title="Обновить изображения к карточкам"
                        type="button"
                        className="btn btn-dark">Обновить изображения
                </button>
            </div>
            <div className="ml-auto product-right-column-search">
                <input type="text"
                       className="form-control"
                       placeholder="Search"
                       onChange={e => setFilter(e.currentTarget.value)}
                />
            </div>
        </form>
    </div>
}

export default ProductGroupListToolbar
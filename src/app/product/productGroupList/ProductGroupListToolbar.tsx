import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, ProductGroupListComponentState} from "../../../redux/reducers/local/productComponent/productGroupList";
import SimpleSelect from "../../common/basic/selectors/SimpleSelect";
import "./ProductGroupListToolbar.scss"
import {useDebouncedCallback} from "use-debounce";
import {getProductGroupsIdentityThunk} from "../../../redux/reducers/local/productComponent/productGroupList/thunk";
import {PriceGroupState} from "../../../redux/reducers/priceGroups";
import {LanguageState} from "../../../redux/reducers/languages";

function ProductGroupListToolbar() {
    const local = useSelector<AppState, ProductGroupListComponentState>(x => x.local.productGroupListComponent);
    const priceGroupState = useSelector<AppState, PriceGroupState>(x => x.priceGroupsState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const dispatch = useDispatch();

    const changeSelected = (id: number) => {
        dispatch(actions.setSelectedCardType(id));
    }

    const onEnter = (event) => {
        if(local.isProductGroupsLoading)
            return
        if(event.key === 'Enter') {
            dispatch(getProductGroupsIdentityThunk({
                priceGroupId: priceGroupState.selected.id,
                languageId: languageState.selected.id,
                searchString: local.filter,
                pgValidationType: local.selectedCardType.value,
            }))
        }
    }
    const setFilter = (filter: string) => dispatch(actions.setFilter(filter))
    const debouncedFilter = useDebouncedCallback(args => setFilter(args), 500)

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
                       onKeyUp={e => onEnter(e)}
                       onChange={e => debouncedFilter(e.currentTarget.value)}
                />
            </div>
        </form>
    </div>
}

export default ProductGroupListToolbar
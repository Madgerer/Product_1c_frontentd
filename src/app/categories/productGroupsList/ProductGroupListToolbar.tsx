import DistributionTypeSelector from "../../common/distributionSelector/DistributionSelector";
import {useDispatch, useSelector} from "react-redux";
import {actions, CategoryComponentState} from "../../../redux/reducers/local/categoryComponent";
import "./productGroupListToolbar.scss";
import {AppState} from "../../../redux/reducers";
import {CategoriesState} from "../../../redux/reducers/categories";
import {
    addProductGroupToCatsThunk,
    getProductGroupsByCatalogsThunk
} from "../../../redux/reducers/local/categoryComponent/thunk";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {CatalogState} from "../../../redux/reducers/catalogs";
import {PriceGroupState} from "../../../redux/reducers/priceGroups";
import {SellmarkState} from "../../../redux/reducers/sellmarks";
import {LanguageState} from "../../../redux/reducers/languages";
import {DistributionTypeState} from "../../../redux/reducers/distributionsTypes";
import {useDebouncedCallback} from "use-debounce";

export default function ProductGroupListToolbar(){
    const local = useSelector<AppState, CategoryComponentState>(x => x.local.categoryComponent);
    const categoriesState = useSelector<AppState, CategoriesState>(x => x.categoriesState)
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState);
    const priceGroup = useSelector<AppState, PriceGroupState>(x => x.priceGroupsState);
    const sellmarkState = useSelector<AppState, SellmarkState>(x => x.sellmarkState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const distributedState = useSelector<AppState, DistributionTypeState>(x => x.distributionTypesState);
    const catalogGroupState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState);

    const dispatch = useDispatch();

    const debouncedFilter = useDebouncedCallback((args) => setFilter(args), 500)

    function setFilter(filter: string) {
        dispatch(actions.setFilter(filter));
    }

    const onEnter = (event) => {
        if(local.isGroupsLoading)
            return
        if(event.key === 'Enter') {
            dispatch(getProductGroupsByCatalogsThunk({
                priceGroupId: priceGroup.selected.id,
                languageId: languageState.selected.id,
                sellmarkId: sellmarkState.selected.id,
                catalogId: catalogState.selected.id,
                distributionType: distributedState.selected.value,
                catalogGroup: catalogGroupState.selected.id,
                searchString: local.groupFilter
            }))
        }
    }

    function addProductGroupsToCats() {
        if(categoriesState.checkCategories.length == 0){
            alert('Выберите раздел куда переместить карточки')
            return;
        }

        if(local.selectedGroups.length == 0) {
            alert('Выберите карточки для перемещения')
        }

        const withChildrenCategory = categoriesState.checkCategories.find(x => x.children.length !== 0);
        if(withChildrenCategory !== undefined) {
            alert('Одна из выбранных вами категорий не является категорией последнего уровня')
            return;
        }

        dispatch(addProductGroupToCatsThunk({
            productGroupIds: local.selectedGroups.map(x => x.id),
            catalogGroup: catalogGroupState.selected.id,
            catalogId: catalogState.selected.id,
            categoriesIds: categoriesState.checkCategories.map(x => x.id)
        }))
    }

    return <div className="cat-product-group-list-toolbar-container">
        <form className="form-inline">
            <button id="addButton"
                    title="Добавить выделенные карточки в категорию"
                    type="button"
                    className="btn btn-dark"
                    onClick={() => addProductGroupsToCats()}
                >
                <i className="fa fa-plus" aria-hidden="true">

                </i></button>
            <div className="cat-product-group-list-toolbar-select-container">
                <DistributionTypeSelector/>
            </div>
            <div className="ml-auto" style={{float: "right"}}>
                <input type="text"
                       className="form-control"
                       placeholder="Search"
                       onKeyUp={e => onEnter(e)}
                       onChange={e => debouncedFilter(e.target.value)}/>
            </div>
        </form>
    </div>
}
import "./productGroupListTable.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, CategoryComponentState} from "../../../redux/reducers/local/categoryComponent";
import {CatalogState} from "../../../redux/reducers/catalogs";
import {PriceGroupState} from "../../../redux/reducers/priceGroups";
import {SellmarkState} from "../../../redux/reducers/sellmarks";
import {useEffect} from "react";
import {
    getProductGroupCatsThunk,
    getProductGroupsByCatalogsThunk,
    getProductsByGroupThunk
} from "../../../redux/reducers/local/categoryComponent/thunk";
import {LanguageState} from "../../../redux/reducers/languages";
import {DistributionTypeState} from "../../../redux/reducers/distributionsTypes";
import ExpandedProductGroupTable from "../../common/tables/productGroupTable/ExpandedProductGroupTable";
import {IProductGroupIdentityModel} from "../../common/tables/productGroupTable/types";
import {actions as categoryActions} from "../../../redux/reducers/categories/index";
import _ from "lodash";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {DistributionType} from "../../../domain/types";


export default function ProductGroupListTable() {
    const local = useSelector<AppState, CategoryComponentState>(x => x.local.categoryComponent);
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState);
    const priceGroup = useSelector<AppState, PriceGroupState>(x => x.priceGroupsState);
    const sellmarkState = useSelector<AppState, SellmarkState>(x => x.sellmarkState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const distributedState = useSelector<AppState, DistributionTypeState>(x => x.distributionTypesState);
    const catalogGroupState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState);

    const dispatch = useDispatch();
    const trottledDispatch = _.throttle(() => {
        dispatch(getProductGroupsByCatalogsThunk({
            priceGroupId: priceGroup.selected.id,
            languageId: languageState.selected.id,
            sellmarkId: sellmarkState.selected.id,
            catalogId: catalogState.selected.id,
            distributionType: distributedState.selected.value,
            catalogGroup: catalogGroupState.selected.id,
            searchString: local.groupFilter
        }))
    }, 50);

    useEffect(() => {
        if(catalogState.wasInit) {
            trottledDispatch()
        }
    }, [priceGroup.selected.id,
        languageState.selected.id,
        sellmarkState.selected.id,
        catalogState.selected.id,
        catalogState.wasInit,
        distributedState.selected.value,
        local.groupFilter])

    useEffect(() => {
        dispatch(categoryActions.setHighlightedCategories(local.productGroupsWithCategoriesPath.flatMap(x => x.categoryPath)))
    }, [local.productGroupsWithCategoriesPath])

    function onSelect(productGroup: IProductGroupIdentityModel) {
        dispatch(actions.setSelectedProductGroup(productGroup))

        if(distributedState.selected.value == DistributionType.Distributed) {
            if(local.productGroupsWithCategoriesPath.find(x => x.productGroupId == productGroup.id) === undefined) {
                dispatch(getProductGroupCatsThunk({
                    productGroupId: productGroup.id,
                    languageId: languageState.selected.id,
                    catalogGroup: catalogGroupState.selected.id}))
            }else {
                dispatch(actions.removeProductGroupWithCatPath(productGroup.id))
            }
        }
    }

    function loadProducts(productGroup: IProductGroupIdentityModel) {
        dispatch(getProductsByGroupThunk({
            productGroupId: productGroup.id,
            languageId: languageState.selected.id}
        ))
    }

    return <div className="table-sm p-table__scroll-wrapper">
        <ExpandedProductGroupTable isProductGroupsLoading={local.isGroupsLoading} productGroups={local.productGroups} loadProducts={loadProducts} onRowClick={onSelect}/>
    </div>
}
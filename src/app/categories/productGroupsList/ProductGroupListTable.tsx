import "./productGroupListTable.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {CategoryComponentState} from "../../../redux/reducers/local/categoryComponent";
import {CatalogState} from "../../../redux/reducers/catalogs";
import {PriceGroupState} from "../../../redux/reducers/priceGroups";
import {SellmarkState} from "../../../redux/reducers/sellmarks";
import {useEffect} from "react";
import {
    getProductByGroupFromCategoryThunk,
    uploadProductGroupFromCatalogsThunk
} from "../../../redux/reducers/local/categoryComponent/thunk";
import {LanguageState} from "../../../redux/reducers/languages";
import {DistributionTypeState} from "../../../redux/reducers/distributionsTypes";
import ExpandedProductGroupTable from "../../common/tables/productGroupTable/ExpandedProductGroupTable";
import {IProductGroupIdentityModel} from "../../common/tables/productGroupTable/types";
import {actions} from "../../../redux/reducers/local/productComponent/productGroupList";

export default function ProductGroupListTable() {
    const local = useSelector<AppState, CategoryComponentState>(x => x.local.categoryComponent);
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState);
    const priceGroup = useSelector<AppState, PriceGroupState>(x => x.priceGroupsState);
    const sellmarkState = useSelector<AppState, SellmarkState>(x => x.sellmarkState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const distributedState = useSelector<AppState, DistributionTypeState>(x => x.distributionTypesState)

    const dispatch = useDispatch();

    useEffect(() => {
        if(catalogState.wasInit) {
            dispatch(uploadProductGroupFromCatalogsThunk({
                priceGroupId: priceGroup.selected.id,
                languageId: languageState.selected.id,
                sellmarkId: sellmarkState.selected.id,
                catalogId: catalogState.selected.id,
                distributionType: distributedState.selected.value,
                searchString: local.groupFilter
            }));
        }
    }, [priceGroup.selected.id,
        languageState.selected.id,
        sellmarkState.selected.id,
        catalogState.selected.id,
        catalogState.wasInit,
        distributedState.selected.value,
        local.groupFilter])

    function onSelect(productGroup: IProductGroupIdentityModel) {
        dispatch(actions.setSelectedProductGroup(productGroup))
    }

    function loadProducts(productGroup: IProductGroupIdentityModel) {
        dispatch(getProductByGroupFromCategoryThunk({
            productGroupId: productGroup.id,
            languageId: languageState.selected.id}
        ))
    }

    return <div className="table-sm p-table__scroll-wrapper">
        <ExpandedProductGroupTable isProductGroupsLoading={local.isGroupsLoading} productGroups={local.productGroups} loadProducts={loadProducts} onSelect={onSelect}/>
    </div>
}
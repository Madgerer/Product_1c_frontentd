import "./productGroupListTable.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, ProductGroupListComponentState} from "../../../redux/reducers/local/productComponent/productGroupList";
import {useEffect} from "react";
import {PriceGroupState} from "../../../redux/reducers/priceGroups";
import {LanguageState} from "../../../redux/reducers/languages";
import {
    getProductByProductGroupThunk,
    getProductGroupsIdentityThunk
} from "../../../redux/reducers/local/productComponent/productGroupList/thunk";
import ExpandedProductGroupTable from "../../common/tables/productGroupTable/ExpandedProductGroupTable";
import {IProductGroupIdentityModel} from "../../common/tables/productGroupTable/types";
import "../../common/tables/tables-styles.scss"

function ProductGroupListTable() {
    const local = useSelector<AppState, ProductGroupListComponentState>(x => x.local.productGroupListComponent)
    const priceGroupState = useSelector<AppState, PriceGroupState>(x => x.priceGroupsState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductGroupsIdentityThunk({
            priceGroupId: priceGroupState.selected.id,
            languageId: languageState.selected.id,
            searchString: local.filter,
            pgValidationType: local.selectedCardType.value,
        }))
    }, [priceGroupState.selected.id, languageState.selected.id, local.selectedCardType, local.filter])


    function onSelect(productGroup: IProductGroupIdentityModel) {
        dispatch(actions.setSelectedProductGroup(productGroup))
    }

    function loadProducts(productGroup: IProductGroupIdentityModel) {
        dispatch(getProductByProductGroupThunk({
            productGroupId: productGroup.id,
            languageId: languageState.selected.id}
        ))
    }

    return <div className="table-sm product-right-column-table p-table__scroll-wrapper">
        <ExpandedProductGroupTable
            isProductGroupsLoading={local.isProductGroupsLoading}
            productGroups={local.productGroups}
            loadProducts={loadProducts}
            onRowClick={onSelect}
            onCheckBoxClick={onSelect}
        />
    </div>
}

export default ProductGroupListTable
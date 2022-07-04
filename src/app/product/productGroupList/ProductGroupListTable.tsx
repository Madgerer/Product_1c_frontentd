import "./productGroupListTable.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {
    actions,
    ProductGroupListComponentState
} from "../../../redux/reducers/local/productComponent/productGroupList";
import {useEffect, useState} from "react";
import {PriceGroupState} from "../../../redux/reducers/priceGroups";
import {LanguageState} from "../../../redux/reducers/languages";
import {
    getProductByGroupThunk,
    getProductsGroupsIdentityThunk
} from "../../../redux/reducers/local/productComponent/productGroupList/thunk";
import ExpandedProductGroupTable from "../../common/productGroupTable/ExpandedProductGroupTable";
import {IProductGroupIdentityModel} from "../../common/productGroupTable/types";

function ProductGroupListTable() {
    const local = useSelector<AppState, ProductGroupListComponentState>(x => x.local.productGroupListComponent)
    const priceGroupState = useSelector<AppState, PriceGroupState>(x => x.priceGroupsState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsGroupsIdentityThunk({
            priceGroupId: priceGroupState.selected.id,
            languageId: languageState.selected.id,
            searchString: local.filter,
            cardValidationType: local.selectedCardType
        }))
    }, [priceGroupState.selected.id, languageState.selected.id, local.selectedCardType, local.filter])


    function onSelect(productGroup: IProductGroupIdentityModel) {
        dispatch(actions.setSelectedProductGroup(productGroup))
    }

    function loadProducts(productGroup: IProductGroupIdentityModel) {
        dispatch(getProductByGroupThunk({
            productGroupId: productGroup.id,
            languageId: languageState.selected.id}
        ))
    }

    return <div className="table-sm product-right-column-table">
        <ExpandedProductGroupTable
            isProductGroupsLoading={local.isProductGroupsLoading}
            productGroups={local.productGroups}
            loadProducts={loadProducts}
            onSelect={onSelect}/>
    </div>
}

export default ProductGroupListTable
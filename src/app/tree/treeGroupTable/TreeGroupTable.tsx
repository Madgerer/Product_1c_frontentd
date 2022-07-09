import {IProductGroupIdentityModel} from "../../common/tables/productGroupTable/types";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, TreeComponentState} from "../../../redux/reducers/local/treeComponent";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {CatalogGroup} from "../../../domain/types";
import {getProductGroupsBasicThunk, getProductsByGroupThunk} from "../../../redux/reducers/local/treeComponent/thunks";
import {LanguageState} from "../../../redux/reducers/languages";
import {CatalogState} from "../../../redux/reducers/catalogs";
import {CategoriesState} from "../../../redux/reducers/categories";
import ExpandedProductGroupTable from "../../common/tables/productGroupTable/ExpandedProductGroupTable";
import _ from "lodash";

export default function TreeGroupTable() {
    const local = useSelector<AppState, TreeComponentState>(x => x.local.treeComponent);
    const catalogGroupState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState);
    const categoryState = useSelector<AppState, CategoriesState>(x => x.categoriesState);
    const dispatch = useDispatch();

    useEffect(() => {
        if(categoryState.selectedCategory !== null) {
            dispatch(getProductGroupsBasicThunk({
                languageId: languageState.selected.id,
                catalogGroup: catalogGroupState.selected.id,
                catalogId:  catalogGroupState.selected.id === CatalogGroup.Printed
                    ? catalogState.selected.id
                    : null,
                validationType: local.selectedCardType.value,
                categoryId: categoryState.selectedCategory!.id,
                searchString: local.filter
            }))
        }
        else {
            dispatch(actions.setProductGroupsEmpty())
        }
    }, [
        languageState.selected.id,
        catalogGroupState.selected.id,
        local.selectedCardType.value,
        categoryState.selectedCategory?.id,
        local.filter
    ])

    function loadProducts(productGroup: IProductGroupIdentityModel) {
        dispatch(getProductsByGroupThunk({
            productGroupId: productGroup.id,
            languageId: languageState.selected.id}
        ))
    }

    function setSelected(productGroup: IProductGroupIdentityModel) {
        dispatch(actions.setSelectedGroup(productGroup))
    }

    return <div className="table-sm p-table__scroll-wrapper">
        <ExpandedProductGroupTable
            isProductGroupsLoading={local.isProductGroupsLoading}
            productGroups={catalogGroupState.selected.id == CatalogGroup.Printed ? _.orderBy(local.productGroups, x => x.sort) : local.productGroups}
            loadProducts={model => loadProducts(model)}
            onRowClick={model => {setSelected(model)}}
            onCheckBoxClick={model => {setSelected(model)}}
            showSortColumn={catalogGroupState.selected.id == CatalogGroup.Printed}/>
    </div>
}

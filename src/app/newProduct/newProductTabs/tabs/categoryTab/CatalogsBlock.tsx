import './CatalogsBlock.scss'
import {CatalogGroup, ICategory} from "../../../../../domain/types";
import CatalogSelector, {CatalogFilter} from "../../../../common/catalogSelector/CatalogSelector";
import CategorySelectRow from "./common/CategorySelectRow";
import CategoryDynamicTable from "./common/CategoryDynamicTable";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {
    actions,
    CategoriesTabState,
    ProductGroupCategory
} from "../../../../../redux/reducers/local/newProduct/categoryTabComponent";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import {LanguageState} from "../../../../../redux/reducers/languages";
import {CatalogState} from "../../../../../redux/reducers/catalogs";
import {useEffect} from "react";
import {
    addProductGroupToCatsThunk, changeProductGroupCategoryThunk,
    getCategoriesThunk,
    getProductGroupCategoriesThunk, removeProductGroupFromCatsThunk, setCategoryAsMainThunk
} from "../../../../../redux/reducers/local/newProduct/categoryTabComponent/thunks";
import {ISelectableIndexModel} from "../../../../../redux/types";

export default function CatalogsBlock() {

    const local = useSelector<AppState, CategoriesTabState>(x => x.local.newProductState.categoryState)
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoriesThunk({catalogGroup: CatalogGroup.Printed, languageId: languageState.selected.id}))
        dispatch(getCategoriesThunk({catalogGroup: CatalogGroup.Web, languageId: languageState.selected.id}))
    }, [languageState.selected.id])

    useEffect(() => {
        const isCategoriesLoaded = local.categoriesWeb.length != 0 && local.categoriesPrinted.length != 0;
        if(productGroupState.productGroup.wasCreate && isCategoriesLoaded) {
            dispatch(getProductGroupCategoriesThunk({productGroupId: productGroupState.productGroup.id, catalogGroup: CatalogGroup.Printed, languageId: languageState.selected.id}))
            dispatch(getProductGroupCategoriesThunk({productGroupId: productGroupState.productGroup.id, catalogGroup: CatalogGroup.Web, languageId: languageState.selected.id}))
        }
    },[languageState.selected.id, local.categoriesPrinted.length, local.categoriesWeb.length])

    const setCategoryPath = (category: ICategory | null, catalogGroup: CatalogGroup) => dispatch(actions.setRowPath({category: category, catalogGroup: catalogGroup}))
    const onCategoryRowReset = (catalog: CatalogGroup) => dispatch(actions.setShouldReset(catalog))
    const setSelectedCategory = (tableRow: ISelectableIndexModel<ProductGroupCategory>, catalogGroup: CatalogGroup) =>
        dispatch(actions.setSelectedCategory({rowIndex: tableRow.index, catalogGroup: catalogGroup}))


    const getCategoryIdByPath = (catalogGroup: CatalogGroup): number | null => {
        let lastLevelCategoryIds: number[];
        if(catalogGroup === CatalogGroup.Printed)
            lastLevelCategoryIds = local.selectedPrintedCategories
                .filter(x => x.children.length === 0)
                .map(x => x.id)
        else
            lastLevelCategoryIds = local.selectedWebCategories
                .filter(x => x.children.length === 0)
                .map(x => x.id)
        if(lastLevelCategoryIds.length > 1) {
            alert("Произошла внутренняя ошибки, перезагрузите страницу")
            return null
        }

        if (lastLevelCategoryIds.length !== 1) {
            alert("Выберите категорию последнего уровня")
            return null;
        }

        return lastLevelCategoryIds[0]
    }

    const isCategoryAdded = (categoryId: number, catalogGroup: CatalogGroup): boolean => {
        let existingCategories: ICategory[]
        if(catalogGroup === CatalogGroup.Printed) {
            existingCategories = local.currentPrintedCategories.flatMap(x => x.model)
        } else {
            existingCategories = local.currentWebCategories.flatMap(x => x.model)
        }
        const category = existingCategories.find(x => x.id == categoryId);
        return category !== undefined;
    }

    const addCategory = (catalogGroup: CatalogGroup) => {
        const categoryId = getCategoryIdByPath(catalogGroup);
        if(categoryId === null)
            return;
        const isAdded = isCategoryAdded(categoryId, catalogGroup);
        if(isAdded)
        {
            alert("Категория уже добавлена")
            return;
        }
        dispatch(addProductGroupToCatsThunk({
            productGroupIds: Array.of(productGroupState.productGroup.id),
            categoriesIds: Array.of(categoryId),
            catalogGroup: catalogGroup,
            catalogId: catalogState.selected.id
        }));
    }

    const removeCategory = (catalogGroup: CatalogGroup) => {
        let categoryToRemove: number | null;
        if(catalogGroup === CatalogGroup.Printed) {
            categoryToRemove = local.selectedCurrentPrintedCategory?.id ?? null
        }
        else {
            categoryToRemove = local.selectedCurrentWebCategory?.id ?? null
        }
        if(categoryToRemove === null)
        {
            alert("Выберите категорию для удаления")
            return;
        }

        dispatch(removeProductGroupFromCatsThunk({
            productGroupIds: Array.of(productGroupState.productGroup.id),
            categoryId: categoryToRemove,
            catalogGroup: catalogGroup,
            catalogId: catalogState.selected.id,
        }))
    }

    const changeCategory = (catalogGroup: CatalogGroup) => {
        let currentCatId: number | null;
        const newCategoryId = getCategoryIdByPath(catalogGroup);
        if(newCategoryId === null)
            return;
        if(isCategoryAdded(newCategoryId, catalogGroup))
        {
            alert("Категория уже добавлена")
            return;
        }

        if(catalogGroup === CatalogGroup.Printed)
            currentCatId = local.selectedCurrentPrintedCategory?.id ?? null;
        else
            currentCatId = local.selectedCurrentWebCategory?.id ?? null;

        if(currentCatId === null)
        {
            alert("Выберите категорию для обновления")
            return;
        }

        dispatch(changeProductGroupCategoryThunk({
            productGroupId: productGroupState.productGroup.id,
            categoryId: currentCatId,
            catalogGroup: catalogGroup,
            catalogId: catalogState.selected.id,
            newCategoryId: newCategoryId
        }))
    }

    const setCategoryAsMain = () => {
        const currentCatId = local.selectedCurrentWebCategory?.id ?? null;
        if(currentCatId === null)
        {
            alert("Выберите категорию для обновления")
            return;
        }

        dispatch(setCategoryAsMainThunk({categoryId: currentCatId, productGroupId: productGroupState.productGroup.id}))
    }

    return <>
        <div className="item col-md-12">
            <div>
                <h2>Категории в каталоге</h2>
                <button type="button" className="btn btn-dark" onClick={() => addCategory(CatalogGroup.Printed)}>
                    <i className="fa  fa-plus" aria-hidden="true"/>
                </button>
                <button type="button" className="btn btn-dark" onClick={() => changeCategory(CatalogGroup.Printed)}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"/>
                </button>
                <button type="button" className="btn btn-dark" onClick={() => removeCategory(CatalogGroup.Printed)}>
                    <i className="fa fa fa-minus" aria-hidden="true"/>
                </button>
                <CatalogSelector filter={CatalogFilter.Printed}/>
                <CategorySelectRow
                    shouldReset={local.shouldResetPrinted}
                    onReset={() => onCategoryRowReset(CatalogGroup.Printed)}
                    categories={local.categoriesPrinted}
                    onChange={(cat) => {setCategoryPath(cat, CatalogGroup.Printed)}}/>
            </div>
            <CategoryDynamicTable
                catalogGroup={CatalogGroup.Printed}
                onRowClicked={(e) => setSelectedCategory(e, CatalogGroup.Printed)}
                rows={local.currentPrintedCategories}/>
        </div>
        <div className="item col-md-12">
            <div>
                <h2>Категории на сайт</h2>
                <button type="button" className="btn btn-dark" onClick={() => addCategory(CatalogGroup.Web)}>
                    <i className="fa  fa-plus" aria-hidden="true"/>
                </button>
                <button type="button" className="btn btn-dark" onClick={() => changeCategory(CatalogGroup.Web)}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"/>
                </button>
                <button type="button" className="btn btn-dark" onClick={() => removeCategory(CatalogGroup.Web)}>
                    <i className="fa fa fa-minus" aria-hidden="true"/>
                </button>
                <button type="button" className="btn btn-dark" onClick={() => setCategoryAsMain()}>
                    Сделать главной
                </button>
                <CategorySelectRow
                    shouldReset={local.shouldResetWeb}
                    onReset={() => onCategoryRowReset(CatalogGroup.Web)}
                    categories={local.categoriesWeb}
                    onChange={(cat) => {setCategoryPath(cat, CatalogGroup.Web)}}/>
            </div>
            <CategoryDynamicTable
                catalogGroup={CatalogGroup.Web}
                onRowClicked={(e) => setSelectedCategory(e, CatalogGroup.Web)}
                rows={local.currentWebCategories}/>
        </div>
    </>
}
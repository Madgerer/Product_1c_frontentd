import CatalogSelector, {CatalogFilter} from "../../../common/catalogSelector/CatalogSelector";
import CategorySelectRow from "../CategorySelectRow";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../redux/reducers";
import {actions, NewProductState} from "../../../../redux/reducers/local/newProduct";
import {CatalogGroup, ICategory} from "../../../../domain/types";
import SimpleDynamicTable from "../CategoryDynamicTable";
import {useEffect} from "react";
import {
    addProductGroupToCatsThunk,
    changeProductGroupCategoryThunk,
    getProductGroupCategoriesThunk,
    removeProductGroupFromCatsThunk
} from "../../../../redux/reducers/local/newProduct/thunks";
import {LanguageState} from "../../../../redux/reducers/languages";
import {CatalogState} from "../../../../redux/reducers/catalogs";
import {ISelectableIndexModel} from "../../../../redux/types";
import CategoryTreeUtils from "../../../../CategoryTreeUtils";

export default function CategoryTab() {
    const local = useSelector<AppState, NewProductState>(x => x.local.newProductState)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState)
    const dispatch = useDispatch();

    useEffect(() => {
        let isCategoriesLoaded = local.categoriesState.categoriesWeb.length != 0 && local.categoriesState.categoriesPrinted.length != 0;
        if(local.productGroup.wasCreate && isCategoriesLoaded) {
            dispatch(getProductGroupCategoriesThunk({productGroupId: local.productGroup.id, catalogGroup: CatalogGroup.Printed, languageId: languageState.selected.id}))
            dispatch(getProductGroupCategoriesThunk({productGroupId: local.productGroup.id, catalogGroup: CatalogGroup.Web, languageId: languageState.selected.id}))
        }
    },[languageState.selected.id, local.categoriesState.categoriesPrinted, local.categoriesState.categoriesWeb])

    const setPrintedRowPath = (category: ICategory | null, catalogGroup: CatalogGroup) => dispatch(actions.setRowPath({category: category, catalogGroup: catalogGroup}))

    const getCategoryIdByPath = (catalogGroup: CatalogGroup): number | null => {
        let lastLevelCategoryIds: number[];
        if(catalogGroup === CatalogGroup.Printed)
            lastLevelCategoryIds = local.categoriesState.printedCategoryToAlterPath
                .filter(x => x.children.length === 0)
                .map(x => x.id)
        else
            lastLevelCategoryIds = local.categoriesState.webCategoryToAlterPath
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
            existingCategories = local.categoriesState.currentPrintedCategories.flatMap(x => x.model)
        } else {
            existingCategories = local.categoriesState.currentWebCategories.flatMap(x => x.model)
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
            productGroupIds: Array.of(local.productGroup.id),
            categoriesIds: Array.of(categoryId),
            catalogGroup: catalogGroup,
            catalogId: catalogState.selected.id
        }));
    }

    const removeCategory = (catalogGroup: CatalogGroup) => {
        let categoryToRemove: number | null;
        if(catalogGroup === CatalogGroup.Printed) {
            categoryToRemove = local.categoriesState.selectedPrintedCategory?.id ?? null
        }
        else {
            categoryToRemove = local.categoriesState.selectedWebCategory?.id ?? null
        }
        if(categoryToRemove === null)
        {
            alert("Выберите категорию для удаления")
            return;
        }

        dispatch(removeProductGroupFromCatsThunk({
            productGroupIds: Array.of(local.productGroup.id),
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
            currentCatId = local.categoriesState.selectedPrintedCategory?.id ?? null;
        else
            currentCatId = local.categoriesState.selectedWebCategory?.id ?? null;

        if(currentCatId === null)
        {
            alert("Выберите категорию для обновления")
            return;
        }

        dispatch(changeProductGroupCategoryThunk({
            productGroupId: local.productGroup.id,
            categoryId: currentCatId,
            catalogGroup: catalogGroup,
            catalogId: catalogState.selected.id,
            newCategoryId: newCategoryId
        }))
    }

    const onRowReset = (catalog: CatalogGroup) => dispatch(actions.setShouldReset(catalog))
    const setSelectedCategory = (tableRow: ISelectableIndexModel<ICategory>, catalogGroup: CatalogGroup) =>
        dispatch(actions.setSelectedCategory({rowIndex: tableRow.index, catalogGroup: catalogGroup}))

    return <div className="tab-pane row">
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
                    shouldReset={local.categoriesState.shouldResetPrinted}
                    onReset={() => onRowReset(CatalogGroup.Printed)}
                    categories={local.categoriesState.categoriesPrinted}
                    onChange={(cat) => {setPrintedRowPath(cat, CatalogGroup.Printed)}}/>
            </div>
            <SimpleDynamicTable
                onRowClicked={(e) => setSelectedCategory(e, CatalogGroup.Printed)}
                nameAccessorFn={category => category.name}
                keyAccessorFn={category => category.id}
                rows={local.categoriesState.currentPrintedCategories}/>
        </div>
        <div className="item col-md-12">
            <div>
                <h2>Категории на сайт</h2>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa fa-minus" aria-hidden="true"></i>
                </button>
                <CatalogSelector filter={CatalogFilter.Web} />
                <button type="button" className="btn btn-dark">
                    Сделать главной
                </button>
                {/*<CategorySelectRow categories={local.categoriesState.categoriesWeb} onChange={c => {setWebRowPath(c)}}/>*/}
            </div>
            Вот тут какая-то нерабочая таблица
        </div>
        <div className="item col-md-12">
            <div>
                <h2>Категории на сайт</h2>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    Сделать главной
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa fa-minus" aria-hidden="true"></i>
                </button>
                <div>Селектор scope of application</div>
            </div>
            Какая-то не рабочая таблица
        </div>
    </div>
}
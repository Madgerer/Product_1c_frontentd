import CatalogSelector, {CatalogFilter} from "../../../common/catalogSelector/CatalogSelector";
import CategorySelectRow from "../CategorySelectRow";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../redux/reducers";
import {actions, NewProductState} from "../../../../redux/reducers/local/newProduct";
import {CatalogGroup, ICategory} from "../../../../domain/types";
import CategoryDynamicTable from "../CategoryDynamicTable";
import {useEffect} from "react";
import {
    addProductGroupToCatsThunk,
    getProductGroupCategoriesThunk
} from "../../../../redux/reducers/local/newProduct/thunks";
import {LanguageState} from "../../../../redux/reducers/languages";
import {CatalogState} from "../../../../redux/reducers/catalogs";

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

    const setSelectedPrintedCategory = (category: ICategory | null) => dispatch(actions.setSelectedPrintedCategory(category))
    const setSelectedWebCategory = (category: ICategory | null) => dispatch(actions.setSelectedPrintedCategory(category))
    const addPrinterCategory = async () => {
        const lastLevelCategory = local.categoriesState.rowPrintedCategoryPath
            .filter(x => x.children.length === 0)
            .map(x => x.id)

        if (lastLevelCategory.length !== 1) {
            alert("Выберите категорию последнего уровня")
            return
        }
        await dispatch(addProductGroupToCatsThunk({
            productGroupIds: new Array(local.productGroup.id),
            categoriesIds: lastLevelCategory,
            catalogGroup: CatalogGroup.Printed,
            catalogId: catalogState.selected.id
        }))
    }

    return <div className="tab-pane row">
        <div className="item col-md-12">
            <div>
                <h2>Категории в каталоге</h2>
                <button type="button" className="btn btn-dark" onClick={() => addPrinterCategory()}>
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa fa-minus" aria-hidden="true"></i>
                </button>
                <CatalogSelector filter={CatalogFilter.Printed}/>
                <CategorySelectRow
                    categories={local.categoriesState.categoriesPrinted}
                    onChange={(cat) => {setSelectedPrintedCategory(cat)}}/>
            </div>
            <CategoryDynamicTable categories={local.categoriesState.currentPrintedCategories}/>
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
                <CategorySelectRow categories={local.categoriesState.categoriesWeb} onChange={c => {setSelectedWebCategory(c)}}/>
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
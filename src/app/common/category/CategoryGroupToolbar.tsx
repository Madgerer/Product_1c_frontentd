import "./categoryGroupToolbar.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, CategoriesState} from "../../../redux/reducers/categories";
import {
    createCategoryThunk,
    deleteCategoryThunk,
    updateCategoryNameThunk
} from "../../../redux/reducers/categories/thunk";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {LanguageState} from "../../../redux/reducers/languages";
import {useEffect} from "react";

export default function CategoryGroupToolbar() {
    const local = useSelector<AppState, CategoriesState>(x => x.categoriesState);
    const catalogGroupState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.clearToolbarState())
    }, [languageState.selected.id, catalogGroupState.selected.id])

    function setCurrentValue(name: string) {
        dispatch(actions.setCurrentCategoryName(name))
    }

    function setNewCategoryName(name: string) {
        dispatch(actions.setNewCategoryName(name))
    }

    function updateCategoryName() {
        if(local.selectedCategory === null) {
            alert("Выберите категорию")
            return
        }
        else {
            if(local.selectedCategory.name !== local.categoryCurrentName) {
                dispatch(updateCategoryNameThunk({
                    catalogGroup: catalogGroupState.selected.id,
                    name: local.categoryCurrentName,
                    languageId: languageState.selected.id,
                    id: local.selectedCategory!.id
                }))
            }
        }
    }

    function createCategory() {
        if(local.newCategoryName === null || local.newCategoryName === "") {
            alert("Введите наименование")
            return;
        }
        const parentId = local.selectedCategory !== null ? local.selectedCategory.id : null;
        dispatch(createCategoryThunk({
            languageId: languageState.selected.id,
            name: local.newCategoryName,
            parentId: parentId,
            catalogGroup: catalogGroupState.selected.id
        }))
    }

    function deleteCategory() {
        if(local.selectedCategory === null){
            alert("Выберите наименование")
            return;
        }
        if(local.selectedCategory.children.length != 0)
        {
            alert("У категории есть суб категории")
            return;
        }
        dispatch(deleteCategoryThunk({
            id: local.selectedCategory.id,
            catalogGroup: catalogGroupState.selected.id
        }))
    }

    return <div className="input-group-sm cat-category-group-toolbar-container">
        <div className="col-md-12 input-group-sm">
            <button title="Добавить категорию" type="button" className="btn btn-dark" onClick={() => createCategory()}>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
            <button title="Изменить наименование выделенной категории" type="button" className="btn btn-dark" onClick={() => updateCategoryName()}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
            <button title="Удалить выделенную категорию" type="button" className="btn btn-dark" onClick={() => deleteCategory()}>
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <input className="form-control"
                   onChange={e => setNewCategoryName(e.currentTarget.value)}
                   value={local.newCategoryName}
                   placeholder="Наименование новой категории" style={{marginTop: 10}}/>
            <input className="form-control"
                   onChange={e => setCurrentValue(e.currentTarget.value)}
                   value={local.categoryCurrentName}
                   type="text"
                   placeholder="" style={{marginTop: 10}}/>
        </div>
    </div>
}
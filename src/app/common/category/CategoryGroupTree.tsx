import {AppState} from "../../../redux/reducers";
import {useDispatch, useSelector} from "react-redux";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {useEffect} from "react";
import {LanguageState} from "../../../redux/reducers/languages";
import {ICategoryIdentityModel} from "../tables/productGroupTable/types";
import CategoryExpandedList from "./CategoryExpandedList";
import {getCategoriesThunk} from "../../../redux/reducers/categories/thunk";
import {actions, CategoriesState} from "../../../redux/reducers/categories";

//todo переавать сюда подсвеченные элементы как props, чтобы не взаимодействовать с его стором снаружи
export default function CategoryGroupTree(props: ICategoryGroupTreeProps) {
    const catalogGroupsState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const categoriesState = useSelector<AppState, CategoriesState>(x => x.categoriesState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoriesThunk({catalogGroup: catalogGroupsState.selected.id, languageId: languageState.selected.id}))
    }, [catalogGroupsState.selected.id])

    function setChecked(category: ICategoryIdentityModel) {
        dispatch(actions.setCategoryChecked({categoryId: category.id, checked: !category.checked}))
    }

    function onRowClicked(category: ICategoryIdentityModel) {
        dispatch(actions.setSelectedCategory({categoryId: category.id, selected: !category.selected}))
    }

    return <>
        {categoriesState.isCategoriesLoading
            ? "Loading"
            :
          <ul className="cat-category-group-list__wrapper">
              <CategoryExpandedList
                  highlightedRows={props.highlightedRows}
                  spanLevel={1}
                  categories={categoriesState.categories}
                  onRowClicked={onRowClicked}
                  onCheckboxClicked={setChecked}/>
          </ul>
        }
    </>;
}

interface ICategoryGroupTreeProps {
    highlightedRows: number[]
}


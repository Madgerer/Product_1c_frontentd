import {AppState} from "../../../redux/reducers";
import {actions, CategoryComponentState} from "../../../redux/reducers/local/categoryComponent";
import {useDispatch, useSelector} from "react-redux";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {useEffect, useState} from "react";
import {getCategoriesThunk} from "../../../redux/reducers/local/categoryComponent/thunk";
import {LanguageState} from "../../../redux/reducers/languages";
import {ICategoryIdentityModel} from "../../common/tables/productGroupTable/types";

export default function CategoryGroupTree() {
    const local = useSelector<AppState, CategoryComponentState>(x => x.local.categoryComponent);
    const catalogGroupsState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
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
        {local.isCategoriesLoading
            ? "Loading"
            : <CategoryExpandedList categories={local.categories} onRowClicked={onRowClicked} onCheckboxClicked={setChecked}/>
        }
    </>;
}

function CategoryExpandedList(props: ICategoryExpandedListProps) {
    return <ul>
        {props.categories.map(x => <li key={x.id}>
            <CategoryExpanded category={x} onCheckboxClicked={props.onCheckboxClicked} onRowClicked={props.onRowClicked}/>
        </li>)}
    </ul>
}

interface ICategoryExpandedListProps {
    categories: ICategoryIdentityModel[],
    onRowClicked: (category: ICategoryIdentityModel) => void,
    onCheckboxClicked: (category: ICategoryIdentityModel) => void
}

function CategoryExpanded(props: ICategoryExpandedProps) {
    const [isToggled, setToggled] = useState<boolean>(false);

    return <>
            <div>
                {
                    props.category.children.length !==  0 ?
                        <i className={!isToggled ? "fa fa-plus" : "fa fa-minus"} onClick={() => setToggled(!isToggled)}/>
                        : <></>
                }
                <input type="checkbox" checked={props.category.checked} onChange={e => props.onCheckboxClicked(props.category)}/>
                <div onClick={e => props.onRowClicked(props.category)}>
                    {props.category.name}
                </div>
            </div>
            {!isToggled ? <></> : <CategoryExpandedList categories={props.category.children} onCheckboxClicked={props.onCheckboxClicked} onRowClicked={props.onRowClicked}/>}
    </>
}

interface ICategoryExpandedProps {
    category: ICategoryIdentityModel,
    onRowClicked: (category: ICategoryIdentityModel) => void,
    onCheckboxClicked: (category: ICategoryIdentityModel) => void
}
import {AppState} from "../../../redux/reducers";
import {CategoryComponentState} from "../../../redux/reducers/local/categoryComponent";
import {useDispatch, useSelector} from "react-redux";
import {ICategory} from "../../../domain/types";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {useEffect, useState} from "react";
import {getCategoriesThunk} from "../../../redux/reducers/local/categoryComponent/thunk";
import {LanguageState} from "../../../redux/reducers/languages";

export default function CategoryGroupTree() {
    const local = useSelector<AppState, CategoryComponentState>(x => x.local.categoryComponent);
    const catalogGroupsState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoriesThunk({catalogGroup: catalogGroupsState.selected.id, languageId: languageState.selected.id}))
    }, [catalogGroupsState.selected.id])

    return <>
        {local.isCategoriesLoading
            ? "Loading"
            : <CategoryExpandedList categories={local.categories}/>
        }
    </>;
}

function CategoryExpandedList(props: ICategoryExpandedListProps) {
    return <ul>
        {props.categories.map(x => <li>
            <CategoryExpanded category={x}/>
        </li>)}
    </ul>
}

interface ICategoryExpandedListProps {
    categories: ICategory[]
}

function CategoryExpanded(props: ICategoryExpandedProps) {
    const [isToggled, setToggled] = useState<boolean>(false);

    return <>
            <div>
                {
                    props.category.children.length !==  0 ?
                        <i className="fa fa-plus" onClick={() => setToggled(!isToggled)}/>
                        : <></>
                }
                <input type="checkbox"/>
                {props.category.name}
            </div>
            {!isToggled ? <></> : <CategoryExpandedList categories={props.category.children}/>}
    </>
}

interface ICategoryExpandedProps {
    category: ICategory
}
import {ICategoryIdentityModel} from "../tables/productGroupTable/types";
import "./categoryExpandedList.scss"
import {useState} from "react";

export default function CategoryExpandedList(props: ICategoryExpandedListProps) {
    return <>
        {props.categories.map(x => <CategoryExpanded spanLevel={props.spanLevel} key={x.id} category={x} onCheckboxClicked={props.onCheckboxClicked} onRowClicked={props.onRowClicked}/>)}
    </>
}

interface ICategoryExpandedListProps {
    categories: ICategoryIdentityModel[],
    onRowClicked: (category: ICategoryIdentityModel) => void,
    onCheckboxClicked: (category: ICategoryIdentityModel) => void,
    spanLevel: number
}

function CategoryExpanded(props: ICategoryExpandedProps) {
    const [isToggled, setToggled] = useState<boolean>(false);

    return <>
        <li className="cat-category-group-list__element span-indent-wrapper">
            { Array.from({ length: props.spanLevel }, (_, i) =>
              <span key={i} className="li-indent" />)
            }
            <div className="cat-category-group-list">
                {
                    props.category.children.length !==  0 ?
                      <i className={!isToggled ? "fa fa-plus" : "fa fa-minus"} onClick={() => setToggled(!isToggled)}/>
                      : <></>
                }
                <div className="my-custom-checkbox__wrapper">
                    <input type="checkbox" className="my-custom-checkbox" id={String(props.category.id)} checked={props.category.checked} onChange={e => props.onCheckboxClicked(props.category)}/>
                    <label htmlFor={String(props.category.id)}/>
                </div>
                <div onClick={e => props.onRowClicked(props.category)}>
                    {props.category.name}
                </div>
            </div>
        </li>

        {!isToggled ? <></> : <CategoryExpandedList spanLevel={props.spanLevel + 1} categories={props.category.children} onCheckboxClicked={props.onCheckboxClicked} onRowClicked={props.onRowClicked}/>}
    </>
}

interface ICategoryExpandedProps {
    category: ICategoryIdentityModel,
    onRowClicked: (category: ICategoryIdentityModel) => void,
    onCheckboxClicked: (category: ICategoryIdentityModel) => void,
    spanLevel: number
}
import {ICategoryIdentityModel} from "../tables/productGroupTable/types";
import {useState} from "react";

export default function CategoryExpandedList(props: ICategoryExpandedListProps) {
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
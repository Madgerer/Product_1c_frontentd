import CategoryGroupToolbar from "./CategoryGroupToolbar";
import CategoryGroupTree from "./CategoryGroupTree";

export default function CategoryGroupList() {
    return <div className={"cat-category-group-list-container"}>
        <CategoryGroupToolbar/>
        <CategoryGroupTree/>
    </div>
}
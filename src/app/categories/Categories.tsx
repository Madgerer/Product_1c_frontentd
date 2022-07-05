import "./categories.scss"
import SelectorBlock from "./selectorBlock/SelectorBlock";
import ProductGroupList from "./productGroupsList/ProductGroupList";
import CategoryForm from "../common/category/CategoryForm";

export default function Categories() {

    return <div className="cat-container">
        <SelectorBlock/>
        <ProductGroupList/>
        <div className={"cat-category-group-list-container"}>
            <CategoryForm/>
        </div>
    </div>
}
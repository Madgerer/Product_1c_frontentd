import "./categories.scss"
import SelectorBlock from "./selectorBlock/SelectorBlock";
import ProductGroupList from "./productGroupsList/ProductGroupList";
import CategoryGroupList from "./categoryGroupsList/CategoryGroupList";

export default function Categories() {

    return <div className="cat-container">
        <SelectorBlock/>
        <ProductGroupList/>
        <CategoryGroupList/>
    </div>
}
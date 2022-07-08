import "./categories.scss"
import SelectorBlock from "./selectorBlock/SelectorBlock";
import ProductGroupList from "./productGroupsList/ProductGroupList";
import CategoryForm from "../common/category/CategoryForm";
import {useSelector} from "react-redux";
import { AppState } from "../../redux/reducers";
import {CategoryComponentState} from "../../redux/reducers/local/categoryComponent";
import _ from "lodash";

export default function Categories() {
    const local = useSelector<AppState, CategoryComponentState>(x => x.local.categoryComponent)
    let categoriesToHighlight = local.productGroupsWithCategoriesPath.flatMap(x => x.categoryPath);
    categoriesToHighlight = _.uniq(categoriesToHighlight);

    return <div className="cat-container">
        <SelectorBlock/>
        <ProductGroupList/>
        <div className={"cat-category-group-list-container"}>
            <CategoryForm highlightedCategories={categoriesToHighlight}/>
        </div>
    </div>
}
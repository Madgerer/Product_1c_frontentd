import TreeSelectorBlock from "./treeSelectorBlock/TreeSelectorBlock";
import "./tree.scss"
import CategoryForm from "../common/category/CategoryForm";
import TreeGroupList from "./treeGroupTable/TreeGroupList";

export default function Tree() {
    return <div className="tree-container">
        <TreeSelectorBlock/>
        <div className="tree-category-group-list-container">
            <CategoryForm highlightedCategories={[]}/>
        </div>
        <TreeGroupList/>
    </div>
}
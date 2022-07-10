import TreeSelectorBlock from "./treeSelectorBlock/TreeSelectorBlock";
import "./tree.scss"
import CategoryForm from "../common/category/CategoryForm";
import TreeGroupList from "./treeGroupTable/TreeGroupList";
import {useEffect, useLayoutEffect} from "react";
import {useDispatch} from "react-redux";
import {actions} from "../../redux/reducers/local/treeComponent";

export default function Tree() {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        return function () {
            dispatch(actions.clearStateOnUnmount())
        }
    }, [])

    useEffect(() => {
        dispatch(actions.setWasInit())
    }, [])

    return <div className="tree-container">
        <TreeSelectorBlock/>
        <div className="tree-category-group-list-container">
            <CategoryForm highlightedCategories={[]}/>
        </div>
        <TreeGroupList/>
    </div>
}
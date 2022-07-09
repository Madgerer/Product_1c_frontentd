import TreeGroupToolbar from "./TreeGroupToolbar";
import TreeGroupTable from "./TreeGroupTable";
import "./TreeGroupList.scss"

export default function TreeGroupList() {
    return <div className="tree-group-list u-flex-column">
        <TreeGroupToolbar/>
        <TreeGroupTable/>
    </div>
}
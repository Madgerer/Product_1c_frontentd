import CatalogsBlock from "./CatalogsBlock";
import ScopeBlock from "./ScopeBlock";

export default function CategoryTab() {
    return <div className="tab-pane row">
        <CatalogsBlock/>
        <ScopeBlock/>
    </div>
}
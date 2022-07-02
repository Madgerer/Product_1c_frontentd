import CardTypeSelector from "../../common/cardSelector/CardSelector";

export default function ProductGroupListToolbar(){
    return <div className="cat-product-group-list-toolbar-container">
        <form className="form-inline">
            <button id="addButton" title="Добавить выделенные карточки в категорию" type="button"
                    className="btn btn-dark"><i className="fa fa-plus" aria-hidden="true"></i></button>
            <div className="cat-product-group-list-toolbar-select-container">
                <CardTypeSelector/>
            </div>
            <div className="ml-auto" style={{float: "right"}}>
                <input type="text" className="form-control" placeholder="Search"/>
            </div>
        </form>
    </div>
}
import "./categoryGroupToolbar.scss"

export default function CategoryGroupToolbar() {
    return <div className="input-group-sm cat-category-group-toolbar-container">
        <div className="col-md-12 input-group-sm">
            <button title="Добавить категорию" type="button" className="btn btn-dark">
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
            <button title="Изменить наименование выделенной категории" type="button" className="btn btn-dark">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
            <button title="Удалить выделенную категорию" type="button" className="btn btn-dark">
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <input className="form-control" id="NameCat" placeholder="Наименование новой категории" style={{marginTop: 10}}/>
            <input className="form-control" type="text" id="Change" placeholder="" style={{marginTop: 10}}/>
        </div>
    </div>
}
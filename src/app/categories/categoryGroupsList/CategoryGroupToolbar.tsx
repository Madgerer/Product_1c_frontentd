import "./categoryGroupToolbar.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, CategoryComponentState} from "../../../redux/reducers/local/categoryComponent";

export default function CategoryGroupToolbar() {
    const local = useSelector<AppState, CategoryComponentState>(x => x.local.categoryComponent);
    const dispatch = useDispatch();

    function setCurrentValue(name: string) {
        dispatch(actions.setCurrentCategoryName(name))
    }

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
            <input className="form-control" placeholder="Наименование новой категории" style={{marginTop: 10}}/>
            <input className="form-control"
                   onChange={e => setCurrentValue(e.currentTarget.value)}
                   value={local.categoryCurrentName}
                   type="text"
                   placeholder="" style={{marginTop: 10}}/>
        </div>
    </div>
}
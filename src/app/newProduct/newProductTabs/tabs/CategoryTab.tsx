import CatalogSelector, {CatalogFilter} from "../../../common/catalogSelector/CatalogSelector";
import CategorySelectRow from "../CategorySelectRow";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../redux/reducers";
import {actions, NewProductState} from "../../../../redux/reducers/local/newProduct";
import {ICategory} from "../../../../domain/types";

export default function CategoryTab() {
    const local = useSelector<AppState, NewProductState>(x => x.local.newProductState)
    const dispatch = useDispatch();

    const setSelectedPrintedCategory = (category: ICategory | null) => dispatch(actions.setSelectedPrintedCategory(category))


    return <div className="tab-pane row">
        <div className="item col-md-12">
            <div>
                <h2>Категории в каталоге</h2>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa fa-minus" aria-hidden="true"></i>
                </button>
                <CatalogSelector filter={CatalogFilter.Printed}/>
                <CategorySelectRow categories={local.categoriesPrinted} onChange={c => {setSelectedPrintedCategory(c)}}/>
            </div>
            Вот тут какая-то нерабочая таблица
        </div>
        <div className="item col-md-12">
            <div>
                <h2>Категории на сайт</h2>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    Сделать главной
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa fa-minus" aria-hidden="true"></i>
                </button>
                <div>Раскрывающийся селектор</div>
            </div>
            Вот тут какая-то нерабочая таблица
        </div>
        <div className="item col-md-12">
            <div>
                <h2>Категории на сайт</h2>
                <button type="button" className="btn btn-dark">
                    <i className="fa  fa-plus" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button type="button" className="btn btn-dark">
                    Сделать главной
                </button>
                <button type="button" className="btn btn-dark">
                    <i className="fa fa fa-minus" aria-hidden="true"></i>
                </button>
                <div>Селектор scope of application</div>
            </div>
            Какая-то не рабочая таблица
        </div>
    </div>
}
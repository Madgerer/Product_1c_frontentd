import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, NewProductState} from "../../../redux/reducers/local/newProduct";
import {Link} from "react-router-dom";
import NewProductSelectorBlock from "./NewProductSelectorBlock";

export default function NewProductToolbar() {
    const local = useSelector<AppState, NewProductState>(x => x.local.newProductState);
    const dispatch = useDispatch();

    const setId = (id: string) => dispatch(actions.setId(id))
    const setName = (name: string) => dispatch(actions.setName(name))
    const setIsToolset = () => {
    }

    const setIsDescriptionChecked = () => {
    }

    const setIsPhotoChecked = () => {
    }

    return <>
        <div className="col-md-1 input-group-sm" style={{marginTop: 20}}>
            <input className="form-control" disabled={local.productGroup.wasCreate} onChange={e => setId(e.target.value)} value={local.productGroup.id} placeholder="№"/>
        </div>
        <div className="col-md-4 input-group-sm" style={{marginTop: 20}}>
            <input className="form-control" onChange={e => setName(e.target.value)} value={local.productGroup.name ?? ""} placeholder="Наименование новой карточки"/>
        </div>
        <label className="form-check-label" style={{marginLeft:10}} onClick={() => {setIsToolset()}}>
            <input type="checkbox" checked={local.productGroup.isToolset ?? false} readOnly={true}/>
            <span>Набор</span>
        </label>
        <label className="form-check-label" style={{marginLeft:10}} onClick={() => setIsDescriptionChecked()}>
            <input type="checkbox" checked={local.productGroup.isDescriptionChecked ?? false} readOnly={true}/>
            <span>Описание</span>
        </label>
        <label className="form-check-label" style={{marginLeft:10}}  onClick={() => setIsPhotoChecked()}>
            <input type="checkbox" className="form-check-input" checked={local.productGroup.isImageChecked ?? false} readOnly={true}/>
            <span>Фото</span>
        </label>
        <button id="save" title="Сохранить изменения" type="button" className="btn btn-dark btn-sm">
            <i className="fa fa-floppy-o" aria-hidden="true"/>
        </button>
        <button id="deleteGroup" title="Удалить карточку" type="button" className="btn btn-danger btn-sm">
            <i className="fa fa-trash" aria-hidden="true"/>
        </button>
        <button type="button" className="btn btn-dark btn-sm"><Link to={"/"} target="_blank">Вернуться на главную</Link></button>
        <button type="button" className="btn btn-dark btn-sm">• в буффер обмена</button>

        <NewProductSelectorBlock/>
    </>
}
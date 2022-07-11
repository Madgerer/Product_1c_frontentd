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
    const setIsToolset = () => dispatch(actions.setIsToolset())
    const setIsDescriptionChecked = () => dispatch(actions.setIsDescrChecked())
    const setIsPhotoChecked = () => dispatch(actions.setIsImageChecked())

    return <>
        <div className="col-md-1 input-group-sm" style={{marginTop: 20}}>
            <input className="form-control" disabled={local.productGroup.wasCreate} onChange={e => setId(e.target.value)} value={local.productGroup.id} placeholder="№"/>
        </div>
        <div className="col-md-4 input-group-sm" style={{marginTop: 20}}>
            <input className="form-control" onChange={e => setName(e.target.value)} value={local.productGroup.name ?? ""} placeholder="Наименование новой карточки"/>
        </div>

        <input id="isToolset" type="checkbox" checked={local.productGroup.isToolset ?? false} readOnly={true}/>
        <label htmlFor="isToolset" className="form-check-label" style={{marginLeft:10}} onClick={() => {setIsToolset()}}>
            Набор
        </label>

        <input id="isDescrChecked" type="checkbox" checked={local.productGroup.isDescriptionChecked ?? false} readOnly={true}/>
        <label htmlFor="isDescrChecked" className="form-check-label" style={{marginLeft:10}} onClick={() => setIsDescriptionChecked()}>
            Описание
        </label>

        <input id="isImageChecked" type="checkbox" className="form-check-input" checked={local.productGroup.isImageChecked ?? false} readOnly={true}/>
        <label htmlFor="isImageChecked" className="form-check-label" style={{marginLeft:10}}  onClick={() => setIsPhotoChecked()}>
            Фото
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
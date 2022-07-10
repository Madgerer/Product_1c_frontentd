import {PhraseTypes} from "../../../redux/reducers/local/translateComponent";
import {useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {NewProductState} from "../../../redux/reducers/local/newProduct";
import {Link} from "react-router-dom";

export default function NewProductToolbar() {
    const local = useSelector<AppState, NewProductState>(x => x.local.newProductState);

    function setId(id: string) {

    }

    function setName(name: string) {

    }

    function setIsToolset() {

    }

    function setIsDescriptionChecked() {

    }

    function setIsPhotoChecked() {

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

        <div>Селектор серии</div>
        <div>Селектор значков</div>
        <div>Селектор аттрибутов</div>
        <div>Селектор торговой марки</div>
    </>
}
import {PhraseTypes} from "../../../redux/reducers/local/translateComponent";

export default function NewProductToolbar() {
    return <>
        <div className="col-md-1 input-group-sm" style={{marginTop: 20}}>
            <input className="form-control" id="productGroupID" placeholder="№"/>
        </div>
        <div className="col-md-4 input-group-sm" style={{marginTop: 20}}>
            <input className="form-control" id="productName" placeholder="Наименование новой карточки"/>
        </div>
        <label className="form-check-label" style={{marginLeft:10}}>
            <input type="checkbox"  className="form-check-input"/>
            <span>Набор</span>
        </label>
        <label className="form-check-label" style={{marginLeft:10}}>
            <input type="checkbox"  className="form-check-input"/>
            <span>Описание</span>
        </label>
        <label className="form-check-label" style={{marginLeft:10}}>
            <input type="checkbox"  className="form-check-input"/>
            <span>Фото</span>
        </label>
        <button id="save" title="Сохранить изменения" type="button" className="btn btn-dark btn-sm"><i
            className="fa fa-floppy-o" aria-hidden="true"></i></button>
        <button id="deleteGroup" title="Удалить карточку" type="button" className="btn btn-danger btn-sm"><i
            className="fa fa-trash" aria-hidden="true"></i></button>
        <button id="return" type="button" className="btn btn-dark btn-sm">Вернуться на главную</button>
        <button id="copy" type="button" className="btn btn-dark btn-sm">• в буффер обмена</button>
        <div>Селектор языка</div>
        <div>Селектор серии</div>
        <div>Селектор значков</div>
        <div>Селектор аттрибутов</div>
        <div>Селектор торговой марки</div>
    </>
}
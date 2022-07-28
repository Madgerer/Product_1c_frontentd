import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {actions, PhraseTypes, TranslateComponentState} from "../../redux/reducers/local/translateComponent";
import "./TranslateForm.scss"

export function TranslateForm() {
    const local = useSelector<AppState, TranslateComponentState>(x => x.local.translateComponent);
    const dispatch = useDispatch();

    function setPhraseType(type: PhraseTypes) {
        dispatch(actions.setPhaseType(type))
    }

    return <div className = "translate-form u-flex-column" >
        <button className="btn btn-dark" style={{marginTop: 15}}><span>Выгрузка</span></button>
        <button className="btn btn-dark" style={{marginTop: 15}}><span>Справочник переводов</span></button>
        <button className="btn btn-dark" style={{marginTop: 15}}><span>Загрузить фразы на русском из 6 таблиц в БД</span></button>
        <button className="btn btn-dark" style={{marginTop: 15}}><span>Загрузить фразы из файла в справочник переводов</span></button>
        {/*<div className="form-group">
            <label htmlFor="FormControlFile">Выберите Excel файл для загрузки</label>
            <input type="file" className="form-control-file" enctype="multipart/form-data" name="excelFile"
                   id="FormControlFile">
        </div>*/}
        <form className="form-inline">
            <div className="d-flex flex-column align-items-start">
                <h4 >Форма для переводчика</h4>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" checked={local.phraseType == PhraseTypes.NotTranslated} className="form-check-input" onChange={() => setPhraseType(PhraseTypes.NotTranslated)}/>
                    <span>Только не переведенные</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" checked={local.phraseType == PhraseTypes.All} className="form-check-input" onChange={() => setPhraseType(PhraseTypes.All)}/>
                    <span>Все фразы</span>
                </label>
                    <button id="translatorPage" type="button" className="btn btn-dark" >
                        <span>Открыть форму для переводчика</span>
                    </button>
            </div>
        </form>
        <button type="button" className="btn btn-dark" style={{marginTop:10}}><span>Загрузить
            информацию на сайт</span>
        </button>
        <button type="button" className="btn btn-dark" style={{marginTop:15}}><span>Сравнить контент
            сайта с блоком каталогов</span>
        </button>
    </div>
}
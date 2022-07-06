import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {LanguageState} from "../../redux/reducers/languages";
import {actions, TranslateComponentState} from "../../redux/reducers/local/translateComponent";
import SimpleSelect from "../common/SimpleSelect";
import ToOptionProvider from "../../utils/ToOptionProvider";
import CatalogSelector, {CatalogFilter} from "../common/catalogSelector/CatalogSelector";
import WebsiteSelector from "../common/websiteSelector/WebsiteSelector";


export function TranslateSettings() {
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const local = useSelector<AppState, TranslateComponentState>(x => x.local.translateComponent)
    const dispatch = useDispatch();

    function setLocalLanguage(languageId: number){
        const language = languageState.languages.find(x => x.id == languageId);
        dispatch(actions.setLanguage(language))
    }

    return <>
        <div>
            <SimpleSelect value={local.selectedLanguage} options={languageState.languages} onChange={setLocalLanguage} toOption={ToOptionProvider.websiteToOption} className={"selector"}/>
        </div>
        <div>
            <CatalogSelector filter={CatalogFilter.All}/>
        </div>
        <div>
            <WebsiteSelector/>
        </div>
        <div className="row col-md-12">
            <form className="form-inline col-md-4">
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>КатегорииПК</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>КатегорииСайт</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>Атрибуты</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>Пиктограммы</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>ТехОписание</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"/>
                    <span>ОписаниеК2У</span>
                </label>
            </form>
            <div className="col-md-8">
                <button id="LightAll" type="button" className="btn btn-dark" style={{marginTop:15}}>Выделить все</button>
                <button id="HideAll" type="button" className="btn btn-dark" style={{marginTop:15}}>Очистить все</button>
            </div>
        </div>
    </>
}
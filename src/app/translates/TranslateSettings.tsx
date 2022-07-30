import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {LanguageState} from "../../redux/reducers/languages";
import {actions, TranslateComponentState} from "../../redux/reducers/local/translateComponent";
import SimpleSelect from "../common/basic/selectors/SimpleSelect";
import ToOptionProvider from "../../utils/ToOptionProvider";
import CatalogSelector, {CatalogFilter} from "../common/catalogSelector/CatalogSelector";
import WebsiteSelector from "../common/websiteSelector/WebsiteSelector";
import "./TranslateSettings.scss"


export function TranslateSettings() {
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const local = useSelector<AppState, TranslateComponentState>(x => x.local.translateComponent)
    const dispatch = useDispatch();

    function setLocalLanguage(languageId: number){
        const language = languageState.languages.find(x => x.id == languageId);
        dispatch(actions.setLanguage(language))
    }

    function setTranslateCategoryChecked(isChecked: boolean) {
        dispatch(actions.setTranslateCategoryChecked(isChecked))
    }

    function setPcChecked(isChecked: boolean) {
        dispatch(actions.setPcChecked(isChecked))
    }

    function setAttributesChecked(isChecked: boolean) {
        dispatch(actions.setAttributesChecked(isChecked))
    }

    function setPictogramsChecked(isChecked: boolean) {
        dispatch(actions.setPictogramsChecked(isChecked))
    }

    function setK2UChecked(isChecked: boolean) {
        dispatch(actions.setK2UChecked(isChecked))
    }

    function setSiteChecked(isChecked: boolean) {
        dispatch(actions.setSiteChecked(isChecked))
    }

    function setTechDescriptionChecked(isChecked: boolean) {
        dispatch(actions.setTechDescriptionChecked(isChecked))
    }

    return <div className="translate-settings u-flex-column">
        <div className="translate-settings__select">
            <SimpleSelect value={local.selectedLanguage} options={languageState.languages} onChange={setLocalLanguage} toOption={ToOptionProvider.languageToOption} className={"selector"}/>
        </div>
        <div className="translate-settings__select">
            <CatalogSelector filter={CatalogFilter.All}/>
        </div>
        <div className="translate-settings__select">
            <WebsiteSelector/>
        </div>
        <div className="form-inline">
            <form className="form-inline form-checkboxes">
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"
                           checked={local.translateCategories.isPcChecked}
                           onChange={() => setPcChecked(!local.translateCategories.isPcChecked)}/>
                    <span>КатегорииПК</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"
                           checked={local.translateCategories.isSiteChecked}
                           onChange={() => setSiteChecked(!local.translateCategories.isSiteChecked)}/>
                    <span>КатегорииСайт</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"
                           checked={local.translateCategories.isAttributesChecked}
                           onChange={() => setAttributesChecked(!local.translateCategories.isAttributesChecked)}/>
                    <span>Атрибуты</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"
                           checked={local.translateCategories.IsPictogramsChecked}
                           onChange={() => setPictogramsChecked(!local.translateCategories.IsPictogramsChecked)}/>
                    <span>Пиктограммы</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"
                           checked={local.translateCategories.IsTechDescriptionChecked}
                           onChange={() => setTechDescriptionChecked(!local.translateCategories.IsTechDescriptionChecked)}/>
                    <span>ТехОписание</span>
                </label>
                <label className="form-check-label" style={{marginLeft:10}}>
                    <input type="checkbox" className="form-check-input"
                           checked={local.translateCategories.IsK2UChecked}
                           onChange={() => setK2UChecked(!local.translateCategories.IsK2UChecked)}/>
                    <span>ОписаниеК2У</span>
                </label>
            </form>
            <div className="buttons-wrapper">
                <button type="button" className="btn btn-dark" style={{marginTop:15}} onClick={() => setTranslateCategoryChecked(true)}><span>Выделить все</span></button>
                <button type="button" className="btn btn-dark" style={{marginTop:15}} onClick={() => setTranslateCategoryChecked(false)}><span>Очистить все</span></button>
            </div>
        </div>
    </div>
}
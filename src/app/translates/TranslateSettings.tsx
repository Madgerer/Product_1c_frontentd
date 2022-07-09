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
            <div className="col-md-8">
                <button type="button" className="btn btn-dark" style={{marginTop:15}} onClick={() => setTranslateCategoryChecked(true)}>Выделить все</button>
                <button type="button" className="btn btn-dark" style={{marginTop:15}} onClick={() => setTranslateCategoryChecked(false)}>Очистить все</button>
            </div>
        </div>
    </>
}
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {actions, BullfactState} from "../../redux/reducers/local/bullfactsComponent";
import TextCheckbox from "../common/basic/checkboxes/TextCheckbox";
import {LanguageState} from "../../redux/reducers/languages";
import SimpleSelect from "../common/basic/selectors/SimpleSelect";
import ToOptionProvider from "../../utils/ToOptionProvider";
import CatalogSelector, {CatalogFilter} from "../common/catalogSelector/CatalogSelector";
import {useDebouncedCallback} from "use-debounce";

export default function BullfactsToolbar() {

    const local = useSelector<AppState, BullfactState>(x => x.local.bullfactsComponent)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const dispatch = useDispatch();

    const setSearch = (search: string) => dispatch(actions.setSearch(search))
    const debouncedSetSearch = useDebouncedCallback(args => setSearch(args), 500)

    const setSemanticSearch = (search: string) => dispatch(actions.setSemanticSearch(search))
    const debouncedSetSemanticSearch = useDebouncedCallback(args => setSemanticSearch(args), 500)

    const setIsSemanticSearch = () => dispatch(actions.setIsSemanticSearch())
    const setLocalLanguage = (languageId: number) => {
        const language = languageState.languages.find(x => x.id == languageId);
        dispatch(actions.setLanguage(language!))
    }

    const setTranslateType = (value: number) => dispatch(actions.setTranslateType(value))
    const setTranslateSource = (value: number) => dispatch(actions.setTranslatedSource(value))

    return <div>
        <input disabled={local.isSemanticSearchDisabled}
               className="form-control"
               onChange={e => debouncedSetSearch(e.currentTarget.value)}
               type="search"
               placeholder="Поиск"/>
        <TextCheckbox onChange={() => setIsSemanticSearch()} text={"Полнотекстовый поиск"} isChecked={local.isSemanticSearchDisabled}/>
        <input
            onChange={e => debouncedSetSemanticSearch(e.currentTarget.value)}
            className="form-control"
            type="search"
            placeholder="Поиск по смыслу" hidden={!local.isSemanticSearchDisabled}/>

        <SimpleSelect value={local.selectedLanguage}
                      options={languageState.languages}
                      onChange={setLocalLanguage}
                      toOption={ToOptionProvider.languageToOption}
                      className={"selector"}/>
        <SimpleSelect value={local.selectedTranslateType} options={local.translateTypes} onChange={e => setTranslateType(e)} toOption={x => x}/>
        <CatalogSelector filter={CatalogFilter.Printed}/>
        <SimpleSelect value={local.selectedTranslateSource} options={local.translateSources} onChange={e => setTranslateSource(e)} toOption={x => x}/>
    </div>
}
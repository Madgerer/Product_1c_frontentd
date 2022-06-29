import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {AuthState} from "../../redux/reducers/auth";
import {LanguageState} from "../../redux/reducers/languages";
import {actions, reducer, caseReduces} from "../../redux/reducers/languages";
import exp from "constants";
import {useEffect} from "react";
import {uploadLanguagesThunk} from "../../redux/reducers/languages/thunk";

function LanguageSelector() {
    const languageState = useSelector<AppState, LanguageState>(s => s.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(uploadLanguagesThunk())
    },[])

    return <div className="form-group input-group-sm navbar-select-container">
        <select className="form-control navbar-select" id="langSelect">
            {languageState.languages.map((lang, i) => {
                const selected = lang.id === languageState.selectedLanguage.id;
                return <option value={lang.id} selected={selected}>{lang.name}</option>
            })}
            {/*<option value="1">Английский</option>
            <option value="2">Немецкий</option>
            <option value="3">Польский</option>
            <option value="4">Латышский</option>
            <option value="5">Чешский</option>
            <option value="6">Венгерский</option>
            <option value="7">Румынский</option>
            <option value="8">Французский</option>
            <option value="9">Итальянский</option>
            <option value="10">Испанский</option>
            <option value="11" selected={true}>Русский</option>
            <option value="12">Литовский</option>
            <option value="13">Эстонский</option>
            <option value="14">Украинский</option>
            <option value="15">Болгарский</option>*/}
        </select>
    </div>
}

export default LanguageSelector
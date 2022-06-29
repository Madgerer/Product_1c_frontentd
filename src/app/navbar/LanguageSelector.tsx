import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {AuthState} from "../../redux/reducers/auth";
import {LanguageState} from "../../redux/reducers/languages";
import {actions, reducer, caseReduces} from "../../redux/reducers/languages";
import exp from "constants";
import {useEffect} from "react";
import {uploadLanguagesThunk} from "../../redux/reducers/languages/thunk";
import {isUndefined} from "lodash";

function LanguageSelector() {
    const state = useSelector<AppState, LanguageState>(s => s.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(uploadLanguagesThunk())
    },[])
    const selected = state.languages.find(x => x.id === state.selectedLanguage.id)
    if(isUndefined(selected)) {
        dispatch(actions.setSelected(state.languages[0]))
    }

    return <div className="form-group input-group-sm navbar-select-container">
        <select className="form-control navbar-select" id="langSelect" value={state.selectedLanguage.id}>
            {state.languages.map((lang, i) => <option value={lang.id}>{lang.name}</option>)}
        </select>
    </div>
}

export default LanguageSelector
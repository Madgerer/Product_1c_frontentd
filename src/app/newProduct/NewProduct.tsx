import NewProductToolbar from "./newProductToolbar/NewProductToolbar";
import NewProductTabs from "./newProductTabs/NewProductTabs";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {LanguageState} from "../../redux/reducers/languages";
import {useEffect} from "react";

export default function NewProduct() {
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        if(languageState.selected.id == 0)
            return;

    },[languageState.selected.id])

    return <div>
        <NewProductToolbar/>
        <NewProductTabs/>
    </div>
}
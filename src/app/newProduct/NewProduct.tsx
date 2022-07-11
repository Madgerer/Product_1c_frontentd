import NewProductToolbar from "./newProductToolbar/NewProductToolbar";
import NewProductTabs from "./newProductTabs/NewProductTabs";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {LanguageState} from "../../redux/reducers/languages";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getCategoriesThunk, getOrCreateThunk} from "../../redux/reducers/local/newProduct/thunks";
import {useLocation} from "react-router";
import {NewProductState} from "../../redux/reducers/local/newProduct";
import {CatalogGroup} from "../../domain/types";

export default function NewProduct() {
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const local = useSelector<AppState, NewProductState>(x => x.local.newProductState);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const paramGroupId = searchParams.get('productGroupId');
    const navigate = useNavigate();
    const location = useLocation();

    if(paramGroupId == null && local.productGroup.id != "") {
        navigate(location.pathname+`?productGroupId=${local.productGroup.id}`, {replace:true} /*''*/)
    }

    useEffect(() => {
        if(languageState.selected.id == 0)
            return;
        dispatch(getOrCreateThunk({productGroupId: paramGroupId, languageId: languageState.selected.id}))
        dispatch(getCategoriesThunk({catalogGroup: CatalogGroup.Printed, languageId: languageState.selected.id}))
        dispatch(getCategoriesThunk({catalogGroup: CatalogGroup.Web, languageId: languageState.selected.id}))
    },[languageState.selected.id])

    return <div>
        <NewProductToolbar/>
        <NewProductTabs/>
    </div>
}
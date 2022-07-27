import './GroupCatalogsBlock.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {CategoriesTabState} from "../../../../../redux/reducers/local/newProduct/categoryTabComponent";
import {useEffect} from "react";
import {AdditionalInfoState} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent";
import WebsiteSelector from "../../../../common/websiteSelector/WebsiteSelector";
import TextButton from "../../../../common/basic/buttons/TextButton";
import {
    getProductGroupCatalogsThunk
} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent/thunks";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";

export default function GroupCatalogsBlock() {

    const local = useSelector<AppState, AdditionalInfoState>(x => x.local.newProductState.additionalInfoState)
    const categoryTabState = useSelector<AppState, CategoriesTabState>(x => x.local.newProductState.categoryState)
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductGroupCatalogsThunk({productGroupId: productGroupState.productGroup.id}))
    }, [categoryTabState.currentPrintedCategories.length, categoryTabState.currentWebCategories.length])

    const setShowStatus = () => {

    }

    return <div>
        <div>
            <TextButton text={"Показывать/Не показывать"} onClick={() => {}}/>
            <WebsiteSelector/>

            <button type="button" className="btn btn-dark">
                Добавить на сайт
            </button>
        </div>
        <div>Какая-то таблица</div>
    </div>
}
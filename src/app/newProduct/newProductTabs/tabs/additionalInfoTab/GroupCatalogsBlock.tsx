import './GroupCatalogsBlock.scss'
import {useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {CategoriesTabState} from "../../../../../redux/reducers/local/newProduct/categoryTabComponent";
import {useEffect} from "react";
import {AdditionalInfoState} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent";
import WebsiteSelector from "../../../../common/websiteSelector/WebsiteSelector";
import TextButton from "../../../../common/basic/buttons/TextButton";

export default function GroupCatalogsBlock() {

    const local = useSelector<AppState, AdditionalInfoState>(x => x.local.newProductState.additionalInfoState)
    const categoryTabState = useSelector<AppState, CategoriesTabState>(x => x.local.newProductState.categoryState)

    useEffect(() => {

    }, [categoryTabState.currentPrintedCategories.length, categoryTabState.currentWebCategories.length])

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
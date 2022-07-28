import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {actions, AdditionalInfoState} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent";
import FaButton from "../../../../common/basic/buttons/FaButton";
import ToOptionProvider from "../../../../../utils/ToOptionProvider";
import {useEffect} from "react";
import {LanguageState} from "../../../../../redux/reducers/languages";
import {
    addRecommendationsThunk,
    getAllRecommendationThunk,
    getGroupRecommendationThunk, removeRecommendationThunk, swapRecommendationSortThunk
} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent/thunks";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import _ from "lodash";
import {Table} from "react-bootstrap";
import FastNullableSelector from "../../../../common/basic/selectors/FastNullableSelector";
import TextButton from "../../../../common/basic/buttons/TextButton";
import {IMountableProps} from "../../../../../redux/types";
import {CategoriesTabState} from "../../../../../redux/reducers/local/newProduct/categoryTabComponent";
import RecommendationBlock from "./RecommendationBlock";
import GroupCatalogsBlock from "./GroupCatalogsBlock";

export default function AdditionalInfoTab(props: IMountableProps) {

    useEffect(() => {
        props.onMount()
    }, [])

    return <div className="tab-pane">
        <RecommendationBlock/>
        <GroupCatalogsBlock/>
    </div>
}
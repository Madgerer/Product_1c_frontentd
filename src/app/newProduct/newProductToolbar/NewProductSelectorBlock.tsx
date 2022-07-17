import './newProductSelectorBlock.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, NewProductState} from "../../../redux/reducers/local/newProduct";
import {useEffect} from "react";
import {
    getAttributesThunk,
    getPriceGroupsThunk,
    getSeriesThunk,
    getSignsThunk
} from "../../../redux/reducers/local/newProduct/thunks";
import NullableSelect from "../../common/NullableSelect";
import {LanguageState} from "../../../redux/reducers/languages";
import ToOptionProvider from "../../../utils/ToOptionProvider";

export default function NewProductSelectorBlock() {
    const local = useSelector<AppState, NewProductState>(x => x.local.newProductState.common);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        if(languageState.selected.id !== 0) {
            dispatch(getSignsThunk())
            dispatch(getSeriesThunk())
            dispatch(getAttributesThunk({languageId: languageState.selected.id}))
            dispatch(getPriceGroupsThunk())
        }
    },[languageState.selected.id])

    const setSeries = (seriesId: number | null) => dispatch(actions.setSelectedSeries(seriesId))
    const setSigns = (signId: number | null) => dispatch(actions.setSelectedSign(signId))
    const setAttribute = (attributeId: number | null) => dispatch(actions.setSelectedAttribute(attributeId))
    const setPriceGroup = (priceGroupId: number | null) => dispatch(actions.setSelectedPriceGroup(priceGroupId))

    return <div className="new-product-selector-block">
        <NullableSelect value={local.selectedSeries}
                        options={local.series}
                        placeholder={"Серия"}
                        onChange={e => {
                            console.log(e)
                            setSeries(e)

                        }}
                        toOption={ToOptionProvider.seriesToOption}
                        className={"selector"} />
        <NullableSelect value={local.selectedSign}
                        options={local.signs}
                        placeholder={"Значок"}
                        onChange={e => {setSigns(e)}}
                        toOption={ToOptionProvider.signToOption}
                        className={"selector"} />
        <NullableSelect value={local.selectedAttribute}
                        options={local.attributes}
                        placeholder={"Главный аттрибут"}
                        onChange={e => {setAttribute(e)}}
                        toOption={ToOptionProvider.attributeToOption}
                        className={"selector"} />
        <NullableSelect value={local.selectedPriceGroup}
                        options={local.priceGroups}
                        placeholder={"Торговая марка"}
                        onChange={e => {setPriceGroup(e)}}
                        toOption={ToOptionProvider.priceGroupToOption}
                        className={"selector"} />
    </div>
}
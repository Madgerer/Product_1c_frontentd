import './newProductSelectorBlock.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, NewProductState} from "../../../redux/reducers/local/newProduct";
import {useEffect} from "react";
import {
    getAttributesThunk,
    getSellmarksThunk,
    getSeriesThunk,
    getSignsThunk
} from "../../../redux/reducers/local/newProduct/thunks";
import NullableSelect from "../../common/basic/selectors/NullableSelect";
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
            dispatch(getSellmarksThunk())
        }
    },[languageState.selected.id])

    const setSeries = (seriesId: number | null) => dispatch(actions.setSelectedSeries(seriesId))
    const setSigns = (signId: number | null) => dispatch(actions.setSelectedSign(signId))
    const setAttribute = (attributeId: number | null) => dispatch(actions.setSelectedAttribute(attributeId))
    const setSellmark = (sellmarkId: number | null) => dispatch(actions.setSelectedSellmark(sellmarkId))

    return <div className="new-product-selector-block">
        <NullableSelect value={local.selectedSeries}
                        options={local.series}
                        placeholder={"Серия"}
                        onChange={e => setSeries(e as number)}
                        toOption={ToOptionProvider.seriesToOption}
                        height={31}
                        className={"selector"} />
        <NullableSelect value={local.selectedSign}
                        options={local.signs}
                        placeholder={"Значок"}
                        onChange={e => setSigns(e as number)}
                        height={31}
                        toOption={ToOptionProvider.signToOption}
                        className={"selector"} />
        <NullableSelect value={local.selectedAttribute}
                        options={local.attributes}
                        placeholder={"Главный аттрибут"}
                        onChange={e => setAttribute(e as number)}
                        toOption={ToOptionProvider.attributeToOption}
                        height={31}
                        className={"selector"} />
        <NullableSelect value={local.selectedSellmark}
                        options={local.sellmarks}
                        placeholder={"Торговая марка"}
                        onChange={e => setSellmark(e as number)}
                        toOption={ToOptionProvider.priceGroupToOption}
                        height={31}
                        className={"selector"} />
    </div>
}
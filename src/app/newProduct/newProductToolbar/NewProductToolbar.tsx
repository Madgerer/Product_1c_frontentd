import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, NewProductState} from "../../../redux/reducers/local/newProduct";
import {Link, useNavigate} from "react-router-dom";
import NewProductSelectorBlock from "./NewProductSelectorBlock";
import {
    createProductGroupThunk,
    deleteProductGroupThunk,
    discardReserveThunk, updateProductGroupThunk
} from "../../../redux/reducers/local/newProduct/thunks";
import {LanguageState} from "../../../redux/reducers/languages";
import _ from "lodash";
import "./newProductToolbar.scss"
import TextCheckbox from "../../common/basic/checkboxes/TextCheckbox";
import LoadingFaButton from "../../common/basic/buttons/LoadingFaButton";

export default function NewProductToolbar() {
    const local = useSelector<AppState, NewProductState>(x => x.local.newProductState.common);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setId = (id: string) => dispatch(actions.setId(id))
    const setName = (name: string) => dispatch(actions.setName(name))
    const setIsToolset = (isToolset: boolean) => dispatch(actions.setIsToolset(isToolset))
    const setIsDescriptionChecked = (isDescrChecked: boolean) => dispatch(actions.setIsDescrChecked(isDescrChecked))
    const setIsPhotoChecked = (isPhotoChecked: boolean) => dispatch(actions.setIsImageChecked(isPhotoChecked))

    const createOrUpdate = () => {
        if(_.isEmpty(local.productGroup.name))
        {
            alert('Введите название')
            return;
        }
        if(local.loadingState.isSaveLoading)
            return;

        if(!local.productGroup.wasCreate) {
            dispatch(createProductGroupThunk({
                id: local.productGroup.id,
                name: local.productGroup.name!,
                seriesId: local.productGroup.seriesId,
                signId: local.productGroup.signId,
                sellmarkId: local.productGroup.sellmarkId,
                languageId: languageState.selected.id,
                isToolset: local.productGroup.isToolset,
                mainAttributeId: local.productGroup.mainAttributeId
            }))
            return;
        }
        else {
            dispatch(updateProductGroupThunk({
                id: local.productGroup.id,
                name: local.productGroup.name,
                description: local.productGroup.description,
                descriptionWeb: local.productGroup.descriptionWeb,
                seriesId: local.productGroup.seriesId,
                signId: local.productGroup.signId,
                sellmarkId: local.productGroup.sellmarkId,
                priceGroupId: local.productGroup.priceGroupId,
                mainAttributeId: local.productGroup.mainAttributeId,
                siteId: local.productGroup.siteId,
                isDescriptionChecked: local.productGroup.isDescriptionChecked,
                isToolset: local.productGroup.isToolset,
                isImageChecked: local.productGroup.isImageChecked,
                languageId: languageState.selected.id
            }))
        }
    }

    const deleteOrDiscard = async () => {
        if(local.loadingState.isRejectLoading)
            return;
        if (local.productGroup.wasCreate) {
            const res = await dispatch(deleteProductGroupThunk({id: local.productGroup.id}))
            // @ts-ignore
            if(!res.meta.rejectedWithValue)
                navigate('/products');
            else
                alert("Не удалось удалить группу продуктов")
        } else {
            await dispatch(discardReserveThunk({id: local.productGroup.id}))
            navigate('/products');
        }
    }

    return <>
        <div className="new-product-toolbar__first-row-wrapper">
            <div className="input-group-sm input--id">
                <input className="form-control" disabled={local.productGroup.wasCreate} onChange={e => setId(e.target.value)} value={local.productGroup.id} placeholder="№"/>
            </div>
            <div className="input-group-sm input--name" >
                <input className="form-control" onChange={e => setName(e.target.value)} value={local.productGroup.name ?? ""} placeholder="Наименование новой карточки"/>
            </div>

            <TextCheckbox onChange={setIsToolset} text={"Набор"} isChecked={local.productGroup.isToolset} readonly={local.productGroup.wasCreate}/>

            {
                local.productGroup.wasCreate
                    ? <div className="input-checkboxes-wrapper">
                        <TextCheckbox onChange={setIsDescriptionChecked} text={"Описание"} isChecked={local.productGroup.isDescriptionChecked}/>
                        <TextCheckbox onChange={setIsPhotoChecked} text={"Описание"} isChecked={local.productGroup.isImageChecked}/>
                    </div>
                    : <></>
            }
            <LoadingFaButton isLoading={local.loadingState.isSaveLoading} onClick={createOrUpdate} faType={"fa-floppy-o"} title="Сохранить изменения"/>
            <LoadingFaButton isLoading={local.loadingState.isRejectLoading} onClick={deleteOrDiscard} faType={"fa-trash"} title="далить карточку"/>
            <button type="button" className="btn btn-dark btn-sm back-to-main" onClick={() => {window.close()}}><Link to={"/"} target="_blank">Вернуться на главную</Link></button>
            <button type="button" className="btn btn-dark btn-sm">• в буффер обмена</button>
        </div>
        <NewProductSelectorBlock/>
    </>
}
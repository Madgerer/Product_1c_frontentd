import './GroupCatalogsBlock.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {CategoriesTabState} from "../../../../../redux/reducers/local/newProduct/categoryTabComponent";
import {useEffect} from "react";
import {
    actions,
    AdditionalInfoState,
    GroupCatalog
} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent";
import WebsiteSelector from "../../../../common/websiteSelector/WebsiteSelector";
import TextButton from "../../../../common/basic/buttons/TextButton";
import {
    addGroupToSiteThunk,
    changeShowStatusThunk,
    getProductGroupCatalogsThunk, isProductOnSiteThunk, removeGroupFromSiteThunk
} from "../../../../../redux/reducers/local/newProduct/additionalInfoComponent/thunks";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import {Table} from "react-bootstrap";
import {WebSitesState} from "../../../../../redux/reducers/webSites";
import _ from "lodash";

export default function GroupCatalogsBlock() {

    const local = useSelector<AppState, AdditionalInfoState>(x => x.local.newProductState.additionalInfoState)
    const categoryTabState = useSelector<AppState, CategoriesTabState>(x => x.local.newProductState.categoryState)
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const websiteState = useSelector<AppState, WebSitesState>(x => x.websitesState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductGroupCatalogsThunk({productGroupId: productGroupState.productGroup.id}))
    }, [categoryTabState.currentPrintedCategories.length, categoryTabState.currentWebCategories.length])

    useEffect(() => {
        if(websiteState.selected.id === 0)
            return
        dispatch(isProductOnSiteThunk({productGroupId: productGroupState.productGroup.id, websiteId: websiteState.selected.id}))
    }, [websiteState.selected.id])

    const setSelected = (catalog: GroupCatalog) => {
        dispatch(actions.setSelectedCatalog(catalog))
    }

    const setShowStatus = () => {
        const selectedCatalogs = local.groupCatalogs.filter(x => x.selected);
        if(selectedCatalogs.length === 0)
        {
            alert('Выберите каталог для изменения')
            return;
        }
        const args = selectedCatalogs.map(x => {
            return {
                productGroupId: x.productGroupId,
                catalogId: x.catalogId,
                showStatus: !x.showStatus,
                webCategoryId: x.webCategoryId,
                catalogCategoryId: x.catalogCategoryId
            }
        })
        dispatch(changeShowStatusThunk(args))
    }

    const addOrRemoveFromSite = () => {
        if(local.isOnSite)
            dispatch(removeGroupFromSiteThunk({productGroupId: productGroupState.productGroup.id, websiteId: websiteState.selected.id}))
        else
            dispatch(addGroupToSiteThunk({productGroupId: productGroupState.productGroup.id, websiteId: websiteState.selected.id}))
    }

    return <div>
        <div>
            <TextButton text={"Показывать/Не показывать"} onClick={() => setShowStatus()}/>
            <WebsiteSelector/>
            <TextButton text={!local.isOnSite ? "Добавить на сайт" : "Удалить с сайта"} onClick={() => addOrRemoveFromSite()}/>
        </div>
        <Table>
            <thead>
                <tr>
                    <td></td>
                    <td>Каталог</td>
                    <td>№</td>
                    <td>Раздел</td>
                    <td>Подраздел</td>
                    <td>Выводить в кат.</td>
                </tr>
            </thead>
            <tbody>
            {
                _.orderBy(local.groupCatalogs, value => value.webCategoryId).map(x => {
                    const key = `${x.catalogCategoryId}${x.webCategoryId}${x.catalogParentCategoryId}${x.catalogName}`
                    return <tr onClick={() => setSelected(x)} className={x.selected ? "--selected" : ""} key={key}>
                        <td>
                            <input type={"checkbox"} readOnly={true} checked={x.selected}/>
                        </td>
                        <td>{x.catalogName}</td>
                        <td>{x.sort ?? "-"}</td>
                        <td>{x.catalogCategoryId ?? "-"}</td>
                        <td>{x.catalogParentCategoryId ?? x.webCategoryId}</td>
                        <td><input type={"checkbox"} checked={x.showStatus} disabled={true}/></td>
                    </tr>
                })
            }
            </tbody>
        </Table>
    </div>
}
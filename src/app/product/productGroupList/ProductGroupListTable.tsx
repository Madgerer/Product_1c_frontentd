import {Table} from "react-bootstrap";
import "./productGroupListTable.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {
    actions,
    IProductGroupIdentityModel,
    ProductGroupListComponentState
} from "../../../redux/reducers/local/productComponent/productGroupList";
import {useEffect, useState} from "react";
import {PriceGroupState} from "../../../redux/reducers/priceGroups";
import {LanguageState} from "../../../redux/reducers/languages";
import {
    getProductByGroupThunk,
    getProductsGroupsIdentityThunk
} from "../../../redux/reducers/local/productComponent/productGroupList/thunk";
import InformationTableRow from "../../common/ErrorTableRow";

function ProductGroupListTable() {
    const localState = useSelector<AppState, ProductGroupListComponentState>(x => x.local.productGroupListComponent)
    const priceGroupState = useSelector<AppState, PriceGroupState>(x => x.priceGroupsState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsGroupsIdentityThunk({
            priceGroupId: priceGroupState.selected.id,
            languageId: languageState.selectedLanguage.id,
            cardValidationType: localState.selectedCardType
        }))
    }, [priceGroupState.selected.id, languageState.selectedLanguage.id, localState.selectedCardType])


    function onSelect(productGroup: IProductGroupIdentityModel) {
        dispatch(actions.setSelectedProductGroup(productGroup))
    }

    function loadProducts(productGroup: IProductGroupIdentityModel) {
        dispatch(getProductByGroupThunk({
            productGroupId: productGroup.id,
            languageId: languageState.selectedLanguage.id}
        ))
    }

    return <div className="table-sm product-right-column-table">
        <Table bordered hover>
            <thead>
            <tr>
                <th/>
                <th>Наименование</th>
                <th/>
                <th/>
            </tr>
            </thead>
            <tbody>
                {
                    !localState.isProductGroupsLoading
                        ? localState.productGroups.length === 0
                            ? <InformationTableRow text={"No matching records found"} colSpan={4}/>
                            : localState.productGroups.map(x => <ProductGroupTogglingRow key={x.id} model={x} onClick={loadProducts} onSelect={onSelect}/>)
                        : (<InformationTableRow text={"Loading..."} colSpan={4}/>)
                }
            </tbody>
        </Table>
    </div>
}

function ProductGroupTogglingRow(props: ITogglingRowProps): JSX.Element {
    const [isToggle, setIsToggle] = useState(false)

    return <>
        <tr>
            <td className="product-right-column-plus-wrapper" onClick={_ => {
                //проверка на то что уже загружено поддерево
                if(props.model.products != null && !isToggle) {
                    setIsToggle(!isToggle)
                }
                else {
                    setIsToggle(!isToggle)
                    props.onClick(props.model)
                }
            }}>
                {isToggle
                    ? <i className="fa fa-minus"></i>
                    : <i className="fa fa-plus"></i>}
            </td>
            <td>
                {props.model.name}
            </td>
            <td className="product-right-column-checkbox-wrapper" onClick={(e) => props.onSelect(props.model)}>
                <input type="checkbox" checked={props.model.checked} readOnly={true}/>
            </td>
            <td className={`info ${"-green"}`}>
                <i className="fa fa-info-circle"></i>
            </td>
        </tr>
        <tr className={`detail-view ${isToggle ? "-open" : ""}`}>
            <td colSpan={4}>
                {
                    //если данные по продукту загружаются, то тогда пишет Loading(можно прикрутить спиннер например)
                    !props.model.isLoading
                        ? props.model.products == null
                            ? "No data found"
                            : <table>
                                <thead>
                                <tr>
                                    <th className="toggling-view-code-column"> Код </th>
                                    <th> Наименование </th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.model.products.map(x => {
                                            return <tr>
                                                <td>{x.id}</td>
                                                <td>{x.name}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        : "Loading"
                }
            </td>
        </tr>
    </>
}

interface ITogglingRowProps {
    model: IProductGroupIdentityModel;
    onClick: (model: IProductGroupIdentityModel) => void;
    onSelect: (model: IProductGroupIdentityModel) => void;
}



export default ProductGroupListTable
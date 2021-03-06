import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {actions, ProductListComponentState} from "../../../redux/reducers/local/productComponent/productList";
import {PriceGroupState} from "../../../redux/reducers/priceGroups";
import {LanguageState} from "../../../redux/reducers/languages";
import {useEffect} from "react";
import {getProductIdentityThunk} from "../../../redux/reducers/local/productComponent/productList/thunks";
import {Table} from "react-bootstrap";
import "./productListTable.scss"
import InformationTableRow from "../../common/ErrorTableRow";
import "../../common/tables/tables-styles.scss"

function ProductListTable() {
    const local = useSelector<AppState, ProductListComponentState>(x => x.local.productListComponent);
    const priceGroupStat = useSelector<AppState, PriceGroupState>(x => x.priceGroupsState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductIdentityThunk({priceGroupId: priceGroupStat.selected.id, languageId: languageState.selected.id}))
    }, [languageState.selected.id, priceGroupStat.selected.id])


    const setSelected = (id: string) => {
        dispatch(actions.setSelected(id))
    }

    return <div className="table-sm product-left-column-table p-table__scroll-wrapper">
        <Table bordered hover className={"p-table"}>
            <thead>
            <tr>
                <th>Код</th>
                <th>Наименование</th>
                <th className="p-table-column-checkbox-wrapper"></th>
            </tr>
            </thead>
            <tbody>
            {
                !local.isLoading
                    ? local.products.length === 0
                        ? <InformationTableRow text={"No matching records found"} colSpan={3}/>
                        :  local.products
                            .filter(x => x.name.toLowerCase().indexOf(local.filter) !== -1)
                            .map(x => {
                                return <tr className={x.checked ? "table-row--selected" : ""} key={x.id}>
                                    <td>{x.id}</td>
                                    <td>
                                        {x.name}
                                        <label htmlFor={x.id}/>
                                    </td>
                                    <td className="p-table-column-checkbox-wrapper">

                                        <input id={x.id} checked={x.checked} type="checkbox" onChange={(e) => setSelected(x.id)}/>
                                    </td>
                                </tr>
                            })
                    : <InformationTableRow text={"Loading..."} colSpan={3}/>
            }
            </tbody>
        </Table>
    </div>
}

export default ProductListTable;
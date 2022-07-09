import {Table} from "react-bootstrap";
import {useState} from "react";
import InformationTableRow from "../../ErrorTableRow";
import {IProductGroupIdentityModel} from "./types";

export default function ExpandedProductGroupTable(props: IExpandedProductGroupTableProps) {
    const colSpan = props.showSortColumn ? 6 : 5;
    return <Table bordered hover className={"p-table"}>
        <thead>
        <tr>
            <th className="product-right-column-plus-wrapper"/>
            <th>Наименование</th>
            {
                props.showSortColumn ? <th>№</th> : <></>
            }
            <th className="p-table-column-checkbox-wrapper u-width-30"/>
            <th className="u-width-30"/>
            <th className="info u-width-30"/>
        </tr>
        </thead>
        <tbody>
        {
            !props.isProductGroupsLoading
                ? props.productGroups.length === 0
                    ? <InformationTableRow text={"No matching records found"} colSpan={colSpan}/>
                    : props.productGroups
                        .map(x => <ProductGroupTogglingRow
                            key={x.id + x.name}
                            model={x}
                            colSpan={colSpan}
                            showSortColumn={props.showSortColumn}
                            onCheckBoxClick={props.onCheckBoxClick}
                            onExpanderClick={props.loadProducts}
                            onRowClick={props.onRowClick}/>)
                : (<InformationTableRow text={"Loading..."} colSpan={colSpan}/>)
        }
        </tbody>
    </Table>
}

interface IExpandedProductGroupTableProps {
    isProductGroupsLoading: boolean,
    productGroups: IProductGroupIdentityModel[],
    loadProducts: (productGroup: IProductGroupIdentityModel) => void,
    onRowClick: (productGroup: IProductGroupIdentityModel) => void
    onCheckBoxClick: (model: IProductGroupIdentityModel) => void;
    showSortColumn: boolean
}

function ProductGroupTogglingRow(props: ITogglingRowProps): JSX.Element {
    const [isToggle, setIsToggle] = useState(false)

    return <>
        <tr className={props.model.checked ? "table-row--selected" : ""}>
            <td className="product-right-column-plus-wrapper" onClick={_ => {
                //проверка на то что уже загружено поддерево
                if(props.model.products != null && !isToggle) {
                    setIsToggle(!isToggle)
                }
                else {
                    setIsToggle(!isToggle)
                    props.onExpanderClick(props.model)
                }
            }}>
                {isToggle
                    ? <i className="fa fa-minus bg-blue"></i>
                    : <i className="fa fa-plus bg-blue"></i>}
            </td>
            <td onClick={() => props.onRowClick(props.model)}>
               {props.model.name}
            </td>
            {
                props.showSortColumn ?
                    <td onClick={() => props.onRowClick(props.model)} className={"u-width-30 u-center-text"}>
                        {props.model.sort}
                    </td> : <></>
            }
            <td onClick={() => props.onRowClick(props.model)} className={`u-center-text ${props.model.isDescriptionChecked ? "" : "bg-red"}`}>
                {
                    props.model.isImageChecked
                        ? <i className="fa fa-check-circle-o" aria-hidden={true}/>
                        : <></>
                }
            </td>
            <td className="p-table-column-checkbox-wrapper" onClick={() => props.onCheckBoxClick(props.model)}>
                <input type="checkbox" checked={props.model.checked} readOnly={true}/>
            </td>
            <td className={`info`}>
                <i className="fa fa-info-circle bg-blue"></i>
            </td>
        </tr>
        <tr className={`detail-view ${isToggle ? "-open" : ""}`}>
            <td colSpan={props.colSpan}>
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

/*
function getClassName(row: IProductGroupIdentityModel): string {
    if (!row.isDescriptionChecked && !row.isImageChecked)
        return "bg-red"
    if (!row.isDescriptionChecked && row.isImageChecked)
        return "bg-orange"
    if (row.isDescriptionChecked && !row.isImageChecked)
        return "bg-yellow"
    return "bg-green";
}
*/

interface ITogglingRowProps {
    model: IProductGroupIdentityModel;
    onExpanderClick: (model: IProductGroupIdentityModel) => void;
    onRowClick: (model: IProductGroupIdentityModel) => void;
    onCheckBoxClick: (model: IProductGroupIdentityModel) => void;
    colSpan: number
    showSortColumn: boolean
}
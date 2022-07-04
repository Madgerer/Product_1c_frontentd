import {Table} from "react-bootstrap";
import {useState} from "react";
import InformationTableRow from "../../ErrorTableRow";
import {IProductGroupIdentityModel} from "./types";

export default function ExpandedProductGroupTable(props: IExpandedProductGroupTableProps) {
    return <Table bordered hover className={"p-table"}>
        <thead>
        <tr>
            <th className="product-right-column-plus-wrapper"/>
            <th>Наименование</th>
            <th className="p-table-column-checkbox-wrapper"/>
            <th className="info"/>
        </tr>
        </thead>
        <tbody>
        {
            !props.isProductGroupsLoading
                ? props.productGroups.length === 0
                    ? <InformationTableRow text={"No matching records found"} colSpan={4}/>
                    : props.productGroups
                        .map(x => <ProductGroupTogglingRow key={x.id + x.name} model={x} onClick={props.loadProducts} onSelect={props.onSelect}/>)
                : (<InformationTableRow text={"Loading..."} colSpan={4}/>)
        }
        </tbody>
    </Table>
}

interface IExpandedProductGroupTableProps {
    isProductGroupsLoading: boolean,
    productGroups: IProductGroupIdentityModel[],
    loadProducts: (productGroup: IProductGroupIdentityModel) => void,
    onSelect: (productGroup: IProductGroupIdentityModel) => void
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
                    ? <i className="fa fa-minus bg-blue"></i>
                    : <i className="fa fa-plus bg-blue"></i>}
            </td>
            <td>
                {props.model.name}
            </td>
            <td className="p-table-column-checkbox-wrapper" onClick={(e) => props.onSelect(props.model)}>
                <input type="checkbox" checked={props.model.checked} readOnly={true}/>
            </td>
            <td className={`info ${getClassName(props.model)}`}>
                <i className="fa fa-info-circle bg-blue"></i>
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

function getClassName(row: IProductGroupIdentityModel): string {
    if (!row.isDescriptionChecked && !row.isImageChecked)
        return "bg-red"
    if (!row.isDescriptionChecked && row.isImageChecked)
        return "bg-orange"
    if (row.isDescriptionChecked && !row.isImageChecked)
        return "bg-yellow"
    return "bg-green";
}

interface ITogglingRowProps {
    model: IProductGroupIdentityModel;
    onClick: (model: IProductGroupIdentityModel) => void;
    onSelect: (model: IProductGroupIdentityModel) => void;
}
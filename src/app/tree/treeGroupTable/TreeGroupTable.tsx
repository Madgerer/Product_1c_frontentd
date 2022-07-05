import {Table} from "react-bootstrap";
import InformationTableRow from "../../common/ErrorTableRow";
import {IProductGroupIdentityModel} from "../../common/tables/productGroupTable/types";
import {useState} from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {TreeComponentState} from "../../../redux/reducers/local/treeComponent";

export default function TreeGroupTable() {
    const local = useSelector<AppState, TreeComponentState>(x => x.local.treeComponent);

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
            !local.isProductGroupsLoading
                ? local.groups.length === 0
                    ? <InformationTableRow text={"No matching records found"} colSpan={4}/>
                    : local.groups
                        .map(x => <ProductGroupTogglingRow key={x.id + x.name} model={x} onClick={model => {}} onSelect={model => {} }/>)
                : (<InformationTableRow text={"Loading..."} colSpan={4}/>)
        }
        </tbody>
    </Table>
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
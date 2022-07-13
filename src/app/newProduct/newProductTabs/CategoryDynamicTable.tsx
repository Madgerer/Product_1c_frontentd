import _ from "lodash";
import {Table} from "react-bootstrap";
import {ISelectableIndexModel} from "../../../redux/types";
import './categoryDynamicTable.scss'
import {ProductGroupCategory} from "../../../redux/reducers/local/newProduct/categoryTabComponent";
import {CatalogGroup} from "../../../domain/types";

export default function CategoryDynamicTable(props: ICategoryDynamicTableProps) {
    const maxColumnLength = _.max(props.rows.map(x => x.model.length))
    const row = _.orderBy(props.rows, value => value.index)
    return <Table>
        <tbody>
        {
            row.sort(x => x.index).map(row => {
                return <tr key={row.index} className={row.selected ? "dynamic-table-row--selected" : ""} onClick={() => props.onRowClicked(row)}>
                    {
                        <>
                            <>
                                {
                                    Array.from(Array(maxColumnLength).keys()).map((columnNumber, i) => {
                                        const column = row.model[columnNumber]
                                        if(column === undefined) {
                                            return <td key={i * row.index}></td>
                                        }
                                        return <td key={i * row.index * column.id}>{column.name}</td>
                                    })
                                }
                            </>
                            <>
                                {
                                    //в случае если это веб категории, до добавляем отображение Main
                                    props.catalogGroup == CatalogGroup.Web
                                        ? <td>
                                            {
                                                Number(_.last(row.model)!.mainCategory!)
                                            }
                                        </td>
                                        : <></>
                                }
                            </>
                        </>
                    }
                </tr>
            })
        }
        </tbody>
    </Table>
}

interface ICategoryDynamicTableProps {
    catalogGroup: CatalogGroup
    rows: ISelectableIndexModel<ProductGroupCategory>[];
    onRowClicked: (row: ISelectableIndexModel<ProductGroupCategory>) => void;
}
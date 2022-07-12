import _ from "lodash";
import {Table} from "react-bootstrap";
import {ISelectableIndexModel} from "../../../redux/types";
import './categoryDynamicTable.scss'

export default function CategoryDynamicTable<T>(props: ICategoryDynamicTableProps<T>) {
    const maxColumnLength = _.max(props.rows.map(x => x.model.length))
    return <Table>
        <tbody>
        {
            props.rows.map(row => {
                return <tr className={row.selected ? "dynamic-table-row--selected" : ""} onClick={() => props.onRowClicked(row)}>
                    {
                        Array.from(Array(maxColumnLength).keys()).map(columnNumber => {
                            const column = row.model[columnNumber]
                            if(column === undefined) {
                                return <td></td>
                            }
                            return <td>{props.nameAccessorFn(column)}</td>
                        })
                    }
                </tr>
            })
        }
        </tbody>
    </Table>
}

interface ICategoryDynamicTableProps<T> {
    rows: ISelectableIndexModel<T>[];
    nameAccessorFn: (T) => string;
    onRowClicked: (row: ISelectableIndexModel<T>) => void;
}
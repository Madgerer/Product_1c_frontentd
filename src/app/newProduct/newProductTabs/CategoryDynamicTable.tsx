import _ from "lodash";
import {Table} from "react-bootstrap";
import {ISelectableIndexModel} from "../../../redux/types";

export default function CategoryDynamicTable<T>(props: ICategoryDynamicTableProps<T>) {
    const maxColumnLength = _.max(props.rows.map(x => x.model.length))
    return <Table>
        <tbody>
        {
            props.rows.map(row => {
                return <tr>
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
    onRowClicked: (model: T[]) => void;
}
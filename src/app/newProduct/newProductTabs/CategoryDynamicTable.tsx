import {ICategory} from "../../../domain/types";
import _ from "lodash";
import {Table} from "react-bootstrap";

export default function CategoryDynamicTable(props: ICategoryDynamicTableProps) {
    const maxColumnLength = _.max(props.categories.map(x => x.length))
    return <Table>
        <tbody>
        {
            Array.from(Array(props.categories.length).keys()).map(x => {
                return <tr>
                    {
                        Array.from(Array(maxColumnLength).keys()).map(c => {
                            let categories = props.categories[x];
                            if(categories.length > c) {
                                const category = categories[c];
                                return <td>{category.name}</td>
                            }
                            else
                                return <td/>
                        })
                    }
                </tr>
            })
        }
        </tbody>
    </Table>
}

interface ICategoryDynamicTableProps {
    categories: ICategory[][]
}
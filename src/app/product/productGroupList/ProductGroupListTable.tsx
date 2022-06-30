import {Table} from "react-bootstrap";
import TogglingRow from "./TogglingRow";

function ProductGroupListTable() {
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
                <>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <TogglingRow/>
                </>
            {


                /*local.products
                    .filter(x => x.name.toLowerCase().indexOf(local.filter) !== -1)
                    .map(x => {
                        return <tr className={x.checked ? "selected" : ""} key={x.id}>
                            <td>{x.id}</td>
                            <td>{x.name}</td>
                            <td>
                                <label htmlFor={x.id}>
                                </label>
                                <input id={x.id} checked={x.checked} type="checkbox" onChange={(e) => setChecked(x.id, e.target.checked)}/>
                            </td>
                        </tr>
                    })*/
            }
            </tbody>
        </Table>
    </div>
}

export default ProductGroupListTable
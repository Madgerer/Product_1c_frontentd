import DataGrid, {Column, DataGridHandle, RowsChangeData} from "react-data-grid";

type MasterRow =
    | {
    type: 'MASTER';
    id: string;
    expanded: boolean;
}
    | {
    type: 'DETAIL';
    id: string;
    parentId: string;
};


export default function MasterDetailTable<TMasterRow, TDetailRow>(
    masterColumnDefs: Column<TMasterRow>[],
    detailColumnDefs: Column<TDetailRow>[],
    data: TMasterRow[]) {


    return <div/>
}

const recalculateMasterColumns() {

}
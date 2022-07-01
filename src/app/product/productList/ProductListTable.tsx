import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {
    actions,
    ProductListComponentState,
    ProductsIdentityWithCheck
} from "../../../redux/reducers/local/productComponent/productList";
import {PriceGroupState} from "../../../redux/reducers/priceGroups";
import {LanguageState} from "../../../redux/reducers/languages";
import {useEffect, useState} from "react";
import {getProductIdentityThunk} from "../../../redux/reducers/local/productComponent/productList/thunks";
import "./productListTable.scss"
import DataGrid, {Column} from "react-data-grid";
import CheckBoxFormatter from "../../common/CheckBoxFormatter";
import {nameof} from "ts-simple-nameof";
import "../../common/tables.scss"

const columnsDef: Column<ProductsIdentityWithCheck>[] = [
    {
        key: nameof<ProductsIdentityWithCheck>(p => p.id),
        name: "Код",
        width: 80,
        minWidth: 80,
        resizable: true,
    },
    {
        key: nameof<ProductsIdentityWithCheck>(p => p.name),
        name: "Наименование",
    },
    {
        key: nameof<ProductsIdentityWithCheck>(p => p.checked),
        name: "",
        formatter: props => CheckBoxFormatter({id: props.row.id, isChecked: props.row.checked}),
        width: 36,
        maxWidth: 36,
        minWidth: 36
    },
]

export default function ProductListTable() {
    const local = useSelector<AppState, ProductListComponentState>(x => x.local.productListComponent);
    const priceGroupStat = useSelector<AppState, PriceGroupState>(x => x.priceGroupsState);
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const [selected, setSelectedRows] = useState<Set<string>>(() => new Set());

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductIdentityThunk({priceGroupId: priceGroupStat.selected.id, languageId: languageState.selectedLanguage.id}))
        selected.clear();
        dispatch(actions.setSelected)
    }, [languageState.selectedLanguage.id, priceGroupStat.selected.id])

    const setChecked = (id: string, checked: boolean) => {
        dispatch(actions.setChecked({id: id, checked: checked}))
    }

    const setSelected = (row: ProductsIdentityWithCheck) => {
        dispatch(actions.setSelected(row.id))
        if (selected.has(row.id)) {
            selected.delete(row.id);
        } else {
            selected.add(row.id);
        }
    }

    const rows = local.products.filter(x => x.name.toLowerCase().indexOf(local.filter) !== -1)
    return <DataGrid columns={columnsDef}
                     style={{fontSize:13}}
                     rowKeyGetter={row => row.id}
                     rowHeight={24}
                     headerRowHeight={32}
                     rows={rows}
                     selectedRows={selected}
                     onSelectedRowsChange={setSelectedRows}
                     onRowClick={(row, column) => {
                         setChecked(row.id, !row.checked)
                         setSelected(row)
                     }}

    />
}
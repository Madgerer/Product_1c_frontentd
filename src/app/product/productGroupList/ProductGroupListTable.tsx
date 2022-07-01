import DataGrid, {Column, DataGridHandle, RowsChangeData} from "react-data-grid";
import {faker} from "@faker-js/faker";
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";

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

interface DetailRow {
    id: string,
    name: string
}

function createDepartments(): readonly MasterRow[] {
    const departments: MasterRow[] = [];
    for (let i = 1; i < 30; i++) {
        departments.push({
            type: 'MASTER',
            id: i.toString(),
            expanded: false
        });
    }
    return departments;
}

const productsMap = new Map<string, readonly DetailRow[]>();

function getProducts(parentId: string): readonly DetailRow[] {
    if (productsMap.has(parentId)) return productsMap.get(parentId)!;
    const products: DetailRow[] = [];
    for (let i = 0; i < 20; i++) {
        products.push({
            id: i.toString(),
            name: faker.commerce.productName(),
        });
    }
    productsMap.set(parentId, products);
    return products;
}

const productColumns: readonly Column<DetailRow>[] = [
    { key: 'id', name: 'Код', width: 35 },
    { key: 'product', name: 'Наименование' },
];



function ProductGroupListTable() {
    return <div className="table-sm product-right-column-table">
    </div>
}

export default function MasterDetail() {
    const columns = useMemo((): readonly Column<MasterRow>[] => {
        return [
            {
                key: 'expanded',
                name: '',
                minWidth: 30,
                width: 30,
                colSpan(args) {
                    return args.type === 'ROW' && args.row.type === 'DETAIL' ? 3 : undefined;
                },
                cellClass(row) {
                    return row.type === 'DETAIL'
                        ? ''
                        : undefined;
                },
                formatter({ row, isCellSelected, onRowChange }) {
                    if (row.type === 'DETAIL') {
                        return (
                            <ProductGrid
                                isCellSelected={isCellSelected}
                                parentId={row.parentId}
                            />
                        );
                    }

                    return (
                        <CellExpanderFormatter
                            expanded={row.expanded}
                            isCellSelected={isCellSelected}
                            onCellExpand={() => {
                                onRowChange({ ...row, expanded: !row.expanded });
                            }}
                        />
                    );
                }
            },
            { key: 'id', name: 'Наименование', width: 35 },
        ];
    }, []);
    const [rows, setRows] = useState(createDepartments);

    function onRowsChange(rows: MasterRow[], { indexes }: RowsChangeData<MasterRow>) {
        const row = rows[indexes[0]];
        if (row.type === 'MASTER') {
            if (!row.expanded) {
                rows.splice(indexes[0] + 1, 1);
            } else {
                rows.splice(indexes[0] + 1, 0, {
                    type: 'DETAIL',
                    id: row.id + 100,
                    parentId: row.id
                });
            }
            setRows(rows);
        }
    }

    return (
        <DataGrid
            rowKeyGetter={row => row.id}
            columns={columns}
            rows={rows}
            onRowsChange={onRowsChange}
            headerRowHeight={45}
            rowHeight={(args) => (args.type === 'ROW' && args.row.type === 'DETAIL' ? 300 : 45)}
            className="fill-grid"
            enableVirtualization={false}
        />
    );
}

function ProductGrid({parentId, isCellSelected}: {
    parentId: string;
    isCellSelected: boolean;
}) {
    const gridRef = useRef<DataGridHandle>(null);
    useEffect(() => {
        if (!isCellSelected)
            return;
        gridRef
            .current!.element!.querySelector<HTMLDivElement>('[tabindex="0"]')!
            .focus({ preventScroll: true });
    }, [isCellSelected]);
    const products = getProducts(parentId);

    function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.isDefaultPrevented()) {
            event.stopPropagation();
        }
    }

    return (
        <div onKeyDown={onKeyDown}>
            <DataGrid
                ref={gridRef}
                rows={products}
                columns={productColumns}
                rowKeyGetter={row => row.id}
                style={{ blockSize: 250 }}
            />
        </div>
    );
}

/*const cellExpandClassname = css`
  /!* needed on chrome *!/
  float: right;
  float: inline-end;
  display: table;
  block-size: 100%;

  > span {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
  }
`;*/

interface CellExpanderFormatterProps {
    isCellSelected: boolean;
    expanded: boolean;
    onCellExpand: () => void;
}

export function CellExpanderFormatter({isCellSelected, expanded, onCellExpand}: CellExpanderFormatterProps) {
    const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);

    function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onCellExpand();
        }
    }

    return (
        <div className="product-right-column-cell-expand">
          <span onClick={onCellExpand} onKeyDown={handleKeyDown}>
            <span ref={ref} tabIndex={tabIndex}>
              {expanded
                  ? <i className="fa fa-minus"></i>
                  : <i className="fa fa-plus"></i>}
            </span>
          </span>
        </div>
    );
}

export function useFocusRef<T extends HTMLOrSVGElement>(isSelected: boolean) {
    const ref = useRef<T>(null);

    useLayoutEffect(() => {
        if (!isSelected) return;
        ref.current?.focus({ preventScroll: true });
    }, [isSelected]);

    return {
        ref,
        tabIndex: isSelected ? 0 : -1
    };
}



//export default ProductGroupListTable
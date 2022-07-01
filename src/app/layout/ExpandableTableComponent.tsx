import * as React from 'react'


import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {log} from "util";

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const columns: ColumnDef<Person>[] = [
    {
        header: 'Name',
        footer: props => props.column.id,
        columns: [
            {
                accessorKey: 'firstName',
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row.lastName,
                id: 'lastName',
                cell: info => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: props => props.column.id,
            },
        ],
    },
    {
        header: 'Info',
        footer: props => props.column.id,
        columns: [
            {
                accessorKey: 'age',
                header: () => 'Age',
            },
            {
                header: 'More Info',
                columns: [
                    {
                        accessorKey: 'visits',
                        header: () => <span>Visits</span>,
                        footer: props => props.column.id,
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        footer: props => props.column.id,
                    },
                    {
                        accessorKey: 'progress',
                        header: 'Profile Progress',
                        footer: props => props.column.id,
                    },
                ],
            },
        ],
    },
]

export default function Ahahah() {
    const [data, setData] = React.useState(() => [...defaultData])
    const rerender = React.useReducer(() => ({}), {})[1]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    table.getHeaderGroups().forEach(x => x.headers.forEach(x => console.log( x.column.columnDef.header)))

    return (
        <div className="p-2">
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {String(header.column.columnDef)}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {cell.id}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="h-4" />
            <button onClick={() => rerender()} className="border p-2">
                Rerender
            </button>
        </div>
    )
}


export default function InformationTableRow(props: IInformationTableRowProps) {
    return <tr>
        <td colSpan={props.colSpan}>
            <div>{props.text}</div>
        </td>
    </tr>
}

interface IInformationTableRowProps {
    colSpan: number,
    text: string
}
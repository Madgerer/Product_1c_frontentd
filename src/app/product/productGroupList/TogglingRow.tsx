import "./togglingRow.scss"



function TogglingRow() {
    return <>
        <tr>

        </tr>
        <tr className={"detail-view"}>
            <td colSpan={4}>
                <thead>
                    <tr>
                        <th className="toggling-view-code-column"> Код </th>
                        <th> Наименование </th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </td>
        </tr>
    </>
}

export default TogglingRow

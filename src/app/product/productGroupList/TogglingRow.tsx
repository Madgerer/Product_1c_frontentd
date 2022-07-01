import "./togglingRow.scss"
import {useState} from "react";



function TogglingRow(props: IProps) {

    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)

    function loadAndToggle ()  {
        let newVar = (delay, value) => new Promise<string>(resolve => {
            setLoading(true)
            console.log("here")
            setTimeout(resolve, delay, value)
        });
        if (toggle) {
            setToggle(!toggle)
        } else {
            setToggle(!toggle)
            newVar(1000, 4).then(() => {
                setLoading(false)
            })
        }
    }

    return <>
        <tr>
            <td className="product-right-column-plus-wrapper" onClick={loadAndToggle}>
                {toggle ? <i className="fa fa-minus"></i> : <i className="fa fa-plus"></i>}
            </td>
            <td>
                {props.name}
            </td>
            <td className="product-right-column-checkbox-wrapper">
                <input type="checkbox"/>
            </td>
            <td className={`info ${"-green"}`}>
                <i className="fa fa-info-circle"></i>
            </td>
        </tr>
        <tr className={`detail-view ${toggle ? "-open" : ""}`}>
            <td colSpan={4}>
                {
                    loading ? "Loading..." :
                        <table>
                        <thead>
                        <tr>
                            <th className="toggling-view-code-column"> Код </th>
                            <th> Наименование </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>78932</td>
                            <td>переход-держатель для бит (шестигр1/4"/квадрат1/4", L=25мм) АвтоDело (39629)</td>
                        </tr>

                        </tbody>
                    </table>
                }
            </td>
        </tr>
    </>
}

interface IProps {
    name: string

}

export default TogglingRow

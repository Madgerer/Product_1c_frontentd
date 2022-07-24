import './FaButton.scss'

export default function FaButton(props: IFaButtonProps) {
    const cName = "btn btn-dark " + props.additionalClassName ?? ""
    return <button  className={cName} onClick={() => props.onClick()}>
        <i className={`fa ${props.faType}`}></i>
    </button>
}

interface IFaButtonProps {
    onClick: () => void,
    faType: string
    additionalClassName?: string
}
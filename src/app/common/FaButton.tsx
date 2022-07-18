import './FaButton.scss'

export default function FaButton(props: IFaButtonProps) {
    return <button onClick={() => props.onClick()}>
        <i className={`fa ${props.faType}`}></i>
    </button>
}

interface IFaButtonProps {
    onClick: () => void,
    faType: string
}
import './TextButton.scss'

export default function TextButton(props: ITextButtonProps) {
    return <button type="button" disabled={props.disabled ?? false} onClick={() => props.onClick()} className="btn btn-dark">
        <span>{props.text}</span>
    </button>
}

interface ITextButtonProps {
    text: string
    disabled?: boolean
    onClick: () => void
}


import './TextButton.scss'

export default function TextButton(props: ITextButtonProps) {
    return <button type="button" disabled={props.disabled ?? false} className="btn btn-dark">
        {props.text}
    </button>
}

interface ITextButtonProps {
    text: string
    disabled?: boolean
    onClick: () => void
}


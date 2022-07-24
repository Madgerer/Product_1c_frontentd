import './TextCheckbox.scss'

export default function TextCheckbox(props: ITextCheckbox) {
    const readonly = props.readonly ?? false;

    return <label className="form-check-label">
        <input type="checkbox" className=""
               checked={props.isChecked}
               onChange={() => props.onChange(!props.isChecked)}
               disabled={readonly}/>
        <span>{props.text}</span>
    </label>
}

interface ITextCheckbox {
    onChange: (value: boolean) => void,
    text: string
    isChecked: boolean
    readonly?: boolean
}
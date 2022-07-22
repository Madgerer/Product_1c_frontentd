import './TextCheckbox.scss'

export default function TextCheckbox(props: ITextCheckbox) {
    return <label className="form-check-label">
        <input type="checkbox" className=""
               checked={props.isChecked}
               onChange={() => props.onChange(!props.isChecked)}/>
        <span>{props.text}</span>
    </label>
}

interface ITextCheckbox {
    onChange: (value: boolean) => void,
    text: string
    isChecked: boolean
}
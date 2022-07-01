function CheckBoxFormatter(props: ICheckBoxFormatterProps) {
    return <div style={{textAlign: "center", verticalAlign: "middle"}}>
        <input id={props.id}
               checked={props.isChecked}
               onChange={e => e.target.checked}
               type="checkbox"
        />
    </div>
}

export interface ICheckBoxFormatterProps {
    isChecked: boolean,
    id: string
}

export default CheckBoxFormatter
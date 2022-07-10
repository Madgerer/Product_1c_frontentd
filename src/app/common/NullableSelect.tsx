import {IOptionType} from "./SimpleSelect";
import Select from "react-select";

interface INullableSelectorProps<T> {
    value: T | null
    options: T[],
    onChange: (value: number | null) => void,
    toOption: (value: T ) => IOptionType
    className: string | null
    placeholder: string
}


export default function NullableSelect<T>(props: INullableSelectorProps<T>) {
    const styles = {
        menuList: (base) => ({
            ...base,

            "::-webkit-scrollbar": {
                width: "4px",
                height: "0px",
            },
            "::-webkit-scrollbar-track": {
                background: "#f1f1f1"
            },
            "::-webkit-scrollbar-thumb": {
                background: "#888"
            },
            "::-webkit-scrollbar-thumb:hover": {
                background: "#555"
            }
        })
    }

    const options: IOptionType[] = props.options.map(x => props.toOption(x))
    const selected: IOptionType | null = props.value !== null
        ? props.toOption(props.value)
        : null;

    return <Select
        options={options}
        className={props.className ?? ""}
        styles={styles}
        onChange={(newValue) => {
            props.onChange(newValue?.value ?? null)
        }}
        value={selected}
        placeholder={props.placeholder}
        isClearable={true}
    />
}
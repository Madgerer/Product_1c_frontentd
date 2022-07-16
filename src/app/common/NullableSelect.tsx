import {IOptionType, IStringOptionType} from "./SimpleSelect";
import Select from "react-select";
import {isString} from "lodash";

interface INullableSelectorProps<T> {
    value: T | null
    options: T[],
    onChange: (value: number | string | null) => void,
    toOption: (value: T ) => IOptionType | IStringOptionType
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

    const options = props.options.map(x => props.toOption(x))
    const selected = props.value !== null
        ? props.toOption(props.value)
        : null;

    return <Select
        options={options}
        className={props.className ?? ""}
        styles={styles}
        onChange={(newValue) => {
            if(isString(newValue)) {
                props.onChange(newValue?.value as string ?? null)
            }
            else {
                props.onChange(newValue?.value as number ?? null)
            }
        }}
        value={selected}
        placeholder={props.placeholder}
        isClearable={true}
    />
}
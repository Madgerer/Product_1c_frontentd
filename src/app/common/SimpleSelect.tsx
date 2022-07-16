import Select from "react-select";

export interface IOptionType { label: string; value: number | string }

interface ISimpleSelectorProps<T> {
    value: T
    options: T[],
    onChange: (value: number | string) => void,
    toOption: (value: T) => IOptionType
    className: string | null
}

function SimpleSelect<T>(props: ISimpleSelectorProps<T>) {

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
    let selected: IOptionType = props.toOption(props.value);

    return <Select
        options={options}
        className={props.className ?? ""}
        styles={styles}
        onChange={(newValue) => props.onChange(newValue?.value ?? selected.value)}
        value={selected}
    />
}

export default SimpleSelect
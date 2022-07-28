import Select from "react-select";

export interface IOptionType { label: string; value: number}
export interface IStringOptionType { label: string, value: string}

interface ISimpleSelectorProps<T> {
    value: T
    options: T[],
    onChange: (value: number) => void,
    toOption: (value: T) => IOptionType
    className?: string
    height?: number
}

interface ISimpleSelectorStringProps<T> {
    value: T
    options: T[],
    onChange: (value: string) => void,
    toOption: (value: T) => IStringOptionType
    className?: string
    height?: number
}

//type guard
const isSimpleSelectorProps = (x: any): x is ISimpleSelectorProps<any> => true;

function SimpleSelect<T>(props: ISimpleSelectorProps<T> | ISimpleSelectorStringProps<T>) {

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
        }),
        control: base => ({
            ...base,
            height: props.height || 31,
            minHeight: props.height || 31
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: props.height || 31,
            padding: "0 6px"
        }),

        input: (provided, state) => ({
            ...provided,
            margin: "0px"
        }),

        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: props.height || 31
        })
    }

    const options = props.options.map(x => props.toOption(x))
    let selected = props.toOption(props.value);

    return <Select
        options={options}
        className={props.className ?? ""}
        styles={styles}
        onChange={(newValue) => {
            if(isSimpleSelectorProps(props)) {
                if(newValue !== null)
                    props.onChange(Number(newValue.value))
                else
                    props.onChange(Number(selected.value))
            }
            else {
                if(newValue !== null)
                { // @ts-ignore
                    props.onChange(newValue.value.toString())
                }
                else {
                    // @ts-ignore
                    props.onChange(selected.value.toString)
                }
            }
        }}
        value={selected}
    />
}

export default SimpleSelect
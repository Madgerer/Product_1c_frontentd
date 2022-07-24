import {IOptionType, IStringOptionType} from "./SimpleSelect";
import Select, {createFilter} from "react-select";
import _, {isString} from "lodash";
import {Component, useEffect, useState} from "react";
import { components } from 'react-select';
import PropTypes from "prop-types";
//ts-ignore
import { FixedSizeList as List } from 'react-window';



interface IFastNullableSelectorProps<T> {
    value: T | null
    options: T[],
    onChange: (value: number | string | null) => void,
    toOption: (value: T ) => IOptionType | IStringOptionType
    className: string | null
    placeholder: string
    noOptionsMessage: string | null
}

export default function FastNullableSelector<T>(props: IFastNullableSelectorProps<T>) {
    console.log(props.options.length)

    const [allItems, setAllOptions] = useState(props.options.map(x => props.toOption(x)))
    const [filteredItem, setFilteredItems] = useState(allItems)

    useEffect(() => {
        const map = props.options.map(x => props.toOption(x));
        setAllOptions(map)
        setFilteredItems(map)
    }, [props.options.length])


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

    const changeHandler = (event) => {
        const newValue = event as IOptionType;
        if(isString(newValue)) {
            props.onChange(newValue?.value.toString() ?? null)
        }
        else {
            props.onChange(newValue?.value as number ?? null)
        }
    };

    const selected = props.value !== null
        ? props.toOption(props.value)
        : null;

    return <Select<IOptionType | IStringOptionType>
        // @ts-ignore
        components={{ MenuList: MenuList, Option: CustomOption }}
        filterOption={createFilter({ ignoreAccents: false })}
        options={filteredItem}
        className={props.className ?? ""}
        styles={styles}
        onChange={(e) => changeHandler(e)}
        value={selected}
        placeholder={props.placeholder}
        isClearable={true}
    />
}

const height = 40;

class MenuList extends Component {
    render() {
        // @ts-ignore
        const { options, children, maxHeight, getValue } = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;

        if(_.isUndefined(children.length))
            return <div>No data available</div>

        return (
            <List
                height={maxHeight}
                itemCount={children.length}
                itemSize={height}
                initialScrollOffset={initialOffset}
            >
                {({ index, style }) => <div style={style}>{children[index]}</div>}
            </List>
        );
    }
}


const CustomOption = ({ children, ...props }) => {
    // eslint-disable-next-line no-unused-vars
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = { ...props, innerProps: rest };
    return (
        // @ts-ignore
        <components.Option {...newProps}>
            {children}
        </components.Option>
    );
};

CustomOption.propTypes = {
    innerProps: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};



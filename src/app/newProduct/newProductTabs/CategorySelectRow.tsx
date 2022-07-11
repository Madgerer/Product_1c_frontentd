import './categorySelectRow.scss'
import NullableSelect from "../../common/NullableSelect";
import { ICategory } from '../../../domain/types';
import ToOptionProvider from "../../../utils/ToOptionProvider";
import {useState} from "react";
import CategoryTreeUtils from "../../../CategoryTreeUtils";


export default function CategorySelectRow(props: IRowElementProps) {
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null)

    const onChange = (id: number | null) => {
        if(id === null) {
            setSelectedCategory(null)
            props.onChange(null)
        }
        else {
            const category = CategoryTreeUtils.findCategory(id, props.categories)
            setSelectedCategory(category)
            props.onChange(category)
        }
    };

    return <>
        <NullableSelect value={selectedCategory}
                        options={props.categories}
                        onChange={(e) => {onChange(e)}}
                        toOption={ToOptionProvider.categoryToOption}
                        className={"selector"}
                        placeholder={"Выберите кателогию"}/>
        {
            selectedCategory != null && selectedCategory.children.length != 0
                ? <CategorySelectRow onChange={props.onChange} key={selectedCategory.id} categories={selectedCategory.children}/>
                : <></>
        }
    </>
}

interface IRowElementProps {
    categories: ICategory[]
    onChange: (category: ICategory | null) => void;
}
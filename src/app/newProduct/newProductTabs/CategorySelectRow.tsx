import './categorySelectRow.scss'
import NullableSelect from "../../common/NullableSelect";
import { ICategory } from '../../../domain/types';
import ToOptionProvider from "../../../utils/ToOptionProvider";
import {useEffect, useState} from "react";
import CategoryTreeUtils from "../../../CategoryTreeUtils";

interface IRowElementProps {
    categories: ICategory[]
    onChange: (category: ICategory | null) => void;
}

export default function CategorySelectRow(props: IRowElementProps) {
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null)

    const onChange = (id: number | null) => {
        if(id === null) {
            setSelectedCategory(null)
            //props.onChange(null)
        }
        else {
            const category = CategoryTreeUtils.findCategory(id, props.categories)
            setSelectedCategory(category)
            //props.onChange(category)
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
                ? <CategorySelectRowChild parent={selectedCategory} onChange={props.onChange} key={selectedCategory.id} categories={selectedCategory.children}/>
                : <></>
        }
    </>
}

interface ICategorySelectRowChildProps {
    categories: ICategory[],
    parent: ICategory,
    onChange: (category: ICategory | null) => void;
}

function CategorySelectRowChild(props: ICategorySelectRowChildProps) {
    const initial = props.parent.children[0]
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(initial)

    useEffect(() => {
        if(selectedCategory === null || selectedCategory.children.length === 0) {
            props.onChange(selectedCategory)
        }
    },[selectedCategory])

    const onChange = (id: number | null) => {
        if(id === null) {
            setSelectedCategory(null)
        }
        else {
            const category = CategoryTreeUtils.findCategory(id, props.categories)
            setSelectedCategory(category)
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
                ? <CategorySelectRowChild parent={selectedCategory} onChange={props.onChange} key={selectedCategory.id} categories={selectedCategory.children}/>
                : <></>
        }
    </>
}

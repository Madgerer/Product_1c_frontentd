import './categorySelectRow.scss'
import NullableSelect from "../../../../../common/basic/selectors/NullableSelect";
import { ICategory } from '../../../../../../domain/types';
import ToOptionProvider from "../../../../../../utils/ToOptionProvider";
import {useEffect, useState} from "react";
import CategoryTreeUtils from "../../../../../../CategoryTreeUtils";

interface IRowElementProps {
    categories: ICategory[]
    onChange: (category: ICategory | null, level: number) => void;
    shouldReset: boolean;
    onReset: () => void;
    height?: number
}

export default function CategorySelectRow(props: IRowElementProps) {
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null)

    const onChange = (id: number | null) => {
        if(id === null) {
            setSelectedCategory(null)
        }
        else {
            const category = CategoryTreeUtils.findCategory(id, props.categories)
            setSelectedCategory(category)
        }
    };

    useEffect(() => {
        if(props.shouldReset) {
            props.onReset();
            setSelectedCategory(null)
        }
    },[props.shouldReset])

    return <>
        <NullableSelect value={selectedCategory}
                        options={props.categories}
                        onChange={(e) => {onChange(e as number)}}
                        toOption={ToOptionProvider.categoryToOption}
                        className={"selector category-selector"}
                        height={31}
                        placeholder={"Выберите категорию"}/>
        {
            selectedCategory != null && selectedCategory.children.length != 0
                ? <CategorySelectRowChild level={1} parent={selectedCategory} onChange={props.onChange} key={selectedCategory.id} categories={selectedCategory.children}/>
                : <></>
        }
    </>
}

interface ICategorySelectRowChildProps {
    categories: ICategory[],
    parent: ICategory,
    onChange: (category: ICategory | null, level: number) => void,
    level: number
}

function CategorySelectRowChild(props: ICategorySelectRowChildProps) {
    const initial = props.parent.children[0]
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(initial)

    useEffect(() => {
        if(selectedCategory === null || selectedCategory.children.length === 0) {
            props.onChange(selectedCategory, props.level)
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
                        onChange={(e) => {onChange(e as number)}}
                        toOption={ToOptionProvider.categoryToOption}
                        className={"selector category-selector"}
                        placeholder={"Выберите категорию"}/>
        {
            selectedCategory != null && selectedCategory.children.length != 0
                ? <CategorySelectRowChild level={props.level + 1}
                                          parent={selectedCategory}
                                          onChange={props.onChange}
                                          key={selectedCategory.id}
                                          categories={selectedCategory.children}/>
                : <></>
        }
    </>
}

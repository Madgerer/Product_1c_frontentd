import './categorySelectRow.scss'
import NullableSelect from "../../common/NullableSelect";
import { ICategory } from '../../../domain/types';
import ToOptionProvider from "../../../utils/ToOptionProvider";
import {useState} from "react";


export default function CategorySelectRow(props: IRowElementProps) {
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null)

    const onChange = (id: number | null) => {
        if(id === null)
        {
            setSelectedCategory(null)
            props.onChange(null)
        }
        else {
            const category = findCategory(props.categories, id)
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

function findCategory(categories: ICategory[], id: number): ICategory | null {
    for (let i = 0; i < categories.length; i++) {
        const category = searchInTree(categories[i], id);
        if(category != null){
            return category;
        }
    }
    return null;
}

function searchInTree(category: ICategory, id: number): ICategory | null {
    if(category.id === id){
        return category;
    }
    else if (category.children != null){
        let result: ICategory | null = null;
        for(let i=0; result == null && i < category.children.length; i++){
            result = searchInTree(category.children[i], id);
        }
        return result;
    }
    return null;
}

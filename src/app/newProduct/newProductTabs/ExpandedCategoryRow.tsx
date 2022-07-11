import './ExpandedCategoryRow.scss'
import {useSelector} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {LanguageState} from "../../../redux/reducers/languages";
import {NewProductState} from "../../../redux/reducers/local/newProduct";
import NullableSelect from "../../common/NullableSelect";
import { ICategory } from '../../../domain/types';
import ToOptionProvider from "../../../utils/ToOptionProvider";
import {useState} from "react";

export default function ExpandedCategoryRow() {
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState);
    const local = useSelector<AppState, NewProductState>(x => x.local.newProductState);

    return <>
        <RowElement categories={local.categoriesPrinted}/>
    </>
}

function RowElement(props: IRowElementProps) {
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null)

    const onChange = (id: number | null) => {
        if(id === null)
        {
            setSelectedCategory(null)
        }
        else {
            const category = findCategory(props.categories, id)
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
                ? <RowElement key={selectedCategory.id} categories={selectedCategory.children}/>
                : <></>
        }
    </>
}

interface IRowElementProps {
    categories: ICategory[]
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

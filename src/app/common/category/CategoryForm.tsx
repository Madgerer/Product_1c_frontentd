import CategoryGroupToolbar from "./CategoryGroupToolbar";
import CategoryGroupTree from "./CategoryGroupTree";

export default function CategoryForm(props: ICategoryFormProps) {
    return <>
        <CategoryGroupToolbar/>
        <CategoryGroupTree highlightedRows={props.highlightedCategories}/>
    </>
}

interface ICategoryFormProps {
    highlightedCategories: number[]
}
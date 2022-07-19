import CatalogsBlock from "./CatalogsBlock";
import ScopeBlock from "./ScopeBlock";
import {useEffect} from "react";

export default function CategoryTab(props: ICategoryProps) {
    props.onMount()

    useEffect(() => {
        return () => {
            console.log('unmount category tab')
        }

    }, [])

    return <div className="tab-pane row">
        <CatalogsBlock/>
        <ScopeBlock/>
    </div>
}

interface ICategoryProps {
    onMount: () => {}
}
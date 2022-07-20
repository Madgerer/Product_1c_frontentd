import CatalogsBlock from "./CatalogsBlock";
import ScopeBlock from "./ScopeBlock";
import {useEffect} from "react";

export default function CategoryTab(props: ICategoryProps) {
    useEffect(() => {
        props.onMount()
    }, [])

    useEffect(() => {
        return () => {
            console.log('unmount category tab')
        }
    }, [])

    return <div className="tab-pane">
        <CatalogsBlock/>
        <ScopeBlock/>
    </div>
}

interface ICategoryProps {
    onMount: () => {}
}
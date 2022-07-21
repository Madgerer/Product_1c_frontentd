import CatalogsBlock from "./CatalogsBlock";
import ScopeBlock from "./ScopeBlock";
import {useEffect} from "react";
import {IMountableProps} from "../../../../../redux/types";

export default function CategoryTab(props: IMountableProps) {
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


import ImageBlock from "./ImageBlock";
import PictogramBlock from "./PictogramBlock";
import {useEffect} from "react";
import {IMountableProps} from "../../../../../redux/types";

export default function GraphicPartTab(props: IMountableProps){

    useEffect(() => {
        props.onMount()
    }, [])

    return <>
        <ImageBlock/>
        <PictogramBlock/>
    </>
}
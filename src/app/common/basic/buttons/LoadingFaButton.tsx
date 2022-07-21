import './LoadingFaButton.scss'
import {Spinner} from "react-bootstrap";

export default function LoadingFaButton(props: ILoadingButtonProps) {
    return <>
        <button title={props.title ?? ""} type="button" className="btn btn-dark btn-sm" onClick={() => props.onClick()}>
        {
            props.isLoading
                ? <Spinner animation={'border'}/>
                : <i className={`fa ${props.faType}`} aria-hidden="true"/>
        }
        </button>
    </>
}

interface ILoadingButtonProps {
    isLoading: boolean,
    onClick: () => void,
    faType: string,
    title?: string
}
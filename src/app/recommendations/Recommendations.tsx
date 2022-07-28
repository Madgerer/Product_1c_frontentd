import './Recommendations.scss'
import {useSearchParams} from "react-router-dom";
import TextButton from "../common/basic/buttons/TextButton";

export default function Recommendations() {
    const [searchParams] = useSearchParams();
    const paramGroupId = searchParams.get('productGroupId');

    return <>
        {
            paramGroupId === null
                ? <>Переданы неверные аргументы</>
                : <>
                    <TextButton text={"Добавить"} onClick={() => {}}/>
                
                </>
        }
    </>
}
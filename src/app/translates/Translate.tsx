import {TranslateForm} from "./TranslateForm";
import {TranslateSettings} from "./TranslateSettings";
import "./Translate.scss"

export default function Translate() {
    return <div className="translate__wrapper">
        <TranslateForm/>
        <TranslateSettings/>
    </div>
}
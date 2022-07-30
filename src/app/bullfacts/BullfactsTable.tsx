import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import {actions, BullfactState, Translate} from "../../redux/reducers/local/bullfactsComponent";
import {CatalogState} from "../../redux/reducers/catalogs";
import {getTranslatesThunk, updateTranslateThunk} from "../../redux/reducers/local/bullfactsComponent/thunks";
import {ITranslate} from "../../domain/types";
import {replaceProductInGroupThunk} from "../../redux/reducers/local/newProduct/tablePartComponent/thunk";

export default function BullfactsTable() {

    const local = useSelector<AppState, BullfactState>(x => x.local.bullfactsComponent)
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!catalogState.wasInit)
            return
        const search = local.isSemanticSearchDisabled ? local.semanticSearch : local.search
        dispatch(getTranslatesThunk({
            search: search,
            translateSource: local.selectedTranslateSource.value,
            catalogId: catalogState.selected.id,
            isEmpty: local.selectedTranslateType.value === 1,
            targetLanguageId: local.selectedLanguage.id
        }))
    }, [local.selectedLanguage.id,
        local.selectedTranslateType.value,
        local.selectedTranslateSource.value,
        local.search,
        local.semanticSearch,
        catalogState.selected.id])

    const updateValue = (translate: Translate) => {
        dispatch(updateTranslateThunk({
            translateSource: local.selectedTranslateSource.value,
            sourceId: translate.sourceId,
            translate: translate.newTranslate,
            languageId: local.selectedLanguage.id,
            translateId: translate.id
        }))
    }

    const setNewTranslateValue = (key: string, newValue: string) => dispatch(actions.setNewTranslateValue({key: key, newValue: newValue}))

    return <Table>
        <thead>
            <tr>
                <th>Русский</th>
                <th>Код</th>
                <th>Перевод</th>
                <th>Источник</th>
                <th>Код объекта</th>
            </tr>
        </thead>
        <tbody>
        {
            Object.keys(local.translates).map((x) => {
                return <TableRow key={x} translate={local.translates[x]}/>
            })
        }
        </tbody>
    </Table>
}

interface ITableRowProps {
    key: string,
    translate: Translate
}

function TableRow(props: ITableRowProps) {
    const [translateValue, setTranslateValue] = useState(props.translate.newTranslate)

    const onKeyUp = (event) => {
        if(event.key === 'Enter') {

        }
        if(event.key === "Escape")
        {
            setTranslateValue(props.translate.newTranslate)
        }
    }

    return <tr key={props.key}>
        <td>{props.translate.russian}</td>
        <td>{props.key}</td>
        <td><input value={translateValue}
                   onChange={e => setTranslateValue(e.currentTarget.value)} onKeyUp={(e) => onKeyUp(e)}/></td>
        <td>{props.translate.source}</td>
        <td>{props.translate.sourceId}</td>
    </tr>
}
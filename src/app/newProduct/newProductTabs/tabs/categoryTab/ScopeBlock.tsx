import './ScopeBlock.scss'
import NullableSelect from "../../../../common/basic/selectors/NullableSelect";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../../redux/reducers";
import {actions, CategoriesTabState} from "../../../../../redux/reducers/local/newProduct/categoryTabComponent";
import {NewProductState} from "../../../../../redux/reducers/local/newProduct";
import {LanguageState} from "../../../../../redux/reducers/languages";
import ToOptionProvider from "../../../../../utils/ToOptionProvider";
import {Table} from "react-bootstrap";
import {useEffect} from "react";
import {
    addProductGroupsToScopeThunk, changeProductGroupsScopeThunk,
    getProductGroupsScopesThunk,
    getScopesOfApplicationThunk, removeProductGroupsFromScopeThunk
} from "../../../../../redux/reducers/local/newProduct/categoryTabComponent/thunks";
import _ from "lodash";

export default function ScopeBlock() {
    const local = useSelector<AppState, CategoriesTabState>(x => x.local.newProductState.categoryState)
    const productGroupState = useSelector<AppState, NewProductState>(x => x.local.newProductState.common)
    const languageState = useSelector<AppState, LanguageState>(x => x.languageState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getScopesOfApplicationThunk({languageId: languageState.selected.id}))
    }, [languageState.selected.id])

    useEffect(() => {
        if(local.isScopesWasInit)
            dispatch(getProductGroupsScopesThunk({productGroupId: productGroupState.productGroup.id}))
    }, [local.isScopesWasInit])

    const setSelectedScope = (id: number | null) => dispatch(actions.setSelectedScope(id))
    const setSelectedCurrentScope = (id: number) => dispatch(actions.setSelectedCurrentScope(id))

    const addProductGroupToScope = () => {
        if(local.selectedScope === null) {
            alert('Выберите область применения для добавления')
            return;
        }
        if(local.currentScopes.find(x => x.id === local.selectedScope!.id) !== undefined) {
            alert('Область применения уже добавлена')
            return;
        }
        dispatch(addProductGroupsToScopeThunk({productGroupId: productGroupState.productGroup.id, scopeId: local.selectedScope.id}))
    }

    const changeProductGroupScope = () => {
        if(local.selectedScope === null) {
            alert('Выберите область применения из списка для изменения')
            return;
        }
        if(local.selectedCurrentScope === null) {
            alert('Выберите область применения в таблице для изменения')
            return;
        }

        if(local.currentScopes.find(x => x.id === local.selectedScope!.id) !== undefined){
            return;
        }

        dispatch(changeProductGroupsScopeThunk({
            productGroupId: productGroupState.productGroup.id,
            scopeId: local.selectedCurrentScope.id,
            newScopeId: local.selectedScope.id
        }))
    }

    const removeProductGroupFromScope = () => {
        if(local.selectedCurrentScope === null) {
            alert('Выберите область применения в таблице для удаления')
            return;
        }

        dispatch(removeProductGroupsFromScopeThunk({
            productGroupId: productGroupState.productGroup.id,
            scopeId: local.selectedCurrentScope.id
        }))
    }



    return <>
        <div className="">
            <div>
                <h2>Область применения</h2>
                <div className="u-buttons-wrapper">
                <button type="button" className="btn btn-dark" onClick={() => {addProductGroupToScope()}}>
                    <i className="fa fa-plus" aria-hidden="true"/>
                </button>
                <button type="button" className="btn btn-dark" onClick={() => {changeProductGroupScope()}}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"/>
                </button>
                <button type="button" className="btn btn-dark" onClick={() => {removeProductGroupFromScope()}}>
                    <i className="fa fa fa-minus" aria-hidden="true"/>
                </button>
                <NullableSelect value={local.selectedScope}
                                options={local.scopes}
                                onChange={value => setSelectedScope(value as number)}
                                toOption={ToOptionProvider.scopeToOption} className={"selector"}
                                placeholder={"Выберите область применения"}/>
                </div>
            </div>
            {
                local.currentScopes.length === 0
                    ? <>
                        <tr>
                            <td colSpan={2}>No matching records found</td>
                        </tr>
                    </>
                    : <Table>
                        <thead>
                            <th>Код</th>
                            <th>Наименование</th>
                        </thead>
                        <tbody>
                        {
                            _.orderBy(local.currentScopes, x => x.id).map(x => {
                                return <tr className={x.selected ? "--selected" : ""} onClick={() => setSelectedCurrentScope(x.id)}>
                                    <td>{x.id}</td>
                                    <td>{x.name}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
            }
        </div>
    </>
}
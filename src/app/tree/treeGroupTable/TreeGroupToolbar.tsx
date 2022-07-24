import SimpleSelect from "../../common/basic/selectors/SimpleSelect";
import {useDispatch, useSelector} from "react-redux";
import {actions, TreeComponentState} from "../../../redux/reducers/local/treeComponent";
import {AppState} from "../../../redux/reducers";
import {CatalogGroupsState} from "../../../redux/reducers/catalogGroups";
import {CatalogGroup} from "../../../domain/types";
import {CatalogState} from "../../../redux/reducers/catalogs";
import {
    changeProductGroupSortThunk,
    recountProductGroupSortThunk, removeProductGroupFromCatsThunk
} from "../../../redux/reducers/local/treeComponent/thunks";
import "./TreeGroupToolbar.scss"
import {CategoriesState} from "../../../redux/reducers/categories";
import FaButton from "../../common/basic/buttons/FaButton";

export default function TreeGroupToolbar() {
    const local = useSelector<AppState, TreeComponentState>(x => x.local.treeComponent);
    const catalogGroupState = useSelector<AppState, CatalogGroupsState>(x => x.catalogGroupState);
    const catalogState = useSelector<AppState, CatalogState>(x => x.catalogState);
    const categoriesState = useSelector<AppState, CategoriesState>(x => x.categoriesState);
    const dispatch = useDispatch();

    function setSortNumber(newValue: string) {
        dispatch(actions.setSortNumber(newValue))
    }

    function selectedCardDistributionType(id: number) {
        dispatch(actions.setSelectedCardType(id))
    }

    function setFilter(newValue: string) {
        dispatch(actions.setFilter(newValue));
    }

    function recountProductGroupsSort() {
        const catalogId = catalogState.selected.id;
        dispatch(recountProductGroupSortThunk({catalogId: catalogId}))
    }

    function changeSort(addition: number, ) {
        const selected = local.lastSelected;
        if(selected == null)
        {
            alert("Выберите продуктовую группу для изменения сортировки")
            return;
        }
        let target: number;
        if(selected.sort == 0) {
            if(addition < 0) {
                alert("Новое значение сортировки выходит за границы доступного")
                return;
            }
            target = selected.sort + local.minSort
        }
        else {
            // @ts-ignore
            // компилятор тупит и не смотря на проверку выше - не билдит, поэтому игнорим ее
            target = selected!.sort + addition;
        }

        if(target < 1 || target < local.minSort) {
            alert("Новое значение сортировки выходит за границы доступного")
            return;
        }
        if(target > local.maxSort)
        {
            alert("Новое значение сортировки выходит за границы доступного")
            return;
        }

        // @ts-ignore
        // компилятор тупит и не смотря на проверку выше - не билдит, поэтому игнорим ее
        dispatch(changeProductGroupSortThunk({
            catalogId: catalogState.selected!.id,
            // @ts-ignore
            currentSort: selected!.sort,
            // @ts-ignore
            productGroupId: selected!.id,
            targetSort: target
        }))
    }

    function setSpecificSort() {
        const selected = local.lastSelected;
        if(selected == null)
        {
            alert("Выберите продуктовую группу для изменения сортировки")
            return;
        }
        const target = Number(local.sortNumber);
        if(isNaN(target)) {
            alert("Введено неккоректное число")
            return;
        }
        if(target < 1) {
            alert("Новое значение сортировки выходит за границы доступного")
            return;
        }

        // компилятор тупит и не смотря на проверку выше - не билдит, поэтому игнорим ее
        dispatch(changeProductGroupSortThunk({
            catalogId: catalogState.selected.id,
            // @ts-ignore
            currentSort: selected.sort,
            // @ts-ignore
            productGroupId: selected.id,
            targetSort: target
        }))
    }

    function removeProductGroupsFromCategories() {
        if(local.selectedGroups.length == 0)
        {
            alert("Выберите группы продуктов, которые должны быть удалены из категории")
            return;
        }
        if(categoriesState.selectedCategory?.children.length != 0)
        {
            alert("Выберите категорию последнего уровня")
            return;
        }
        dispatch(removeProductGroupFromCatsThunk({
            productGroupIds:local.selectedGroups.map(x => x.id),
            catalogGroup: catalogGroupState.selected.id,
            catalogId: catalogState.selected.id,
            categoryId: categoriesState.selectedCategory.id
        }))
    }

    return <div  className="tree-group-toolbar">
        {
            catalogGroupState.selected.id === CatalogGroup.Printed
                ? <>
                    {
                        local.minSort == 0 && local.maxSort == 0
                            ? <></>
                            : <>
                                <input onChange={e => setSortNumber(e.currentTarget.value)} value={local.sortNumber} className="form-control input-group-sm tree-group-toolbar__input"/>
                                <FaButton onClick={() => setSpecificSort()} faType={"fa-arrows-v"}/>
                            </>

                    }
                    <FaButton onClick={() => changeSort(1)} faType={"fa-arrow-down"}/>
                    <FaButton onClick={() => changeSort(-1)} faType={"fa-arrow-up"}/>
                </>
                : <></>
        }

        <SimpleSelect value={local.selectedCardType}
                      options={local.cardTypes}
                      onChange={value => selectedCardDistributionType(value)}
                      toOption={e => e}
                      className={"selector"}/>
        <button className="btn btn-dark" title="Удалить выбранные карточки из раздела" onClick={() => removeProductGroupsFromCategories()}>
            <i className="fa fa-minus" aria-hidden="true"/>
        </button>
        {
            catalogGroupState.selected.id === CatalogGroup.Printed
                ? <button className="btn btn-dark" title="Пересчитать порядок карточек" onClick={() => recountProductGroupsSort()}>
                    <i className="fa fa-calculator" aria-hidden="true"/>
                </button>
                : <></>
        }
        <input onChange={e => setFilter(e.currentTarget.value)} value={local.filter} className="form-control search" placeholder="Search"/>
    </div>
}
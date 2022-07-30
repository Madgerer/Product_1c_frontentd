import {ILanguage, ITranslate} from "../../../../domain/types";
import {IOptionType} from "../../../../app/common/basic/selectors/SimpleSelect";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTranslatesThunk, updateTranslateThunk} from "./thunks";

export type Translate = ITranslate & { newTranslate: string }

export type BullfactState = {
    translates: Translate[],
    search: string,
    semanticSearch: string,
    selectedLanguage: ILanguage,

    translateTypes: IOptionType[],
    selectedTranslateType: IOptionType,

    translateSources: IOptionType[],
    selectedTranslateSource: IOptionType

    isSemanticSearch: boolean
}

const INITIAL_TRANSLATE_TYPES: IOptionType[] = [{value: 0, label: 'Все объекты'}, {value: 1, label: 'Пустые объекты'}]
const INITIAL_TRANSLATE_SOURCES: IOptionType[] = [
    {value: 0, label: 'Все разделы'},
    {value: 1, label: 'AttrNames'},
    {value: 2, label: 'CatKat'},
    {value: 3, label: 'CatWeb'},
    {value: 4, label: 'GroupName'},
    {value: 5, label: 'PictGroup'},
    {value: 6, label: 'PictGroupDesc'},
    {value: 7, label: 'ValueDescription'}
]

const INITIAL_STATE: BullfactState = {
    translates: [],
    search: "",
    semanticSearch: "",
    selectedLanguage: {id: 1, name: "Английский"},

    translateTypes: INITIAL_TRANSLATE_TYPES,
    selectedTranslateType: INITIAL_TRANSLATE_TYPES[0],

    translateSources: INITIAL_TRANSLATE_SOURCES,
    selectedTranslateSource: INITIAL_TRANSLATE_SOURCES[0],

    isSemanticSearch: false
}

const slice = createSlice({
    name: 'bullfacts',
    initialState: INITIAL_STATE,
    reducers: {
        setIsSemanticSearch(state: BullfactState) {
            state.isSemanticSearch = !state.isSemanticSearch
        },
        setSearch(state: BullfactState, action: PayloadAction<string>) {
            state.search = action.payload
        },
        setSemanticSearch(state: BullfactState, action: PayloadAction<string>) {
            state.semanticSearch = action.payload
        },
        setLanguage(state: BullfactState, action: PayloadAction<ILanguage>) {
            state.selectedLanguage = action.payload
        },
        setTranslateType(state: BullfactState, action: PayloadAction<number>) {
            const translateType = state.translateTypes.find(x => x.value === action.payload)
            state.selectedTranslateType = translateType!
        },
        setTranslatedSource(state: BullfactState, action: PayloadAction<number>) {
            const translateSource = state.translateSources.find(x => x.value === action.payload)
            state.selectedTranslateSource = translateSource!
        }
    },
    extraReducers: builder => {
        builder.addCase(getTranslatesThunk.fulfilled, (state, action) => {
            state.translates = action.payload.map(x => {
                return{
                    id: x.id,
                    russian: x.russian,
                    translate: x.translate,
                    source: x.source,
                    sourceId: x.sourceId,
                    newTranslate: x.translate
                }
            })
        })
        builder.addCase(getTranslatesThunk.rejected, (state, action) => {
            console.log(`Can't get translates. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
        builder.addCase(updateTranslateThunk.fulfilled, (state, action) => {
            const arg = action.meta.arg
            const index = state.translates.findIndex(x => x.id === arg.translateId
                                                        && x.source === arg.translateSource
                                                        && x.sourceId === arg.sourceId)
            if(index === -1)
                return
            state.translates[index].translate = state.translates[index].newTranslate
        })
        builder.addCase(updateTranslateThunk.rejected, (state, action) => {
            console.log(`Can't update translates. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}

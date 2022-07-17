import {
    IImage,
    IImageType,
    IPictogram
} from "../../../../../domain/types";
import {createSlice} from "@reduxjs/toolkit";
import {
    addPictogramToGroupThunk, changeGroupPictogramThunk,
    getAllPictogramsThunk, getGroupPictogramsThunk,
    getImageTypesThunk,
    getProductImagesThunk,
    removeImageThunk, removePictogramToGroupThunk,
    updateImageThunk,
    uploadImageThunk
} from "./thunks";

//forceUpdate нужен чтобы вызывать принудительный перерендер элементов после обновления
export type ForcedUpdatableImage = IImage & {forceUpdate: boolean}

const INITIAL_IMAGE_TYPE: IImageType[] = [{id: -1, name: 'loading'}]
const INITIAL_PICTOGRAMS: IPictogram[] = [{id: -1, name: 'loading', imageUrl: '', sort: -1, isSet: false}]

const INITIAL_STATE: GraphicTabState = {
    imageTypes: INITIAL_IMAGE_TYPE,
    selectedImageType: INITIAL_IMAGE_TYPE[0],

    groupImages: [],
    selectedGroupImage: null,
    newImage: null,

    pictograms: INITIAL_PICTOGRAMS,
    selectedPictogram: INITIAL_PICTOGRAMS[0],

    groupPictograms: [],
    selectedGroupPictogram: null
}

export type GraphicTabState = {
    imageTypes: IImageType[],
    selectedImageType: IImageType | null,

    groupImages: IImage[],
    selectedGroupImage: IImage | null
    newImage: File | null

    pictograms: IPictogram[],
    selectedPictogram: IPictogram | null

    groupPictograms: IPictogram[],
    selectedGroupPictogram: IPictogram | null
}

const slice = createSlice({
    name: 'new-product-graphic-tab',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getImageTypesThunk.fulfilled, (state, action) => {
            state.imageTypes = action.payload
            state.selectedImageType = null
        })
        builder.addCase(getImageTypesThunk.rejected, (state, action) => {
            console.log(`Can't load image types. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getProductImagesThunk.fulfilled, (state, action) => {
            state.groupImages = action.payload
            state.selectedGroupImage = null
        })
        builder.addCase(getProductImagesThunk.rejected, (state, action) => {
            console.log(`Can't load product images. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(uploadImageThunk.fulfilled, (state, action) => {
            state.groupImages.push({
                imageUrl: action.payload,
                typeId: action.meta.arg.imageType
            })
            state.newImage = null
            state.selectedImageType = null
        })
        builder.addCase(uploadImageThunk.rejected, (state, action) => {
            console.log(`Can't upload image. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeImageThunk.fulfilled, (state, action) => {
            state.groupImages = state.groupImages.filter(x => x.typeId !== action.meta.arg.imageType)
            state.selectedGroupImage = null
        })
        builder.addCase(removeImageThunk.rejected, (state, action) => {
            console.log(`Can't remove image. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(updateImageThunk.fulfilled, (state, action) => {
            const imageToChange = state.groupImages.find(x => x.typeId === action.meta.arg.imageType)
            if(imageToChange === undefined)
                return
        })
        builder.addCase(updateImageThunk.rejected, (state, action) => {
            console.log(`Can't update image. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(updateImageThunk.fulfilled, (state, action) => {
            const index = state.groupImages.findIndex(x => x.typeId === action.meta.arg.imageType)
            if(index === -1)
                return
            state.groupImages[index] = {...state.groupImages[index]}
        })
        builder.addCase(updateImageThunk.rejected, (state, action) => {
            console.log(`Can't update image. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getAllPictogramsThunk.fulfilled, (state, action) => {
            state.pictograms = action.payload
            state.selectedPictogram = null
        })
        builder.addCase(getAllPictogramsThunk.rejected, (state, action) => {
            console.log(`Can't get pictograms. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getGroupPictogramsThunk.fulfilled, (state, action) => {
            state.groupPictograms = action.payload
            state.selectedGroupPictogram = null
        })
        builder.addCase(getGroupPictogramsThunk.rejected, (state, action) => {
            console.log(`Can't get group pictograms. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(addPictogramToGroupThunk.fulfilled, (state, action) => {
            const index = state.pictograms.findIndex(x => x.id === action.meta.arg.pictogramId)
            state.groupPictograms.push(state.pictograms[index])
            state.selectedGroupPictogram = null
            //убираем из общего списка добавленную пиктограмму
            state.pictograms.splice(index, 1)
        })
        builder.addCase(addPictogramToGroupThunk.rejected, (state, action) => {
            console.log(`Can't add pictogram. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removePictogramToGroupThunk.fulfilled, (state, action) => {
            const index = state.groupPictograms.findIndex(x => x.id === action.meta.arg.pictogramId)
            //добавляем пиктограмму в общий список
            state.pictograms.push(state.groupPictograms[index])
            state.groupPictograms.splice(index, 1);
            state.selectedGroupPictogram = null
        })
        builder.addCase(removePictogramToGroupThunk.rejected, (state, action) => {
            console.log(`Can't add pictogram. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(changeGroupPictogramThunk.fulfilled, (state, action) => {
            const current = state.groupPictograms.find(x => x.id === action.meta.arg.pictogramId)
            const newPict = state.pictograms.find(x => x.id === action.meta.arg.newPictogramId)

            state.groupPictograms = state.groupPictograms.filter(x => x.id !== current!.id)
            state.pictograms = state.pictograms.filter(x => x.id !== newPict!.id)

            state.pictograms.push(current!)
            state.groupPictograms.push(newPict!)
        })
        builder.addCase(changeGroupPictogramThunk.rejected, (state, action) => {
            console.log(`Can't change pictogram. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}
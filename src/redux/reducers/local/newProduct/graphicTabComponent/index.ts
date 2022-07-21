import {
    IImage,
    IImageType,
    IPictogram
} from "../../../../../domain/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addPictogramToGroupThunk, changeGroupPictogramThunk,
    getAllPictogramsThunk, getGroupPictogramsThunk,
    getImageTypesThunk,
    getProductImagesThunk,
    removeImageThunk, removePictogramFromGroupThunk,
    updateImageThunk,
    uploadImageThunk, uploadVideoThunk
} from "./thunks";
import Constants from "../../../../../domain/Constants";
import {Guid} from "guid-typescript";

export type IGuidImage = IImage & {key: string}

const INITIAL_IMAGE_TYPE: IImageType[] = [{id: -1, name: 'loading'}]
const INITIAL_PICTOGRAMS: IPictogram[] = [{id: -1, name: 'loading', imageUrl: '', sort: -1, isSet: false}]

const INITIAL_STATE: GraphicTabState = {
    imageTypes: INITIAL_IMAGE_TYPE,
    selectedImageType: INITIAL_IMAGE_TYPE[0],

    groupImages: [],
    selectedGroupType: null,

    pictograms: INITIAL_PICTOGRAMS,
    selectedPictogram: INITIAL_PICTOGRAMS[0],

    groupPictograms: [],
    selectedGroupPictogram: null,

    shouldOpenVideoModel: false,
    videoLink: ""
}

export type GraphicTabState = {
    imageTypes: IImageType[],
    selectedImageType: IImageType | null,

    groupImages: IGuidImage[],
    selectedGroupType: IImageType| null

    pictograms: IPictogram[],
    selectedPictogram: IPictogram | null

    groupPictograms: IPictogram[],
    selectedGroupPictogram: IPictogram | null,

    shouldOpenVideoModel: boolean,
    videoLink: string
}

const slice = createSlice({
    name: 'new-product-graphic-tab',
    initialState: INITIAL_STATE,
    reducers: {
        setSelectedImageType(state: GraphicTabState, action: PayloadAction<number | null>) {
            if(action.payload === null)
                state.selectedImageType = null
            else
            {
                const index = state.imageTypes.findIndex(x => x.id === action.payload)
                state.selectedImageType = state.imageTypes[index]
            }
        },
        /*setFile(state: GraphicTabState, action: PayloadAction<File | null>) {
            state.newImage = action.payload
        },*/
        setShouldOpenModal(state: GraphicTabState) {
            state.shouldOpenVideoModel = !state.shouldOpenVideoModel
        },
        setVideoLink(state: GraphicTabState, action: PayloadAction<string>) {
            state.videoLink = action.payload
        },
        setSelectedGroupImage(state: GraphicTabState, action: PayloadAction<IImage>) {
            const imageType = state.imageTypes.find(x => x.id === action.payload.typeId)
            state.selectedGroupType = imageType!;
        },
        setSelectedPictogram(state: GraphicTabState, action: PayloadAction<number>) {
            const pictogram = state.pictograms.find(x => x.id === action.payload)
            state.selectedPictogram = pictogram!
        },
        setSelectedGroupPictogram(state: GraphicTabState, action: PayloadAction<number>) {
            state.selectedGroupPictogram = state.groupPictograms.find(x => x.id === action.payload)!
        }
    },
    extraReducers: builder => {
        builder.addCase(getImageTypesThunk.fulfilled, (state, action) => {
            state.imageTypes = action.payload
            state.selectedImageType = null
        })
        builder.addCase(getImageTypesThunk.rejected, (state, action) => {
            console.log(`Can't load image types. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getProductImagesThunk.fulfilled, (state, action) => {
            state.groupImages = action.payload.map(x => {
                return {
                    key: Guid.create().toString(),
                    typeId: x.typeId,
                    imageUrl: x.imageUrl
                }
            })
            state.selectedGroupType = null
        })
        builder.addCase(getProductImagesThunk.rejected, (state, action) => {
            console.log(`Can't load product images. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(uploadImageThunk.fulfilled, (state, action) => {
            state.groupImages.push({
                imageUrl: action.payload,
                typeId: action.meta.arg.imageType,
                key: Guid.create().toString()
            })
            state.selectedImageType = null
        })
        builder.addCase(uploadImageThunk.rejected, (state, action) => {
            console.log(`Can't upload image. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(uploadVideoThunk.fulfilled, (state, action) => {
            const index = state.groupImages.findIndex(x => x.typeId === Constants.YoutubeImageType)
            if(index === -1)
                state.groupImages.push({
                    imageUrl: action.payload,
                    typeId: Constants.YoutubeImageType,
                    key: Guid.create().toString()
                })
            else
                state.groupImages[index].imageUrl = action.payload
            state.selectedImageType = null
            state.videoLink = ""
            state.shouldOpenVideoModel = !state.shouldOpenVideoModel
        })
        builder.addCase(uploadVideoThunk.rejected, (state, action) => {
            console.log(`Can't upload video. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(removeImageThunk.fulfilled, (state, action) => {
            state.groupImages = state.groupImages.filter(x => x.typeId !== action.meta.arg.imageType)
            state.selectedGroupType = null
        })
        builder.addCase(removeImageThunk.rejected, (state, action) => {
            console.log(`Can't remove image. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(updateImageThunk.fulfilled, (state, action) => {
            const index = state.groupImages.findIndex(x => x.typeId === action.meta.arg.imageType)
            if(index === -1)
                return
            //это нужно, что image обновился. React one love <3
            state.groupImages[index].key = Guid.create().toString()
            state.groupImages[index].imageUrl = action.payload
        })
        builder.addCase(updateImageThunk.rejected, (state, action) => {
            console.log(`Can't update image. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getAllPictogramsThunk.fulfilled, (state, action) => {
            state.pictograms = action.payload.filter(x => state.groupPictograms.find(y => y.id === x.id) === undefined)
            state.selectedPictogram = null
        })
        builder.addCase(getAllPictogramsThunk.rejected, (state, action) => {
            console.log(`Can't get pictograms. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(getGroupPictogramsThunk.fulfilled, (state, action) => {
            state.pictograms = state.pictograms.filter(x => state.groupPictograms.find(y => y.id === x.id) === undefined)
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

        builder.addCase(removePictogramFromGroupThunk.fulfilled, (state, action) => {
            const index = state.groupPictograms.findIndex(x => x.id === action.meta.arg.pictogramId)
            //добавляем пиктограмму в общий список
            state.pictograms.push(state.groupPictograms[index])
            state.groupPictograms.splice(index, 1);
            state.selectedGroupPictogram = null
        })
        builder.addCase(removePictogramFromGroupThunk.rejected, (state, action) => {
            console.log(`Can't add pictogram. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })

        builder.addCase(changeGroupPictogramThunk.fulfilled, (state, action) => {
            const current = state.groupPictograms.find(x => x.id === action.meta.arg.pictogramId)
            const newPict = state.pictograms.find(x => x.id === action.meta.arg.newPictogramId)

            state.groupPictograms = state.groupPictograms.filter(x => x.id !== current!.id)
            state.pictograms = state.pictograms.filter(x => x.id !== newPict!.id)

            state.pictograms.push(current!)
            state.groupPictograms.push(newPict!)

            state.selectedGroupPictogram = newPict!
            state.selectedPictogram = null
        })
        builder.addCase(changeGroupPictogramThunk.rejected, (state, action) => {
            console.log(`Can't change pictogram. Status code: '${action.payload?.statusCode}'. Text: '${action.payload?.exception}'`)
        })
    }
})

const actions = slice.actions;
const reducer = slice.reducer;

export {actions, reducer}
import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit";


interface filterState {
    selectedCategories: string;
    selectedTags: string;
    heroName: string;
}

const initialState: filterState = {
    selectedCategories: "",
    selectedTags: "",
    heroName: ""
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateSelectedCategories(state, action: PayloadAction<string>) {
            state.selectedCategories = action.payload;
        },
        updateSelectedTags(state, action: PayloadAction<string>) {
            state.selectedTags = action.payload;
        },
        updateHeroName(state, action: PayloadAction<string>) {
            state.heroName = action.payload;
        }
    },
});


export const {actions, reducer} = filterSlice
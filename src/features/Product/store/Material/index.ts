import { createSlice } from '@reduxjs/toolkit';
import {
  MaterialState,
  MaterialActionTypes,
  FetchMaterialsSuccess,
  FetchMaterialsFailure,
  SaveMaterialSuccess,
  SaveMaterialFailure,
  DeleteMaterialSuccess,
  DeleteMaterialFailure,
} from './types';

const initialState: MaterialState = {
  materials: [],
  loading: false,
  error: null,
};

const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch materials
      .addCase(MaterialActionTypes.FETCH_MATERIALS_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(MaterialActionTypes.FETCH_MATERIALS_SUCCESS, (state, action: FetchMaterialsSuccess) => {
        state.loading = false;
        state.materials = action.payload;
      })
      .addCase(MaterialActionTypes.FETCH_MATERIALS_FAILURE, (state, action: FetchMaterialsFailure) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save material
      .addCase(MaterialActionTypes.SAVE_MATERIAL_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(MaterialActionTypes.SAVE_MATERIAL_SUCCESS, (state, action: SaveMaterialSuccess) => {
        state.loading = false;
        const index = state.materials.findIndex(
          (m) => m.materialCode === action.payload.data!.materialCode
        );
        if (index !== -1) {
          state.materials[index] = action.payload.data!;
        } else {
          state.materials.push(action.payload.data!);
        }
      })
      .addCase(MaterialActionTypes.SAVE_MATERIAL_FAILURE, (state, action: SaveMaterialFailure) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete material
      .addCase(MaterialActionTypes.DELETE_MATERIAL_SUCCESS, (state, action: DeleteMaterialSuccess) => {
        state.materials = state.materials.filter(
          (m) => m.materialCode !== action.payload
        );
      })
      .addCase(MaterialActionTypes.DELETE_MATERIAL_FAILURE, (state, action: DeleteMaterialFailure) => {
        state.error = action.payload;
      });
  },
});

export default materialSlice.reducer;
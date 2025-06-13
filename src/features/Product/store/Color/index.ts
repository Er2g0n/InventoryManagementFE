import { DeleteColorFailure, DeleteColorSuccess, FetchColorsFailure, FetchColorsSuccess, ColorActionTypes, ColorState, SaveColorFailure, SaveColorSuccess } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ColorState = {
  colors: [],
  loading: false,
  error: null,
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch colors
      .addCase(ColorActionTypes.FETCH_COLORS_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ColorActionTypes.FETCH_COLORS_SUCCESS, (state, action: FetchColorsSuccess) => {
        state.loading = false;
        state.colors = action.payload;
      })
      .addCase(ColorActionTypes.FETCH_COLORS_FAILURE, (state, action: FetchColorsFailure) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save color
      .addCase(ColorActionTypes.SAVE_COLOR_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ColorActionTypes.SAVE_COLOR_SUCCESS, (state, action: SaveColorSuccess) => {
        state.loading = false;
        const index = state.colors.findIndex(
          (color) => color.colorCode === action.payload.data!.colorCode
        );
        if (index !== -1) {
          state.colors[index] = action.payload.data!;
        } else {
          state.colors.push(action.payload.data!);
        }
      })
      .addCase(ColorActionTypes.SAVE_COLOR_FAILURE, (state, action: SaveColorFailure) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete color
      .addCase(ColorActionTypes.DELETE_COLOR_SUCCESS, (state, action: DeleteColorSuccess) => {
        state.colors = state.colors.filter(
          (color) => color.colorCode !== action.payload
        );
      })
      .addCase(ColorActionTypes.DELETE_COLOR_FAILURE, (state, action: DeleteColorFailure) => {
        state.error = action.payload;
      });
  }
});

export default colorSlice.reducer;

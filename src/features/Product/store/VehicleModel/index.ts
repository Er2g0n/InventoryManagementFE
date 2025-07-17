import { createSlice } from "@reduxjs/toolkit";
import {
  VehicleModelActionTypes,
  VehicleModelState,
  FetchVehicleModelsSuccess,
  FetchVehicleModelsFailure,
  SaveVehicleModelSuccess,
  SaveVehicleModelFailure,
  DeleteVehicleModelSuccess,
  DeleteVehicleModelFailure
} from "./types";

const initialState: VehicleModelState = {
  vehicleModels: [],
  loading: false,
  error: null
};

const vehicleModelSlice = createSlice({
  name: "vehicleModel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch vehicle models
      .addCase(VehicleModelActionTypes.FETCH_VEHICLE_MODELS_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VehicleModelActionTypes.FETCH_VEHICLE_MODELS_SUCCESS, (state, action: FetchVehicleModelsSuccess) => {
        state.loading = false;
        state.vehicleModels = action.payload;
      })
      .addCase(VehicleModelActionTypes.FETCH_VEHICLE_MODELS_FAILURE, (state, action: FetchVehicleModelsFailure) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save vehicle model
      .addCase(VehicleModelActionTypes.SAVE_VEHICLE_MODEL_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VehicleModelActionTypes.SAVE_VEHICLE_MODEL_SUCCESS, (state, action: SaveVehicleModelSuccess) => {
        state.loading = false;
        const index = state.vehicleModels.findIndex(
          (vm) => vm.modelCode === action.payload.data!.modelCode
        );

        if (index !== -1) {
          state.vehicleModels[index] = action.payload.data!;
        } else {
          state.vehicleModels.push(action.payload.data!);
        }
      })
      .addCase(VehicleModelActionTypes.SAVE_VEHICLE_MODEL_FAILURE, (state, action: SaveVehicleModelFailure) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete vehicle model
      .addCase(VehicleModelActionTypes.DELETE_VEHICLE_MODEL_SUCCESS, (state, action: DeleteVehicleModelSuccess) => {
        state.vehicleModels = state.vehicleModels.filter(
          (vm) => vm.modelCode !== action.payload
        );
      })
      .addCase(VehicleModelActionTypes.DELETE_VEHICLE_MODEL_FAILURE, (state, action: DeleteVehicleModelFailure) => {
        state.error = action.payload;
      });
  }
});

export default vehicleModelSlice.reducer;
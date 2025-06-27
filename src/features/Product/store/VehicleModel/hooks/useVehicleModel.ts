import { AppDispatch, RootState } from "@/store/store";
import { addOrUpdateVehicleModel, fetchVehicleModels, removeVehicleModel } from "../action";
import { VehicleModel } from "@/types/MasterData/Product/ProductClassification";
import { useDispatch, useSelector } from "react-redux";
import { VehicleModelActionTypes } from "../types"; // Giả định đã có VehicleModelActionTypes

export const useVehicleModels = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vehicleModels = useSelector((state: RootState) => state.vehicleModel.vehicleModels);
  const loading = useSelector((state: RootState) => state.vehicleModel.loading);
  const error = useSelector((state: RootState) => state.vehicleModel.error);

  const loadVehicleModels = (): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(fetchVehicleModels())
        .then((action) => {
          if (action.type === VehicleModelActionTypes.FETCH_VEHICLE_MODELS_SUCCESS) {
            resolve({ success: true });
          } else {
            resolve({
              success: false,
              message: "Failed to fetch vehicle models."
            });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while fetching vehicle models."
          });
        });
    });

  const saveVehicleModel = (vehicleModel: VehicleModel): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(addOrUpdateVehicleModel(vehicleModel))
        .then((action) => {
          if (action.type === VehicleModelActionTypes.SAVE_VEHICLE_MODEL_SUCCESS) {
            resolve({ success: true, message: action.payload.message });
          } else if (action.type === VehicleModelActionTypes.SAVE_VEHICLE_MODEL_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to save vehicle model." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while saving vehicle model."
          });
        });
    });

  const deleteVehicleModel = (modelCode: string): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(removeVehicleModel(modelCode))
        .then((action) => {
          if (action.type === VehicleModelActionTypes.DELETE_VEHICLE_MODEL_SUCCESS) {
            resolve({ success: true, message: action.payload });
          } else if (action.type === VehicleModelActionTypes.DELETE_VEHICLE_MODEL_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to delete vehicle model." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while deleting vehicle model."
          });
        });
    });

  return {
    vehicleModels,
    loading,
    error,
    loadVehicleModels,
    saveVehicleModel,
    deleteVehicleModel
  };
};
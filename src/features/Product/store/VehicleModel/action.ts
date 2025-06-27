import { VehicleModel } from "@/types/MasterData/Product/ProductClassification";
import { VehicleModelAction, VehicleModelActionTypes, DeleteVehicleModelFailure, DeleteVehicleModelSuccess, FetchVehicleModelsFailure, FetchVehicleModelsRequest, FetchVehicleModelsSuccess, SaveVehicleModelFailure, SaveVehicleModelRequest, SaveVehicleModelSuccess } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { ResultService } from "@/types/Base/ResultService";
import { deleteVehicleModel, getAllVehicleModels, saveVehicleModel } from "@features/Product/Services/ProductVehicleModelService";

export const fetchVehicleModelsRequest = (): FetchVehicleModelsRequest => ({
  type: VehicleModelActionTypes.FETCH_VEHICLE_MODELS_REQUEST
});

export const fetchVehicleModelsSuccess = (
  vehicleModels: VehicleModel[]
): FetchVehicleModelsSuccess => ({
  type: VehicleModelActionTypes.FETCH_VEHICLE_MODELS_SUCCESS,
  payload: vehicleModels
});

export const fetchVehicleModelsFailure = (
  error: string
): FetchVehicleModelsFailure => ({
  type: VehicleModelActionTypes.FETCH_VEHICLE_MODELS_FAILURE,
  payload: error
});

export const saveVehicleModelRequest = (): SaveVehicleModelRequest => ({
  type: VehicleModelActionTypes.SAVE_VEHICLE_MODEL_REQUEST
});

export const saveVehicleModelSuccess = (
  response: ResultService<VehicleModel>
): SaveVehicleModelSuccess => ({
  type: VehicleModelActionTypes.SAVE_VEHICLE_MODEL_SUCCESS,
  payload: response
});

export const saveVehicleModelFailure = (
  error: string
): SaveVehicleModelFailure => ({
  type: VehicleModelActionTypes.SAVE_VEHICLE_MODEL_FAILURE,
  payload: error
});

export const deleteVehicleModelSuccess = (modelCode: string): DeleteVehicleModelSuccess => ({
  type: VehicleModelActionTypes.DELETE_VEHICLE_MODEL_SUCCESS,
  payload: modelCode
});

export const deleteVehicleModelFailure = (
  error: string
): DeleteVehicleModelFailure => ({
  type: VehicleModelActionTypes.DELETE_VEHICLE_MODEL_FAILURE,
  payload: error
});

export const fetchVehicleModels = (): ThunkAction<
  Promise<VehicleModelAction>,
  RootState,
  unknown,
  VehicleModelAction
> => async (dispatch) => {
  dispatch(fetchVehicleModelsRequest());
  try {
    const response = await getAllVehicleModels();

    if (response.code === "0" && response.data) {
      const successAction = fetchVehicleModelsSuccess(response.data);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = fetchVehicleModelsFailure(response.message || "Failed to fetch vehicle models");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = fetchVehicleModelsFailure(error instanceof Error ? error.message : "Failed to fetch vehicle models");

    dispatch(failureAction);
    return failureAction;
  }
};

export const addOrUpdateVehicleModel = (
  vehicleModel: VehicleModel
): ThunkAction<Promise<VehicleModelAction>, RootState, unknown, VehicleModelAction> => async (dispatch) => {
  dispatch(saveVehicleModelRequest());
  try {
    const response = await saveVehicleModel(vehicleModel);

    if (response.code === "0") {
      const successAction = saveVehicleModelSuccess(response);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = saveVehicleModelFailure(response.message || "Failed to save vehicle model");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = saveVehicleModelFailure(error instanceof Error ? error.message : "Failed to save vehicle model");

    dispatch(failureAction);
    return failureAction;
  }
};

export const removeVehicleModel = (
  modelCode: string
): ThunkAction<Promise<VehicleModelAction>, RootState, unknown, VehicleModelAction> => async (dispatch) => {
  try {
    const response = await deleteVehicleModel(modelCode);

    if (response.code === "0") {
      const successAction = deleteVehicleModelSuccess(modelCode);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = deleteVehicleModelFailure(response.message || "Failed to delete vehicle model");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = deleteVehicleModelFailure(
      error instanceof Error ? error.message : "Failed to delete vehicle model"
    );

    dispatch(failureAction);
    return failureAction;
  }
};
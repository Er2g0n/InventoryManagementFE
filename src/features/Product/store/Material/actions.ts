import { ThunkAction } from 'redux-thunk';
import { RootState } from '@/store/store';
import {
  MaterialActionTypes,
  FetchMaterialsRequest,
  FetchMaterialsSuccess,
  FetchMaterialsFailure,
  SaveMaterialRequest,
  SaveMaterialSuccess,
  SaveMaterialFailure,
  DeleteMaterialSuccess,
  MaterialAction,
} from './types';

import { ResultService } from '@/types/Base/ResultService';
import { Material } from '@/types/MasterData/Product/ProductProperties';
import { deleteMaterial, getAllMaterial, saveMaterial } from '@features/Product/Services/ProductMaterialService';

export const fetchMaterialsRequest = (): FetchMaterialsRequest => ({
  type: MaterialActionTypes.FETCH_MATERIALS_REQUEST,
});

export const fetchMaterialsSuccess = (
  materials: Material[]
): FetchMaterialsSuccess => ({
  type: MaterialActionTypes.FETCH_MATERIALS_SUCCESS,
  payload: materials,
});

export const fetchMaterialsFailure = (
  error: string
): FetchMaterialsFailure => ({
  type: MaterialActionTypes.FETCH_MATERIALS_FAILURE,
  payload: error,
});

export const saveMaterialRequest = (): SaveMaterialRequest => ({
  type: MaterialActionTypes.SAVE_MATERIAL_REQUEST,
});

export const saveMaterialSuccess = (
  response: ResultService<Material>
): SaveMaterialSuccess => ({
  type: MaterialActionTypes.SAVE_MATERIAL_SUCCESS,
  payload: response,
});

export const saveMaterialFailure = (
  error: string
): SaveMaterialFailure => ({
  type: MaterialActionTypes.SAVE_MATERIAL_FAILURE,
  payload: error,
});

export const deleteMaterialSuccess = (
  materialCode: string
): DeleteMaterialSuccess => ({
  type: MaterialActionTypes.DELETE_MATERIAL_SUCCESS,
  payload: materialCode,
});

export const deleteMaterialFailure = (
  error: string
): MaterialAction => ({
  type: MaterialActionTypes.DELETE_MATERIAL_FAILURE,
  payload: error,
});

export const fetchMaterials = (): ThunkAction<
  Promise<MaterialAction>,
  RootState,
  unknown,
  MaterialAction
> => async (dispatch) => {
  dispatch(fetchMaterialsRequest());
  try {
    const response = await getAllMaterial();
    if (response.code === "0") {
      var successAction = fetchMaterialsSuccess(response.data!);
      dispatch(successAction);
      return successAction;
    } else {
      var failureAction = fetchMaterialsFailure(response.message || 'Failed to fetch Data');
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    var failureAction = fetchMaterialsFailure(error instanceof Error ? error.message : 'Failed to fetch');
    dispatch(failureAction);
    return failureAction;
  }
};

export const addOrUpdateMaterial = (
  material: Material
): ThunkAction<Promise<MaterialAction>, RootState, unknown, MaterialAction> => async (dispatch) => {
  dispatch(saveMaterialRequest());
  try {
    const response = await saveMaterial(material);
    if (response.code === "0") {
      var successAction = saveMaterialSuccess(response);
      dispatch(successAction);
      return successAction;
    } else {
      var failureAction = saveMaterialFailure(response.message || 'Failed to save');
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    var failureAction = saveMaterialFailure(error instanceof Error ? error.message : 'Failed to save');
    dispatch(failureAction);
    return failureAction;
  }
};

export const removeMaterial = (
  materialCode: string
): ThunkAction<Promise<MaterialAction>, RootState, unknown, MaterialAction> => async (dispatch) => {
  try {
    const response = await deleteMaterial(materialCode);
    if (response.code === "0") {
      var successAction = deleteMaterialSuccess(materialCode);
      dispatch(successAction);
      return successAction;
    } else {
      var failureAction = deleteMaterialFailure(response.message || 'Failed to delete');
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    var failureAction = deleteMaterialFailure(
      error instanceof Error ? error.message : 'Failed to delete'
    );
    dispatch(failureAction);
    return failureAction;
  }
};
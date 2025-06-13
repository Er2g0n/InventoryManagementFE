import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
  fetchMaterials,
  addOrUpdateMaterial,
  removeMaterial
} from '../actions';
import { MaterialActionTypes } from '../types';
import { Material } from '@/types/MasterData/Product/ProductProperties';

export const useMaterials = () => {
  const dispatch = useDispatch<AppDispatch>();
  const materials = useSelector((state: RootState) => state.material.materials);
  const loading = useSelector((state: RootState) => state.material.loading);
  const error = useSelector((state: RootState) => state.material.error);

  const loadMaterials = (): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(fetchMaterials())
        .then((action) => {
          if (action.type === MaterialActionTypes.FETCH_MATERIALS_SUCCESS) {
            resolve({ success: true });
          } else {
            resolve({
              success: false,
              message: "Failed to fetch materials.",
            });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while fetching materials.",
          });
        });
    });

  const saveMaterial = (material: Material): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(addOrUpdateMaterial(material))
        .then((action) => {
          if (action.type === MaterialActionTypes.SAVE_MATERIAL_SUCCESS) {
            resolve({ success: true, message: action.payload.message });
          } else if (action.type === MaterialActionTypes.SAVE_MATERIAL_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to save material." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while saving material.",
          });
        });
    });

  const deleteMaterial = (materialCode: string): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(removeMaterial(materialCode))
        .then((action) => {
          if (action.type === MaterialActionTypes.DELETE_MATERIAL_SUCCESS) {
            resolve({ success: true, message: action.payload });
          } else if (action.type === MaterialActionTypes.DELETE_MATERIAL_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to delete material." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while deleting material.",
          });
        });
    });

  return {
    materials,
    loading,
    error,
    loadMaterials,
    saveMaterial,
    deleteMaterial,
  };
};
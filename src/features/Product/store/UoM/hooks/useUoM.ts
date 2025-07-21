import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteUoMAction, fetchUoMs, saveUoMAction } from "../actions";
import { UoMActionTypes } from "../types";
import { UnitOfMeasure } from "@/types/MasterData/Product/ProductProperties";

export const useUoM = () => {
    const dispatch = useDispatch<AppDispatch>();
    const uoMList = useSelector((state: RootState) => state.uom.uoMList);
    const loading = useSelector((state: RootState) => state.uom.loading);
    const error = useSelector((state: RootState) => state.uom.error);

    const loadUoM = (): Promise<{ success: boolean; message?: string }> =>
        new Promise((resolve, reject) => {
            dispatch(fetchUoMs())
                .then((action) => {
                    if (action.type === UoMActionTypes.FETCH_UOM_SUCCESS) {
                        resolve({ success: true });
                    } else {
                        resolve({
                            success: false,
                            message: "Failed to fetch unit of measures.",
                        });
                    }
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error instanceof Error ? error.message : "An error occurred while fetching unit of measures.",
                    });
                });
        });

    const saveUoM = (unitOfMeasure: UnitOfMeasure): Promise<{ success: boolean; message?: string }> =>
        new Promise((resolve, reject) => {
            dispatch(saveUoMAction(unitOfMeasure))
                .then((action) => {
                    if (action.type === UoMActionTypes.SAVE_UOM_SUCCESS) {
                        resolve({ success: true, message: action.payload.message });
                    } else if (action.type === UoMActionTypes.SAVE_UOM_FAILURE) {
                        resolve({ success: false, message: action.payload || "Failed to save unit of measure." });
                    }
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error instanceof Error ? error.message : "An error occurred while saving unit of measure.",
                    });
                });
        });

    const deleteUoM = (uomCode: string): Promise<{ success: boolean; message?: string }> =>
        new Promise((resolve, reject) => {
            dispatch(deleteUoMAction(uomCode))
                .then((action) => {
                    if (action.type === UoMActionTypes.DELETE_UOM_SUCCESS) {
                        resolve({ success: true, message: action.payload });
                    } else if (action.type === UoMActionTypes.DELETE_UOM_FAILURE) {
                        resolve({ success: false, message: action.payload || "Failed to delete unit of measure." });
                    }
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error instanceof Error ? error.message : "An error occurred while deleting unit of measure.",
                    });
                });
        });

    return {
        uoMList,
        loading,
        error,
        loadUoM,
        saveUoM,
        deleteUoM,
    };

}

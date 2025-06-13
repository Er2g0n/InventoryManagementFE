import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateColor, fetchColors, removeColor } from "../actions";
import { Color } from "@/types/MasterData/Product/ProductProperties";
import { ColorActionTypes } from "../types";

export const useColors = () => {
  const dispatch = useDispatch<AppDispatch>();
  const colors = useSelector((state: RootState) => state.color.colors);
  const loading = useSelector((state: RootState) => state.color.loading);
  const error = useSelector((state: RootState) => state.color.error);

  const loadColors = (): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(fetchColors())
        .then((action) => {
          if (action.type == ColorActionTypes.FETCH_COLORS_SUCCESS) {
            resolve({ success: true });
          } else {
            resolve({
              success: false,
              message: "Failed to fetch colors.",
            });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while fetching colors.",
          });
        });
    });

  const saveColor = (color: Color): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(addOrUpdateColor(color))
        .then((action) => {
          if (action.type === ColorActionTypes.SAVE_COLOR_SUCCESS) {
            resolve({ success: true, message: action.payload.message });
          } else if (action.type === ColorActionTypes.SAVE_COLOR_FAILURE){
            resolve({
              success: false,
              message: action.payload ||"Failed to save color.",
            });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while saving color.",
          });
        });
    });

  const deleteColor = (colorCode: string): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(removeColor(colorCode))
        .then((action) => {
          if (action.type === ColorActionTypes.DELETE_COLOR_SUCCESS) {
            resolve({ success: true, message: action.payload });
          } else if (action.type === ColorActionTypes.DELETE_COLOR_FAILURE){
            resolve({
              success: false,
              message: action.payload || "Failed to delete color.",
            });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while deleting color.",
          });
        });
    });

  return {
    colors,
    loading,
    error,
    loadColors,
    saveColor,
    deleteColor,
  };
};
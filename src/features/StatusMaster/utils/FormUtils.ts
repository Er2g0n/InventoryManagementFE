import { AnyFieldApi } from "@tanstack/react-form";
export function fieldStatus ( field: AnyFieldApi) : "validating" | "error" | "success" | "warning" | "" {
  if (field.state.meta.isValidating) {
    return "validating";
  }
  if (field.state.meta.isTouched && !field.state.meta.isValid && field.state.meta.errors.length > 0) {
    return "error";
  }
  if (field.state.meta.isTouched && field.state.meta.isValid) {
    return "success";
  }
  if (field.state.meta.isTouched && field.state.meta.errors.length > 0 && !field.state.meta.isValid) {
    return "warning";
  }
  return "" ;
}
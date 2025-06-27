import { Button, Modal, Input, Select, message } from "antd";
import { useCallback, useEffect } from "react";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Brand, VehicleModel } from "@/types/MasterData/Product/ProductClassification";
import { useVehicleModels } from "@features/Product/store/VehicleModel/hooks/useVehicleModel";
import { useBrands } from "@features/Product/store/Brand/hooks/useBrand";
import { vehicleModelSchema } from "@features/Product/schemas/ProductVehicleModelSchema";

type FormValues = {
  modelName: string;
  brandCode: string;
};

interface FormVehicleModelProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isEditing: boolean;
  currentVehicleModel: VehicleModel | null;
}

const FormVehicleModel: React.FC<FormVehicleModelProps> = ({
  isModalOpen,
  setIsModalOpen,
  isEditing,
  currentVehicleModel
}) => {
  const { vehicleModels, saveVehicleModel } = useVehicleModels();
  const { brands, loadBrands } = useBrands();

  const form = useForm({
    defaultValues: {
      modelName: isEditing && currentVehicleModel ? currentVehicleModel.modelName : "",
      brandCode: isEditing && currentVehicleModel ? currentVehicleModel.brandCode : ""
    },
    validators: {
      onBlur: vehicleModelSchema
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    }
  });

  useEffect(() => {
    loadBrands().catch((err) => console.error("Error loading brands:", err));
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    form.reset();
  }, [form, setIsModalOpen]);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const vehicleModel: VehicleModel = {
          id: isEditing && currentVehicleModel ? currentVehicleModel.id : 0,
          modelCode: isEditing && currentVehicleModel ? currentVehicleModel.modelCode : "",
          modelName: values.modelName,
          brandCode: values.brandCode,
          createdBy: "admin",
          updatedBy: "admin",
          createdDate: isEditing && currentVehicleModel ? currentVehicleModel.createdDate : new Date().toISOString(),
          updatedDate: new Date().toISOString()
        };

        const result = await saveVehicleModel(vehicleModel);

        if (!result.success) {
          message.error(result.message || "Lỗi khi lưu mẫu xe");
          return;
        }

        message.success(result.message);
      } catch (error) {
        console.error("Error saving vehicle model:", error);
        message.error("Failed to save vehicle model");
      } finally {
        handleCancel();
      }
    },
    [isEditing, currentVehicleModel, saveVehicleModel, handleCancel]
  );

  const checkDuplicate = (
    name: string,
    vehicleModels: VehicleModel[],
    currentId?: number
  ): boolean => {
    return vehicleModels.some(
      (vm) =>
        vm.modelName.trim().toLowerCase() === name.trim().toLowerCase() &&
        vm.id !== currentId
    );
  };

  return (
    <Modal
      title={isEditing ? "Edit Vehicle Model" : "Add Vehicle Model"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      {isEditing && (
        <div style={{ marginBottom: 16 }}>
          <label>Model Code</label>
          <Input value={currentVehicleModel?.modelCode} readOnly />
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        {form.Field({
          name: "modelName",
          validators: {
            onBlur: (value) => {
              const isDuplicate = checkDuplicate(value.value, vehicleModels, currentVehicleModel?.id);

              if (isDuplicate) {
                return [{ message: "Vehicle model name already exists" }];
              }
              return undefined;
            }
          },
          children: (field) => {
            const errs = field.state.meta.errors;

            if (errs && errs.length > 0) {
              console.error("Errors in field:", errs);
            }
            return (
              <div style={{ marginBottom: 16 }}>
                <label>Model Name</label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter Model Name"
                  status={field.state.meta.errors?.length > 0 ? "error" : undefined}
                />
                <FieldInfo field={field} />
              </div>
            );
          }
        })}
        {form.Field({
          name: "brandCode",
          validators: {
            onBlur: (value) => {
              if (!value.value) {
                return [{ message: "Brand is required" }];
              }
              return undefined;
            }
          },
          children: (field) => {
            const errs = field.state.meta.errors;

            if (errs && errs.length > 0) {
              console.error("Errors in field:", errs);
            }
            return (
              <div style={{ marginBottom: 16 }}>
                <label>Brand</label>
                <Select
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  onBlur={field.handleBlur}
                  placeholder="Select Brand"
                  status={field.state.meta.errors?.length > 0 ? "error" : undefined}
                  style={{ width: "100%" }}
                >
                  {brands.map((brand: Brand) => (
                    <Select.Option key={brand.brandCode} value={brand.brandCode}>
                      {brand.brandName}
                    </Select.Option>
                  ))}
                </Select>
                <FieldInfo field={field} />
              </div>
            );
          }
        })}
        <div>
          <Button type="primary" htmlType="submit" loading={form.state.isSubmitting}>
            Save
          </Button>
          <Button danger style={{ marginLeft: 8 }} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

function FieldInfo ({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.errors.length > 0 ? (
        <span style={{ color: "red" }}>
          {field.state.meta.errors.map((err) => err.message).join(", ")}
        </span>
      ) : null}
    </>
  );
}

export default FormVehicleModel;
import { Button, Modal, Input, message, Switch, InputNumber } from "antd";
import { useCallback, useEffect } from "react";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Warehouse } from "@/types/WarehouseManagement/Warehouse";
import { useWarehouses } from "@features/Inventory/Store/Warehouse/hooks/useWarehouse";
import { warehouseSchema } from "@features/Inventory/Schemas/InventoryWarehouseSchema";
import * as z from "zod";

type FormValues = {
  warehouseName: string;
  address: string;
  allowNegativeStock: boolean;
  binLocationCount: number;
};

interface InventoryWarehouseFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isEditing: boolean;
  currentWarehouse: Warehouse | null;
}

const InventoryWarehouseForm: React.FC<InventoryWarehouseFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  isEditing,
  currentWarehouse
}) => {
  const { warehouses, saveWarehouse } = useWarehouses();

  const form = useForm({
    defaultValues: {
      warehouseName: isEditing && currentWarehouse ? currentWarehouse.warehouseName : "",
      address: isEditing && currentWarehouse ? currentWarehouse.address : "",
      allowNegativeStock: isEditing && currentWarehouse ? currentWarehouse.allowNegativeStock : false,
      binLocationCount: isEditing && currentWarehouse ? currentWarehouse.binLocationCount ?? 0 : 0
    },
    validators: {
      onBlur: async (value) => {
        try {
          await warehouseSchema.parseAsync(value);
          return undefined;
        } catch (err) {
          return (err as z.ZodError).issues.map(issue => ({
            path: issue.path.join("."),
            message: issue.message
          }));
        }
      }
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    }
  });


  useEffect(() => {
    // No need for loadBrands as Warehouse isn’t directly related to Brand
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    form.reset();
  }, [form, setIsModalOpen]);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const warehouse: Warehouse = {
          id: isEditing && currentWarehouse ? currentWarehouse.id : 0,
          warehouseCode: isEditing && currentWarehouse ? currentWarehouse.warehouseCode : "",
          warehouseName: values.warehouseName,
          allowNegativeStock: values.allowNegativeStock,
          address: values.address,
          binLocationCount: values.binLocationCount,
          createdBy: "admin",
          updatedBy: "admin",
          createdDate: isEditing && currentWarehouse ? currentWarehouse.createdDate : new Date().toISOString(),
          updatedDate: new Date().toISOString()
        };

        const result = await saveWarehouse(warehouse);

        if (!result.success) {
          message.error(result.message || "Error saving warehouse");
          return;
        }

        message.success(result.message);
      } catch (error) {
        console.error("Error saving warehouse:", error);
        message.error("Failed to save warehouse");
      } finally {
        handleCancel();
      }
    },
    [isEditing, currentWarehouse, saveWarehouse, handleCancel]
  );

  const checkDuplicate = (
    name: string,
    warehouses: Warehouse[],
    currentId?: number
  ): boolean => {
    return warehouses.some(
      (wh) =>
        wh.warehouseName.trim().toLowerCase() === name.trim().toLowerCase() &&
        wh.id !== currentId
    );
  };

  return (
    <Modal
      title={isEditing ? "Edit Warehouse" : "Add Warehouse"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      {isEditing && (
        <div style={{ marginBottom: 16 }}>
          <label>Warehouse Code</label>
          <Input value={currentWarehouse?.warehouseCode} readOnly />
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        {form.Field({
          name: "warehouseName",
          validators: {
            onBlur: (value) => {
              const isDuplicate = checkDuplicate(value.value, warehouses, currentWarehouse?.id);

              if (isDuplicate) {
                return [{ message: "Warehouse name already exists" }];
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
                <label>Warehouse Name</label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter Warehouse Name"
                  status={field.state.meta.errors?.length > 0 ? "error" : undefined}
                />
                <FieldInfo field={field} />
              </div>
            );
          }
        })}
        {form.Field({
          name: "address",
          validators: {
            onBlur: (value) => {
              if (!value.value) {
                return [{ message: "Address is required" }];
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
                <label>Address</label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter Address"
                  status={field.state.meta.errors?.length > 0 ? "error" : undefined}
                />
                <FieldInfo field={field} />
              </div>
            );
          }
        })}
        {form.Field({
          name: "allowNegativeStock",
          children: (field) => (
            <div style={{ marginBottom: 16 }}>
              <label>Allow Negative Stock</label>
              <Switch
                checked={field.state.value}
                onChange={(checked) => field.handleChange(checked)}
              />
            </div>
          )
        })}
        {form.Field({
          name: "binLocationCount",
          children: (field) => (
            <div style={{ marginBottom: 16 }}>
              <label>Bin Location Count</label>
              <InputNumber
                value={field.state.value}
                onChange={(value) => field.handleChange(value ?? 0)} // Default to 0 if null
                min={0}
                style={{ width: "100%" }}
              />
            </div>
          )
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

export default InventoryWarehouseForm;
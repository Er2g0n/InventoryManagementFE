import { Button, Modal, Input, message } from "antd";
import { useCallback } from "react";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Brand } from "@/types/MasterData/Product/ProductClassification";
import { useBrands } from "@features/Product/store/Brand/hooks/useBrand";
import { productBrandSchema } from "@features/Product/schemas/ProductBrandSchema";

type FormValues = {
  brandName: string;
};

interface FormProductBrandProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isEditing: boolean;
  currentBrand: Brand | null;
  refreshTrigger: number;
  setRefreshTrigger: (value: number) => void;
}

const FormProductBrand: React.FC<FormProductBrandProps> = ({
  isModalOpen,
  setIsModalOpen,
  isEditing,
  currentBrand,
  refreshTrigger,
  setRefreshTrigger,
}) => {
  const { brands, saveBrand } = useBrands();

  const form = useForm({
    defaultValues: {
      brandName: isEditing && currentBrand ? currentBrand.brandName : "",
    },
    validators: {
      onBlur: productBrandSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    form.reset();
  }, [form, setIsModalOpen]);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const brand: Brand = {
          id: isEditing && currentBrand ? currentBrand.id : 0,
          brandCode: isEditing && currentBrand ? currentBrand.brandCode : "",
          brandName: values.brandName,
          createdBy: "admin",
          updatedBy: "admin",
          createdDate: isEditing && currentBrand ? currentBrand.createdDate : new Date().toISOString(),
          updatedDate: new Date().toISOString(),
        };

        await saveBrand(brand);
        setRefreshTrigger(refreshTrigger + 1);
        message.success("Brand saved successfully");
      } catch (error) {
        console.error("Error saving brand:", error);
        message.error("Failed to save brand");
      } finally {
        handleCancel();
      }
    },
    [isEditing, currentBrand, saveBrand, refreshTrigger, setRefreshTrigger, handleCancel]
  );

  const checkDuplicate = (
    name: string,
    brands: Brand[],
    currentId?: number
  ): boolean => {
    return brands.some(
      (b) =>
        b.brandName.trim().toLowerCase() === name.trim().toLowerCase() &&
        b.id !== currentId
    );
  };

  return (
    <Modal
      title={isEditing ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu mới"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      {isEditing && (
        <div style={{ marginBottom: 16 }}>
          <label>Brand Code</label>
          <Input value={currentBrand?.brandCode} readOnly />
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        {form.Field({
          name: "brandName",
          validators: {
            onBlur: (value) => {
              const isDuplicate = checkDuplicate(value.value, brands, currentBrand?.id);
              if (isDuplicate) {
                return [{ message: "Tên thương hiệu đã tồn tại" }];
              }
              return undefined;
            },
          },
          children: (field) => {
            const errs = field.state.meta.errors;
            if (errs && errs.length > 0) {
              console.log("Errors in field:", errs);
            }
            return (
              <div style={{ marginBottom: 16 }}>
                <label>Brand Name</label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter Brand Name"
                  status={field.state.meta.errors?.length > 0 ? "error" : undefined}
                />
                <FieldInfo field={field} />
              </div>
            );
          },
        })}
        <div>
          <Button type="primary" htmlType="submit" loading={form.state.isSubmitting}>
            Lưu
          </Button>
          <Button danger style={{ marginLeft: 8 }} onClick={handleCancel}>
            Hủy
          </Button>
        </div>
      </form>
    </Modal>
  );
};

function FieldInfo({ field }: { field: AnyFieldApi }) {
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

export default FormProductBrand;
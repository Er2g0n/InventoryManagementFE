import { ProductType } from "@/types/MasterData/Product/ProductClassification";
import { productTypeSchema } from "@features/Product/schemas/ProductTypeSchema";
import { useProductTypes } from "@features/Product/store/ProductType/hooks/useProductType";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Button, Input, message, Modal } from "antd";
import { useCallback } from "react";

type FormValues = {
    productTypeName: string;
}

interface FormProductTypeProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    isEditing: boolean;
    currentProductType: ProductType | null;
    refreshTrigger: number;
    setRefreshTrigger: (value: number) => void;
}

const FormProductType: React.FC<FormProductTypeProps> = ({
    isModalOpen,
    setIsModalOpen,
    isEditing,
    currentProductType,
    refreshTrigger,
    setRefreshTrigger,
}) => {
    const { productTypes, saveProductType } = useProductTypes();

    const form = useForm({
        defaultValues: {
            productTypeName: isEditing && currentProductType ? currentProductType.productTypeName : ""
        },
        validators: {
            onBlur: productTypeSchema
        },
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        }

    });

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
        form.reset();
    }, [form, setIsModalOpen]);

    const onSubmit = useCallback(
        async (values: FormValues) => {
            try {
                const productType: ProductType = {
                    id: isEditing && currentProductType ? currentProductType.id : 0,
                    productTypeCode: isEditing && currentProductType ? currentProductType.productTypeCode : "",
                    productTypeName: values.productTypeName,
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdDate: isEditing && currentProductType ? currentProductType.createdDate : new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                };

                await saveProductType(productType);
                setRefreshTrigger(refreshTrigger + 1);
                message.success("Product type saved successfully");
            }
            catch (error) {
                message.error("Error saving product type:");
            }
            finally{
                handleCancel();
            }
        },
        [isEditing, currentProductType, saveProductType, refreshTrigger, setRefreshTrigger, handleCancel]
    );

    const checkDuplicate = (
        name: string,
        productTypes: ProductType[],
        currentId?: number
    ): boolean => {
        return productTypes.some(
            (c) =>
                c.productTypeName.trim().toLowerCase() === name.trim().toLowerCase() &&
                c.id !== currentId
        );
    };

     return (
        <Modal
            title={isEditing ? "Chỉnh sửa loại sản phẩm" : "Thêm loại sản phẩm mới"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            {isEditing && (
                <div style={{ marginBottom: 16 }}>
                    <label>Category Code</label>
                    <Input value={currentProductType?.productTypeCode} readOnly />
                </div>
            )}
            <form onSubmit={(event) => {
                event.preventDefault();
                form.handleSubmit();
            }}>
                {form.Field({
                    name: "productTypeName",
                    validators: {
                        onBlur: (value) => {
                            const isDuplicate = checkDuplicate(value.value, productTypes, currentProductType?.id);
                            if (isDuplicate) {
                               return [{ message: "Tên loại sản phẩm đã tồn tại" }];
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
                                <label>Category Name</label>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="Enter Product Type Name"
                                    status={field.state.meta.errors?.length > 0 ? "error" : undefined}

                                />
                                <FieldInfo field={field} />
            
                            </div>
                        );
                    }
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
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.errors.length > 0 ? (
                <span style={{ color: "red" }}>{field.state.meta.errors.map((err) => err.message).join(',')}</span>
            ) : null}
           
        </>
    )
}

export default FormProductType;
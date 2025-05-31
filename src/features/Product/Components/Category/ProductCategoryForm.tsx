import { Button, Modal, Input, message } from "antd";
import { useCallback } from "react";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { ProductCategory } from "@/types/ProductClassification/ProductCategory";
import { useProductCategories } from "@features/Product/store/ProductCategory/hooks/useProductCategory";
import { productCategorySchema } from "@features/Product/schemas/ProductCategorySchema";

type FormValues = {
    categoryName: string;
};

interface FormProductCategoryProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    isEditing: boolean;
    currentProductCategory: ProductCategory | null;
    refreshTrigger: number;
    setRefreshTrigger: (value: number) => void;
}

const FormProductCategory: React.FC<FormProductCategoryProps> = ({
    isModalOpen,
    setIsModalOpen,
    isEditing,
    currentProductCategory,
    refreshTrigger,
    setRefreshTrigger,
}) => {
    const { productCategories, saveProductCategory } = useProductCategories();

    const form = useForm({
        defaultValues: {
            categoryName: isEditing && currentProductCategory ? currentProductCategory.categoryName : ""
        },

        validators: {
            // onChange: productCategorySchema,
            onBlur: productCategorySchema,

            onSubmitAsync: async ({ value }) => {
                const errors: Record<string, string[]> = {};

                const isDuplicate = checkDuplicate(
                    value.categoryName,
                    productCategories,
                    currentProductCategory?.id
                );
                console.log("Checking for duplicates:", value.categoryName, isDuplicate);
                if (isDuplicate) {
                    errors.categoryName = [
                        ...(errors.categoryName || []),
                        "Tên loại sản phẩm đã tồn tại"
                    ];
                }
                console.log("Validation errors:", errors);
                if (Object.keys(errors).length > 0) {
                    return errors;
                }

                console.log("No validation errors found");
                return undefined;
            }

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
                const productCategory: ProductCategory = {
                    id: isEditing && currentProductCategory ? currentProductCategory.id : 0,
                    categoryCode: isEditing && currentProductCategory ? currentProductCategory.categoryCode : "",
                    categoryName: values.categoryName,
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdDate: isEditing && currentProductCategory ? currentProductCategory.createdDate : new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                };

                await saveProductCategory(productCategory);
                setRefreshTrigger(refreshTrigger + 1);
                message.success("Product category saved successfully");
            } catch (error) {
                console.error("Error saving product category:", error);
                message.error("Failed to save product category");
            } finally {
                handleCancel();
            }
        },
        [isEditing, currentProductCategory, saveProductCategory, refreshTrigger, setRefreshTrigger, handleCancel]
    );

    const checkDuplicate = (
        name: string,
        productCategories: ProductCategory[],
        currentId?: number
    ): boolean => {
        return productCategories.some(
            (c) =>
                c.categoryName.trim().toLowerCase() === name.trim().toLowerCase() &&
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
                    <Input value={currentProductCategory?.categoryCode} readOnly />
                </div>
            )}
            <form onSubmit={(event) => {
                event.preventDefault();
                form.handleSubmit();
            }}>
                {form.Field({
                    name: "categoryName",
                    validators: {
                        onBlur: (value) => {
                            const isDuplicate = checkDuplicate(value.value, productCategories, currentProductCategory?.id);
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
                                    placeholder="Enter Category Name"
                                    status={field.state.meta.errors?.length > 0 ? "error" : undefined}

                                />
                                <FieldInfo field={field} />
                                {/* { errs?.length > 0 && (
                                    <span style={{ color: "red" }}>{field.state.meta.errors.join(", ")}</span>
                                )} */}
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
};

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.errors.length > 0 ? (
                <span style={{ color: "red" }}>{field.state.meta.errors.map((err) => err.message).join(',')}</span>
            ) : null}
           
        </>
    )
}

export default FormProductCategory;
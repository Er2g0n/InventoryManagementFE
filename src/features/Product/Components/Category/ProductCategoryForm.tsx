import { Button, Form, Input, Modal } from "antd";
import { useCallback } from "react";
import type { FormInstance } from "antd/es/form/Form";
import { ProductCategory } from "@/types/ProductClassification/ProductCategory";
import { useProductCategories } from "@features/Product/store/ProductCategory/hooks/useProductCategory";

type FieldType = {
    categoryCode?: string;
    categoryName: string;
};

interface FormProductCategoryProps {
    form: FormInstance;
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    isEditing: boolean;
    currentProductCategory: ProductCategory | null;
    refreshTrigger: number;
    setRefreshTrigger: (value: number) => void;
}

const FormProductCategory: React.FC<FormProductCategoryProps> = ({
    form,
    isModalOpen,
    setIsModalOpen,
    isEditing,
    currentProductCategory,
    refreshTrigger,
    setRefreshTrigger,
}) => {
    const { saveProductCategory } = useProductCategories();

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
        form.resetFields();
    }, [form, setIsModalOpen]);

    const onFinish = useCallback(
        async (values: FieldType) => {
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

                await saveProductCategory(productCategory); //gọi tới saveProductCategory từ actions
                setRefreshTrigger(refreshTrigger + 1); // cài này để refresh danh sách loại sản phẩm sau khi lưu
                form.resetFields();
            } catch (error) {
                console.error("Error saving product category:", error);
            } finally {
                handleCancel();
            }
        },
        [isEditing, currentProductCategory, saveProductCategory, handleCancel]
    );

    return (
        <Modal
            title={isEditing ? "Chỉnh sửa loại sản phẩm" : "Thêm loại sản phẩm mới"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                name="product_category_form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                {isEditing && (
                    <Form.Item<FieldType>
                        label="Category Code"
                        name="categoryCode"
                    >
                        <Input readOnly />
                    </Form.Item>
                )}
                <Form.Item<FieldType>
                    label="Category Name"
                    name="categoryName"
                    rules={[{ required: true, message: "Category Name is required!" }]}
                >
                    <Input placeholder="Enter Category Name" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                    <Button danger style={{ marginLeft: 8 }} onClick={handleCancel}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default FormProductCategory;
import { Button, Modal, Input, message } from "antd";
import { useCallback } from "react";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Material } from "@/types/MasterData/Product/ProductProperties";
import { useMaterials } from "@features/Product/store/Material/hooks/useMaterial";
import { productMaterialSchema } from "@features/Product/schemas/ProductMaterialSchema";


type FormValues = {
    materialName: string;
};

interface FormMaterialProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    isEditing: boolean;
    currentMaterial: Material | null;
}

const FormMaterial: React.FC<FormMaterialProps> = ({
    isModalOpen,
    setIsModalOpen,
    isEditing,
    currentMaterial,
}) => {
    const { materials, saveMaterial } = useMaterials();

    const form = useForm({
        defaultValues: {
            materialName: isEditing && currentMaterial ? currentMaterial.materialName : ""
        },
        validators: {
            onBlur: productMaterialSchema,
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
                const material: Material = {
                    id: isEditing && currentMaterial ? currentMaterial.id : 0,
                    materialCode: isEditing && currentMaterial ? currentMaterial.materialCode : "",
                    materialName: values.materialName,
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdDate: isEditing && currentMaterial ? currentMaterial.createdDate : new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                };

                const result = await saveMaterial(material);
                if (!result.success) {
                    message.error(result.message || "Lỗi khi lưu chất liệu");
                    return;
                }
                message.success(result.message);
            } catch (error) {
                console.error("Error saving material:", error);
                message.error("Failed to save material");
            } finally {
                handleCancel();
            }
        },
        [isEditing, currentMaterial, saveMaterial, handleCancel]
    );

    const checkDuplicate = (
        name: string,
        materials: Material[],
        currentId?: number
    ): boolean => {
        return materials.some(
            (m) =>
                m.materialName.trim().toLowerCase() === name.trim().toLowerCase() &&
                m.id !== currentId
        );
    };

    return (
        <Modal
            title={isEditing ? "Chỉnh sửa chất liệu" : "Thêm chất liệu mới"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            {isEditing && (
                <div style={{ marginBottom: 16 }}>
                    <label>Material Code</label>
                    <Input value={currentMaterial?.materialCode} readOnly />
                </div>
            )}
            <form onSubmit={(event) => {
                event.preventDefault();
                form.handleSubmit();
            }}>
                {form.Field({
                    name: "materialName",
                    validators: {
                        onBlur: (value) => {
                            const isDuplicate = checkDuplicate(value.value, materials, currentMaterial?.id);
                            if (isDuplicate) {
                               return [{ message: "Tên chất liệu đã tồn tại" }];
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
                                <label>Material Name</label>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="Enter Material Name"
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

export default FormMaterial;
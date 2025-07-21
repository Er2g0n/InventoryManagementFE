import { Button, Modal, Input, message } from "antd";
import { useCallback } from "react";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { UnitOfMeasure } from "@/types/MasterData/Product/ProductProperties";
import { UoMSchema } from "@features/Product/schemas/UoMSchema";
import { useUoM } from "@features/Product/store/UoM/hooks/useUoM";

type FormValues = {
    uoMName: string;
    uoMDescription: string;
};

interface FormUnitOfMeasureProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    isEditing: boolean;
    currentUoM: UnitOfMeasure | null;
}

const FormUnitOfMeasure: React.FC<FormUnitOfMeasureProps> = ({
    isModalOpen,
    setIsModalOpen,
    isEditing,
    currentUoM,
}) => {
    const { uoMList, saveUoM } = useUoM();

    const form = useForm({
        defaultValues: {
            uoMName: isEditing && currentUoM ? currentUoM.uoMName : "",
            uoMDescription: isEditing && currentUoM ? currentUoM.uoMDescription : ""
        },
        validators: {
            onBlur: UoMSchema,
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
                const unitOfMeasure: UnitOfMeasure = {
                    id: isEditing && currentUoM ? currentUoM.id : 0,
                    uoMCode: isEditing && currentUoM ? currentUoM.uoMCode : "",
                    uoMName: values.uoMName,
                    uoMDescription: values.uoMDescription,
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdDate: isEditing && currentUoM ? currentUoM.createdDate : new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                };

                const result = await saveUoM(unitOfMeasure);
                if (!result.success) {
                    message.error(result.message || "Lỗi khi lưu đơn vị tính");
                    return;
                }
                message.success(result.message || "Lưu đơn vị tính thành công");
            } catch (error) {
                console.error("Error saving unit of measure:", error);
                message.error("Failed to save unit of measure");
            } finally {
                handleCancel();
            }
        },
        [isEditing, currentUoM, saveUoM, handleCancel]
    );

    const checkDuplicate = (
        name: string,
        uoMList: UnitOfMeasure[],
        currentId?: number
    ): boolean => {
        return uoMList.some(
            (uom) =>
                uom.uoMName.trim().toLowerCase() === name.trim().toLowerCase() &&
                uom.id !== currentId
        );
    };

    return (
        <Modal
            title={isEditing ? "Chỉnh sửa đơn vị tính" : "Thêm đơn vị tính mới"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            {isEditing && (
                <div style={{ marginBottom: 16 }}>
                    <label>Mã đơn vị</label>
                    <Input value={currentUoM?.uoMCode} readOnly />
                </div>
            )}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    form.handleSubmit();
                }}
            >
                {form.Field({
                    name: "uoMName",
                    validators: {
                        onBlur: (value) => {
                            const isDuplicate = checkDuplicate(
                                value.value,
                                uoMList,
                                currentUoM?.id
                            );
                            if (isDuplicate) {
                                return [{ message: "Tên đơn vị tính đã tồn tại" }];
                            }
                            return undefined;
                        },
                    },
                    children: (field) => {
                        const errs = field.state.meta.errors;
                        if (errs && errs.length > 0) {
                            console.log("Errors in field uoMName:", errs);
                        }
                        return (
                            <div style={{ marginBottom: 16 }}>
                                <label>Tên đơn vị</label>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập tên đơn vị"
                                    status={field.state.meta.errors?.length > 0 ? "error" : undefined}
                                />
                                <FieldInfo field={field} />
                            </div>
                        );
                    },
                })}
                {form.Field({
                    name: "uoMDescription",
                    children: (field) => {
                        const errs = field.state.meta.errors;
                        if (errs && errs.length > 0) {
                            console.log("Errors in field uoMDescription:", errs);
                        }
                        return (
                            <div style={{ marginBottom: 16 }}>
                                <label>Mô tả</label>
                                <Input.TextArea
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập mô tả đơn vị"
                                    status={field.state.meta.errors?.length > 0 ? "error" : undefined}
                                />
                                <FieldInfo field={field} />
                            </div>
                        );
                    },
                })}
                <div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={form.state.isSubmitting}
                    >
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
                    {field.state.meta.errors.map((err) => err.message).join(",")}
                </span>
            ) : null}
        </>
    );
}

export default FormUnitOfMeasure;
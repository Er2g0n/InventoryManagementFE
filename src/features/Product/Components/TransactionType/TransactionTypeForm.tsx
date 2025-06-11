import { TransactionType } from "@/types/MasterData/TransactionType";
import { TransactionTypeSchema } from "@features/Product/schemas/TransactionTypeSchema";
import { useTransactionTypes } from "@features/Product/store/TransactionType/hooks/useTransactionType";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Button, Input, Modal, message } from "antd";
import { useCallback } from "react";

type FormValues = {
    transactionTypeName: string;
}

interface FormTransactionTypeProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    isEditing: boolean;
    currentTransactionType: TransactionType | null;
    refreshTrigger: number;
    setRefreshTrigger: (value: number) => void;
}

const FormTransactionType: React.FC<FormTransactionTypeProps> = ({
    isModalOpen,
    setIsModalOpen,
    isEditing,
    currentTransactionType,
    refreshTrigger,
    setRefreshTrigger,
}) => {
    const { transactionTypes, saveTransactionType } = useTransactionTypes();
    const form = useForm({
        defaultValues: {
            transactionTypeName: isEditing && currentTransactionType ? currentTransactionType.transactionTypeName : ""
        },

        validators: {
            onBlur: TransactionTypeSchema,

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
                const transactionType: TransactionType = {
                    id: isEditing && currentTransactionType ? currentTransactionType.id : 0,
                    transactionTypeCode: isEditing && currentTransactionType ? currentTransactionType.transactionTypeCode : "",
                    transactionTypeName: values.transactionTypeName,
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdDate: isEditing && currentTransactionType ? currentTransactionType.createdDate : new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                    documentTypeID: 0
                };

                await saveTransactionType(transactionType);
                setRefreshTrigger(refreshTrigger + 1);
                message.success("Saved successfully");
            } catch (error) {
                console.error("Error while saving:", error);
                message.error("Failed to save");
            } finally {
                handleCancel();
            }
        },
        [isEditing, currentTransactionType, saveTransactionType, refreshTrigger, setRefreshTrigger, handleCancel]
    );

    const checkDuplicate = (
        name: string,
        TransactionTypes: TransactionType[],
        currentId?: number
    ): boolean => {
        return TransactionTypes.some(
            (tt) =>
                tt.transactionTypeName.trim().toLowerCase() === name.trim().toLowerCase() &&
                tt.id !== currentId
        );
    };


    return (
        <Modal
            title={isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            {isEditing && (
                <div style={{ marginBottom: 16 }}>
                    <label>Category Code</label>
                    <Input value={currentTransactionType?.transactionTypeCode} readOnly />
                </div>
            )}
            <form onSubmit={(event) => {
                event.preventDefault();
                form.handleSubmit();
            }}>
                {form.Field({
                    name: "transactionTypeName",
                    validators: {
                        onBlur: (value) => {
                            const isDuplicate = checkDuplicate(value.value, transactionTypes, currentTransactionType?.id);
                            if (isDuplicate) {
                                return [{ message: "Tên danh mục đã tồn tại" }];
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
                                <label>Transaction Type Name</label>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="Enter Transaction Type Name"
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

export default FormTransactionType
import { GoodsReceiptNote } from "@/types/WarehouseManagement/GoodsReceiptNote";
import { GoodsReceiptNoteSchema } from "@features/Inventory/Schemas/GoodsReceiptNoteSchema";
import { useGoodsReceiptNote } from "@features/Inventory/Store/GoodsReceiptNote/hooks/useGoodsReceiptNote";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Button, Input, message, Modal } from "antd";
import { useCallback } from "react";

type FormValues = {
    notes: string;
}

interface FormGoodsReceiptNoteProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    isEditing: boolean;
    currentGoodsReceiptNote: GoodsReceiptNote | null;
    refreshTrigger: number;
    setRefreshTrigger: (value: number) => void;
}

const FormGoodsReceiptNote: React.FC<FormGoodsReceiptNoteProps> = ({
    isModalOpen,
    setIsModalOpen,
    isEditing,
    currentGoodsReceiptNote,
    refreshTrigger,
    setRefreshTrigger,
}) => {
    const { GoodsReceiptNotes, saveGoodsReceiptNote } = useGoodsReceiptNote();
    const form = useForm({
        defaultValues: {
            notes: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.notes : ""
        },

        validators: {
            onBlur: GoodsReceiptNoteSchema,

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
                const GoodsReceiptNote: GoodsReceiptNote = {
                    id: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.id : 0,
                    grnCode: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.grnCode : "",
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdDate: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.createdDate : new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                    notes: values.notes,
                    supplierID: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.supplierID : 0,
                    warehouseID: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.warehouseID : 0,
                    transactionTypeID: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.transactionTypeID : 0,
                    receiptDate: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.receiptDate : new Date().toISOString(),
                };

                await saveGoodsReceiptNote(GoodsReceiptNote);
                setRefreshTrigger(refreshTrigger + 1);
                message.success("Saved successfully");
            } catch (error) {
                console.error("Error while saving:", error);
                message.error("Failed to save");
            } finally {
                handleCancel();
            }
        },
        [isEditing, currentGoodsReceiptNote, saveGoodsReceiptNote, refreshTrigger, setRefreshTrigger, handleCancel]
    );

    const checkDuplicate = (
        grnCode: string,
        GoodsReceiptNotes: GoodsReceiptNote[],
        currentId?: number
    ): boolean => {
        return GoodsReceiptNotes.some(
            (grn) =>
                grn.grnCode.trim().toLowerCase() === grnCode.trim().toLowerCase() &&
                grn.id !== currentId
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
                    <Input value={currentGoodsReceiptNote?.grnCode} readOnly />
                </div>
            )}
            <form onSubmit={(event) => {
                event.preventDefault();
                form.handleSubmit();
            }}>
                {form.Field({
                    name: "notes",
                    validators: {
                        onBlur: (value) => {
                            const isDuplicate = checkDuplicate(value.value, GoodsReceiptNotes, currentGoodsReceiptNote?.id);
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

export default FormGoodsReceiptNote
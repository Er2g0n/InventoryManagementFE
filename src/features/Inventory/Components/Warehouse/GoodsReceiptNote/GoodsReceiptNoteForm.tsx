import { GoodsReceiptNote } from "@/types/WarehouseManagement/GoodsReceiptNote";
import { useGoodsReceiptNote } from "@features/Inventory/Store/GoodsReceiptNote/hooks/useGoodsReceiptNote";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Button, DatePicker, Input, Modal, notification, Row, Col } from "antd";
import { useCallback } from "react";
import dayjs from "dayjs";

type FormValues = {
    transactionTypeID: string;
    warehouseID: string;
    supplierID: string;
    receiptDate: string;
    notes: string;
};

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
    const { saveGoodsReceiptNote } = useGoodsReceiptNote();

    const form = useForm({
        defaultValues: {
            transactionTypeID: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.transactionTypeID.toString() : "",
            warehouseID: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.warehouseID.toString() : "",
            supplierID: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.supplierID.toString() : "",
            receiptDate: isEditing && currentGoodsReceiptNote
                ? dayjs(currentGoodsReceiptNote.receiptDate).isValid()
                    ? dayjs(currentGoodsReceiptNote.receiptDate).format("DD-MM-YYYY")
                    : new Date().toISOString()
                : new Date().toISOString(),
            notes: isEditing && currentGoodsReceiptNote ? currentGoodsReceiptNote.notes : "",
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
                    supplierID: parseInt(values.supplierID) || 0,
                    warehouseID: parseInt(values.warehouseID) || 0,
                    transactionTypeID: parseInt(values.transactionTypeID) || 0,
                    receiptDate: values.receiptDate
                        ? dayjs(values.receiptDate, "DD-MM-YYYY", true).isValid()
                            ? dayjs(values.receiptDate, "DD-MM-YYYY").toISOString()
                            : new Date().toISOString()
                        : new Date().toISOString(), // Chuyển sang ISO an toàn
                };
                //console.log("Form values:", values); // Debug
                const response = await saveGoodsReceiptNote(GoodsReceiptNote);
                if (response.success === true) {
                    notification.success({
                        message: "Success",
                        description: `Lưu phiếu ${GoodsReceiptNote.grnCode} thành công`,
                    });
                } else {
                    notification.error({
                        message: "Error",
                        description: `Tạo phiếu ${GoodsReceiptNote.grnCode} không thành công`,
                    });
                }
            } catch (error) {
                console.error("Error while saving:", error);
                notification.error({
                    message: "Error",
                    description: `Tạo phiếu không thành công`,
                });
            } finally {
                handleCancel();
            }
        },
        [isEditing, currentGoodsReceiptNote, saveGoodsReceiptNote, refreshTrigger, setRefreshTrigger, handleCancel]
    );

    return (
        <Modal
            title={isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={600}
            style={{ top: 20 }}
        >
            {isEditing && (
                <div style={{ marginBottom: 16 }}>
                    <label>Category Code</label>
                    <Input value={currentGoodsReceiptNote?.grnCode} readOnly style={{ width: "100%", marginTop: 8 }} />
                </div>
            )}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    form.handleSubmit();
                }}
                style={{ padding: "16px 0" }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        {form.Field({
                            name: "transactionTypeID",
                            children: (field) => (
                                <div>
                                    <label>Transaction Type ID</label>
                                    <Input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder="Enter Transaction Type ID"
                                        style={{ width: "100%", marginTop: 8 }}
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            ),
                        })}
                    </Col>
                    <Col span={12}>
                        {form.Field({
                            name: "warehouseID",
                            children: (field) => (
                                <div>
                                    <label>Warehouse ID</label>
                                    <Input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder="Enter Warehouse ID"
                                        style={{ width: "100%", marginTop: 8 }}
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            ),
                        })}
                    </Col>
                    <Col span={12}>
                        {form.Field({
                            name: "supplierID",
                            children: (field) => (
                                <div>
                                    <label>Supplier ID</label>
                                    <Input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder="Enter Supplier ID"
                                        style={{ width: "100%", marginTop: 8 }}
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            ),
                        })}
                    </Col>
                    <Col span={12}>
                        {form.Field({
                            name: "receiptDate",
                            validators: {
                                onBlur: (value) => {
                                    if (!value.value) {
                                        return [{ message: "Receipt Date là bắt buộc" }];
                                    }
                                    return undefined;
                                },
                            },
                            children: (field) => (
                                <div>
                                    <label>Receipt Date</label>
                                    <DatePicker
                                        value={field.state.value ? dayjs(field.state.value, "DD-MM-YYYY", true) : null}
                                        onChange={(date, dateString) => {
                                            if (dateString) {
                                                console.log(date)
                                                field.handleChange(dateString as string);
                                            } else {
                                                field.handleChange("");
                                            }
                                        }}
                                        onBlur={field.handleBlur}
                                        placeholder="Select Receipt Date"
                                        style={{ width: "100%", marginTop: 8 }}
                                        format="DD-MM-YYYY" 
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            ),
                        })}
                    </Col>
                    <Col span={24}>
                        {form.Field({
                            name: "notes",
                            children: (field) => (
                                <div>
                                    <label>Notes</label>
                                    <Input.TextArea
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder="Enter Notes"
                                        style={{ width: "100%", marginTop: 8, minHeight: "80px" }}
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            ),
                        })}
                    </Col>
                </Row>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
                    <Button type="primary" htmlType="submit" loading={form.state.isSubmitting}>
                        Lưu
                    </Button>
                    <Button danger onClick={handleCancel}>
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
                <span style={{ color: "red", fontSize: "12px", marginTop: "4px", display: "block" }}>
                    {field.state.meta.errors.map((err) => err.message).join(", ")}
                </span>
            ) : null}
        </>
    );
}

export default FormGoodsReceiptNote;
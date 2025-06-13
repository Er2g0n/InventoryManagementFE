import { Color } from "@/types/MasterData/Product/ProductProperties";
import { useColors } from "@features/Product/store/Color/hooks/useColor";
import { useForm } from "@tanstack/react-form";
import { Button, Input, message, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import ColorPickerModal from "./ColorPickerModal";
import { productColorSchema } from "@features/Product/schemas/ProductColorSchema";
import FieldInfo from "../FieldInfo";

interface FormColorProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    isEditing: boolean;
    currentColor: Color | null;
}

const FormColor: React.FC<FormColorProps> = ({
    isModalOpen,
    setIsModalOpen,
    isEditing,
    currentColor,
}) => {
    const { colors, saveColor } = useColors();
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [previewColor, setPreviewColor] = useState<string>("");

    const form = useForm({
        defaultValues: {
            colorName: isEditing && currentColor ? currentColor.colorName : "",
            colorCode: isEditing && currentColor ? currentColor.colorCode : "",

        },
        validators: {
            onBlur: productColorSchema,
        },
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        },
    });

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
        form.reset();
        setPreviewColor("");
    }, [form, setIsModalOpen]);

    useEffect(() => {
        if (isModalOpen) {
            form.reset({
                colorName: isEditing && currentColor ? currentColor.colorName : "",
                colorCode: isEditing && currentColor ? currentColor.colorCode : "",
            });
            setPreviewColor(
                isUsableColor(currentColor?.colorCode || "") ? currentColor!.colorCode : ""
            );
        }
    }, [isModalOpen, currentColor, isEditing]);


    const onSubmit = useCallback(
        async (values: { colorName: string; colorCode: string }) => {
            try {
                const isDuplicateCode = checkDuplicateCode(values.colorCode, colors, currentColor?.id);
                 const isDuplicateName = checkDuplicateName(values.colorName, colors, currentColor?.id);
                if (isDuplicateCode || isDuplicateName) {
                    message.error("Màu này đã tồn tại");
                    return;
                }

                const color: Color = {
                    id: isEditing && currentColor ? currentColor.id : 0,
                    colorCode: values.colorCode,
                    colorName: values.colorName,
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdDate: isEditing && currentColor ? currentColor.createdDate : new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                };

                const result = await saveColor(color);
                if (result.success) {
                    message.success(result.message);
                } else {
                    message.error(result.message || "Lỗi khi lưu màu");
                }
            } catch (error) {
                message.error("Lỗi khi lưu màu");
            } finally {
                handleCancel();
            }
        },
        [isEditing, currentColor, saveColor, handleCancel]
    );

    const checkDuplicateCode = (code: string, colors: Color[], currentId?: number): boolean => {
        return colors.some((c) => c.colorCode.toLowerCase() === code.toLowerCase() && c.id !== currentId);
    };
    const checkDuplicateName = (name: string, colors: Color[], currentId?: number): boolean => {
        return colors.some((c) => c.colorName.toLowerCase() === name.toLowerCase() && c.id !== currentId);
    };

    const isValidHex = (code: string) => /^#[0-9A-F]{6}$/i.test(code);
    const isRenderableColor = (colorCode: string): boolean => {
        const s = new Option().style;
        s.color = '';
        s.color = colorCode;
        return s.color !== '';
    };
    const isUsableColor = (code: string): boolean => {
        return isValidHex(code) && isRenderableColor(code);
    };


    return (
        <Modal
            title={isEditing ? "Chỉnh sửa màu sắc" : "Thêm màu sắc mới"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    form.handleSubmit();
                }}
            >
                {form.Field({
                    name: "colorName",
                    children: (field) => (
                        <div style={{ marginBottom: 16 }}>
                            <label>Tên màu</label>
                            <Input
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                placeholder="Nhập tên màu (ví dụ: Đỏ đậm)"
                                status={field.state.meta.errors.length > 0 ? "error" : undefined}
                            />
                            <FieldInfo field={field} />
                        </div>
                    ),
                })}
                {form.Field({
                    name: "colorCode",
                    children: (field) => (
                        <div style={{ marginBottom: 16 }}>
                            <label>Mã màu (Hex)</label>
                            <Input
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={() => {
                                    field.handleBlur();
                                    const code = field.state.value.trim();

                                    if (isUsableColor(code)) {
                                        setPreviewColor(code);
                                    } else {
                                        setPreviewColor("");
                                        return [{ message: "Mã màu không hợp lệ. Vui lòng nhập đúng định dạng #RRGGBB." }];
                                    }
                                }}

                                placeholder="Nhập mã màu (ví dụ: #FF5733)"
                                status={field.state.meta.errors.length > 0 ? "error" : undefined}
                            />
                            <FieldInfo field={field} />
                            <br />
                            <a onClick={() => setIsColorPickerOpen(true)} style={{ marginLeft: 8 }}>
                                Chọn màu sắc có sẵn
                            </a>
                        </div>
                    ),
                })}
                <div style={{ marginBottom: 16 }}>
                    <label>Xem trước màu</label>
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: previewColor,
                            border: "1px solid #ccc",
                        }}
                    ></div>
                </div>
                <div>
                    <Button type="primary" htmlType="submit" loading={form.state.isSubmitting}>
                        Lưu
                    </Button>
                    <Button danger style={{ marginLeft: 8 }} onClick={handleCancel}>
                        Hủy
                    </Button>
                </div>
            </form>

            <ColorPickerModal
                visible={isColorPickerOpen}
                onSelect={(color) => {
                    setIsColorPickerOpen(false);
                    setPreviewColor(color.colorCode)
                    form.setFieldValue("colorCode", color.colorCode);
                    form.setFieldValue("colorName", color.colorName);
                }}
                onCancel={() => setIsColorPickerOpen(false)}
            />
        </Modal>
    );
};

export default FormColor;
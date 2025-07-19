import { useEffect, useState, useCallback } from "react";
import { useForm, AnyFieldApi } from "@tanstack/react-form";
import { Button, InputNumber, Modal, message, Row, Col, Card, Image, Form, Select, Descriptions, Tag } from "antd";
import { useProducts } from "@features/Product/store/Product/hooks/useProduct";
import { useUoM } from "@features/Product/store/UoM/hooks/useUoM";
import { Product, ProductParam, ProductUoMConversion } from "@/types/MasterData/Product/ProductManagement";
import { useProductUoMConversion } from "@features/Product/store/ProductUoMConversion/hooks/useProductUoMConversion";
import { productUoMConversionSchema } from "@features/Product/schemas/ProductUoMConversionSchema";

type FormValues = {
    productID: number;
    fromUoMID: number;
    toUoMID: number;
    conversionRate: number;
};

interface FormProductUoMConversionProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    isEditing: boolean;
    currentProductUoMConversion: ProductUoMConversion | null;
}

const FormProductUoMConversion: React.FC<FormProductUoMConversionProps> = ({
    isModalOpen,
    setIsModalOpen,
    isEditing,
    currentProductUoMConversion,
}) => {
    const { productUoMConversions, saveConversion } = useProductUoMConversion();
    const { products, loading: productLoading, loadProducts } = useProducts();
    const { uoMList, loading: uomLoading, loadUoM } = useUoM();
    const [selectedProduct, setSelectedProduct] = useState<ProductParam | null>(null);

    const form = useForm({
        defaultValues: {
            productID: isEditing && currentProductUoMConversion ? currentProductUoMConversion.productID : 0,
            fromUoMID: isEditing && currentProductUoMConversion ? currentProductUoMConversion.fromUoMID : 0,
            toUoMID: isEditing && currentProductUoMConversion ? currentProductUoMConversion.toUoMID : 0,
            conversionRate: isEditing && currentProductUoMConversion ? currentProductUoMConversion.conversionRate : 0,
        },
        validators: {
            onBlur: productUoMConversionSchema,
        },
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        },
    });

    useEffect(() => {
        loadProducts();
        loadUoM();
    }, []);

    // Cập nhật selectedProduct khi currentProductUoMConversion thay đổi (chế độ edit)
    useEffect(() => {
        if (isEditing && currentProductUoMConversion) {
            const product = products.find((p) => p.id === currentProductUoMConversion.productID) || null;
            setSelectedProduct(product);
        } else {
            setSelectedProduct(null);
        }
    }, [isEditing, currentProductUoMConversion, products]);

    // Đồng bộ selectedProduct với productID từ form
    useEffect(() => {
        const productId = form.getFieldValue("productID");
        if (productId) {
            const product = products.find((p) => p.id === productId) || null;
            setSelectedProduct(product);
        } else {
            setSelectedProduct(null);
        }
    }, [form.getFieldValue("productID"), products]);

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
        form.reset();
        setSelectedProduct(null);
    }, [form, setIsModalOpen]);

    const onSubmit = useCallback(
        async (values: FormValues) => {
            try {
                const productUoMConversion: ProductUoMConversion = {
                    id: isEditing && currentProductUoMConversion ? currentProductUoMConversion.id : 0,
                    productUoMConversionCode: isEditing && currentProductUoMConversion ? currentProductUoMConversion.productUoMConversionCode : "",
                    productID: values.productID,
                    fromUoMID: values.fromUoMID,
                    toUoMID: values.toUoMID,
                    conversionRate: values.conversionRate,
                    createdBy: "admin",
                    updatedBy: "admin",
                    createdDate: isEditing && currentProductUoMConversion ? currentProductUoMConversion.createdDate : new Date().toISOString(),
                    updatedDate: new Date().toISOString(),
                };

                const result = await saveConversion(productUoMConversion);
                if (!result.success) {
                    message.error(result.message || "Error saving product UoM conversion");
                    return;
                }
                message.success("Product UoM conversion saved successfully");
            } catch (error) {
                message.error("Error saving product UoM conversion");
            } finally {
                handleCancel();
            }
        },
        [isEditing, currentProductUoMConversion, saveConversion, handleCancel]
    );

    const handleProductChange = (value: number) => {
        const product = products.find((p) => p.id === value) || null;
        setSelectedProduct(product);
        form.setFieldValue("productID", value);
    };

    return (
        <Modal
            title={isEditing ? "Chỉnh sửa chuyển đổi đơn vị sản phẩm" : "Thêm chuyển đổi đơn vị sản phẩm mới"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={800}
        >
            <Row gutter={16}>
                {/* Form nhập liệu bên trái */}
                <Col span={12}>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <form.Field
                            name="productID"
                            validators={{
                                onBlur: (value) => {
                                    if (!value.value) {
                                        return [{ message: "Product is required" }];
                                    }
                                    return undefined;
                                },
                            }}
                            children={(field) => (
                                <Form.Item
                                    label="Product"
                                    validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                    help={field.state.meta.errors[0]?.message}
                                >
                                    <Select
                                        value={field.state.value}
                                        onChange={handleProductChange}
                                        placeholder="Select Product"
                                        loading={productLoading}
                                        options={products.map((p) => ({
                                            value: p.id,
                                            label: p.productName,
                                        }))}
                                    />
                                </Form.Item>
                            )}
                        />
                        <form.Field
                            name="fromUoMID"
                            validators={{
                                onBlur: (value) => {
                                    if (!value.value) {
                                        return [{ message: "From UoM is required" }];
                                    }
                                    return undefined;
                                },
                            }}
                            children={(field) => (
                                <Form.Item
                                    label="From UoM"
                                    validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                    help={field.state.meta.errors[0]?.message}
                                >
                                    <Select
                                        value={field.state.value}
                                        onChange={(value) => field.handleChange(value)}
                                        placeholder="Select From UoM"
                                        loading={uomLoading}
                                        options={uoMList.map((uom) => ({
                                            value: uom.id,
                                            label: uom.uoMName,
                                        }))}
                                    />
                                </Form.Item>
                            )}
                        />
                        <form.Field
                            name="toUoMID"
                            validators={{
                                onBlur: (value) => {
                                    if (!value.value) {
                                        return [{ message: "To UoM is required" }];
                                    }
                                    return undefined;
                                },
                            }}
                            children={(field) => (
                                <Form.Item
                                    label="To UoM"
                                    validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                    help={field.state.meta.errors[0]?.message}
                                >
                                    <Select
                                        value={field.state.value}
                                        onChange={(value) => field.handleChange(value)}
                                        placeholder="Select To UoM"
                                        loading={uomLoading}
                                        options={uoMList.map((uom) => ({
                                            value: uom.id,
                                            label: uom.uoMName,
                                        }))}
                                    />
                                </Form.Item>
                            )}
                        />
                        <form.Field
                            name="conversionRate"
                            validators={{
                                onBlur: (value) => {
                                    if (!value.value || value.value <= 0) {
                                        return [{ message: "Conversion rate must be a positive number" }];
                                    }
                                    return undefined;
                                },
                            }}
                            children={(field) => (
                                <Form.Item
                                    label="Conversion Rate"
                                    validateStatus={field.state.meta.errors.length > 0 ? "error" : ""}
                                    help={field.state.meta.errors[0]?.message}
                                >
                                    <InputNumber
                                        value={field.state.value}
                                        onChange={(value) => field.handleChange(value || 0)}
                                        placeholder="Enter Conversion Rate"
                                        style={{ width: "100%" }}
                                        min={0}
                                        step={0.1}
                                    />
                                </Form.Item>
                            )}
                        />
                        <div style={{ marginTop: 16 }}>
                            <Button type="primary" htmlType="submit" loading={form.state.isSubmitting}>
                                Lưu
                            </Button>
                            <Button danger style={{ marginLeft: 8 }} onClick={handleCancel}>
                                Hủy
                            </Button>
                        </div>
                    </form>
                </Col>
                {/* Thông tin sản phẩm bên phải */}
                <Col span={12}>
                    {selectedProduct && (
                        <Card title="Thông tin sản phẩm" style={{ height: "100%", overflowY: "auto", maxHeight: "calc(100vh - 300px)" }}>
                            <Image
                                src={selectedProduct.imagePath || "/default-image.jpg"}
                                alt="Product Image"
                                style={{ width: "100%", maxHeight: 200, objectFit: "contain", marginBottom: 16 }}
                            />
                            <div style={{ padding: 8, maxHeight: "calc(100% - 216px)", overflowY: "auto" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <strong style={{ minWidth: "120px" }}>Mã sản phẩm:</strong>
                                        <Tag color="#a8aaadff">{selectedProduct.productCode}</Tag>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <strong style={{ minWidth: "120px" }}>Tên sản phẩm:</strong>
                                        <span>{selectedProduct.productName}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <strong style={{ minWidth: "120px" }}>Mẫu xe:</strong>
                                        <span>{selectedProduct.vehicleModel?.modelName || "Chưa cập nhật"}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <strong style={{ minWidth: "120px" }}>Danh mục:</strong>
                                        <span>{selectedProduct.productCategory?.categoryName || "Chưa cập nhật"}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <strong style={{ minWidth: "120px" }}>Loại sản phẩm:</strong>
                                        <span>{selectedProduct.productType?.productTypeName || "Chưa cập nhật"}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <strong style={{ minWidth: "120px" }}>Thương hiệu:</strong>
                                        <span>{selectedProduct.brand?.brandName || "Chưa cập nhật"}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <strong style={{ minWidth: "120px" }}>Đơn vị tính:</strong>
                                        <span>{selectedProduct.unitOfMeasure?.uoMName || "Chưa cập nhật"}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </Col>
            </Row>
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
    );
}

export default FormProductUoMConversion;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Button, Spin, message, Tag, Descriptions, Image } from "antd";
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useProducts } from "@features/Product/store/Product/hooks/useProduct";
import { ProductParam } from "@/types/MasterData/Product/ProductManagement";

interface ProductDetailProps { }

export default function ProductDetail({ }: ProductDetailProps) {
    const navigate = useNavigate();
    const { productCode } = useParams<{ productCode: string }>();
    const { usegetProductByCode, loading, product } = useProducts();
    const [productData, setProductData] = useState<ProductParam | null>(null);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            if (productCode && (!product || productCode !== product?.productCode)) {
                const result = await usegetProductByCode(productCode);
                if (!result.success) {
                    message.error(result.message || "Không thể tải thông tin sản phẩm");
                }
            }

            if (product && productCode === product.productCode) {
                setProductData(product);
            }
        };
        fetchProduct();
    }, [productCode, product]);

    // Handle delete product
    const handleDelete = async () => {
        if (productCode && window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            message.error("Chưa hỗ trợ xóa sản phẩm trong phiên bản này.");
        }
    };

    // Handle edit navigation
    const handleEdit = () => {
        if (productCode) {
            navigate(`/product/edit/${productCode}`);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="space-y-6">
                    <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
                    <div className="grid gap-6">
                        <div className="h-64 w-full bg-gray-200 animate-pulse rounded" />
                        <div className="h-48 w-full bg-gray-200 animate-pulse rounded" />
                        <div className="h-32 w-full bg-gray-200 animate-pulse rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (!productData) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div style={{ backgroundColor: "#fee2e2", padding: "16px", borderRadius: "4px", color: "#dc2626" }}>
                    Không tìm thấy sản phẩm
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/product")} style={{ marginBottom: 0 }}>
                    Quay lại
                </Button>
                <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#1f2937" }}>Chi tiết sản phẩm</h1>
            </div>

            {/* Main Product Information */}
            <Card title="Thông tin sản phẩm" style={{ marginBottom: "24px" }}>
                <Descriptions column={2} bordered size="middle">
                    <Descriptions.Item label="Mã sản phẩm">
                        <Tag color="#a8aaadff">{productData.productCode}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Tên sản phẩm">{productData.productName}</Descriptions.Item>
                    <Descriptions.Item label="Mô tả" span={2}>
                        {productData.description || "Không có mô tả"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giá mua (VNĐ)">
                        <span style={{ color: "#065f46" }}>{productData.purchasePrice.toLocaleString()}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Giá bán (VNĐ)">
                        <span style={{ color: "#1e40af" }}>{productData.salePrice.toLocaleString()}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Mẫu xe">{productData.vehicleModel?.modelName || "Chưa cập nhật"}</Descriptions.Item>
                    <Descriptions.Item label="Danh mục">{productData.productCategory?.categoryName || "Chưa cập nhật"}</Descriptions.Item>
                    <Descriptions.Item label="Loại sản phẩm">{productData.productType?.productTypeName || "Chưa cập nhật"}</Descriptions.Item>
                    <Descriptions.Item label="Thương hiệu">{productData.brand?.brandName || "Chưa cập nhật"}</Descriptions.Item>
                    <Descriptions.Item label="Đơn vị tính">{productData.unitOfMeasure?.uoMName || "Chưa cập nhật"}</Descriptions.Item>
                </Descriptions>
            </Card>


            {/* Dimensions */}
            <Card title="Kích thước" style={{ marginBottom: "24px" }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                        <div style={{ textAlign: "center", padding: "16px", border: "1px solid #e5e7eb", borderRadius: "4px" }}>
                            <div style={{ fontSize: "20px", fontWeight: 500, color: "#dc2626" }}>{productData.dimension?.length || 0}</div>
                            <div style={{ color: "#6b7280", marginTop: "4px" }}>Chiều dài {productData.dimension.uoMLengthCode}</div>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <div style={{ textAlign: "center", padding: "16px", border: "1px solid #e5e7eb", borderRadius: "4px" }}>
                            <div style={{ fontSize: "20px", fontWeight: 500, color: "#065f46" }}>{productData.dimension?.width || 0}</div>
                            <div style={{ color: "#6b7280", marginTop: "4px" }}>Chiều rộng (cm)</div>
                        </div>
                    </Col>
                    <Col xs={24} sm={8}>
                        <div style={{ textAlign: "center", padding: "16px", border: "1px solid #e5e7eb", borderRadius: "4px" }}>
                            <div style={{ fontSize: "20px", fontWeight: 500, color: "#1e40af" }}>{productData.dimension?.height || 0}</div>
                            <div style={{ color: "#6b7280", marginTop: "4px" }}>Chiều cao (cm)</div>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Product Images */}
            <Card title="Hình ảnh sản phẩm" style={{ marginBottom: "24px" }}>
                <Row gutter={16}>
                    {/* Ảnh chính */}
                    <Col xs={24} sm={12}>
                        <Card
                            size="small"
                            title="Ảnh chính"
                            bodyStyle={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: 250,
                                backgroundColor: "#f9fafb",
                                borderRadius: 8,
                            }}
                        >
                            {productData.imagePath ? (
                                <Image
                                    src={productData.imagePath}
                                    width={250}
                                    height={250}
                                    style={{ objectFit: "contain", borderRadius: 8 }}
                                    alt="Ảnh chính"
                                />
                            ) : (
                                <div style={{ color: "#9ca3af" }}>Chưa có ảnh chính</div>
                            )}
                        </Card>
                    </Col>

                    {/* Ảnh phụ */}
                    <Col xs={24} sm={12}>
                        <Card
                            size="small"
                            title="Ảnh phụ"
                            bodyStyle={{
                                minHeight: 250,
                                backgroundColor: "#f9fafb",
                                borderRadius: 8,
                            }}
                        >
                            {productData.productImages.length > 0 ? (
                                <Image.PreviewGroup>
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                                            gap: "12px",
                                            paddingTop: "8px",
                                        }}
                                    >
                                        {productData.productImages.map((img, index) => (
                                            <Image
                                                key={index}
                                                src={img.imagePath || "/placeholder.svg"}
                                                width={100}
                                                height={100}
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: 8,
                                                    border: "1px solid #e5e7eb",
                                                }}
                                                alt={`Ảnh phụ ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </Image.PreviewGroup>
                            ) : (
                                <div style={{ color: "#9ca3af", padding: "24px", textAlign: "center" }}>
                                    Chưa có ảnh phụ
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Card>


            {/* Product Variants */}
            <Card title="Biến thể sản phẩm" style={{ marginBottom: "24px" }}>
                {productData.variantParams.length > 0 ? (
                    <Row gutter={[16, 16]}>
                        {productData.variantParams.map((variant, index) => (
                            <Col xs={24} sm={12} key={index}>
                                <Card title={`Biến thể #${index + 1}`} style={{ borderRadius: "8px" }}>
                                    <Row gutter={16} align="middle">
                                        <Col span={16}>
                                            <Descriptions column={1} size="small">
                                                <Descriptions.Item label="Màu sắc">{variant.colorName}</Descriptions.Item>
                                                <Descriptions.Item label="Chất liệu">{variant.materialName}</Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col span={8}>
                                            {variant.imagePath ? (
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={variant.imagePath}
                                                    style={{ objectFit: "cover", borderRadius: 4 }}
                                                />
                                            ) : (
                                                <div style={{ textAlign: "center", color: "#9ca3af" }}>Không có ảnh</div>
                                            )}
                                        </Col>
                                    </Row>
                                </Card>


                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div style={{ textAlign: "center", padding: "32px", color: "#9ca3af" }}>
                        Không có biến thể nào
                    </div>
                )}
            </Card>

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", paddingTop: "24px" }}>
                <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                    Sửa sản phẩm
                </Button>
                <Button type="primary" danger icon={<DeleteOutlined />} onClick={handleDelete}>
                    Xóa sản phẩm
                </Button>
            </div>
        </div>
    );
}
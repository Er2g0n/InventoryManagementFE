import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Input,
  Button,
  Card,
  Space,
  Badge,
  Image,
  Typography,
  Modal,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ProductParam } from "@/types/MasterData/Product/ProductManagement";
import { useProducts } from "@features/Product/store/Product/hooks/useProduct";

const { Title } = Typography;

interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = () => {
  const { products, loading, error, loadProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<ProductParam[]>([]);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    loadProducts()
      .then(({ success, message }) => {
        if (!success) {
          Modal.error({ title: "Lỗi", content: message || "Không thể tải danh sách sản phẩm" });
        }
      })
      .catch((err) => {
        Modal.error({ title: "Lỗi", content: err.message || "Lỗi khi tải danh sách sản phẩm" });
      });
  }, []);

  // Cập nhật filteredProducts khi products hoặc searchTerm thay đổi
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  // Hiển thị lỗi nếu có
  useEffect(() => {
    if (error) {
      Modal.error({ title: "Lỗi", content: error });
    }
  }, [error]);

  // Xử lý xóa sản phẩm
  const handleDelete = (productCode: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa sản phẩm với mã ${productCode}? Hành động này không thể hoàn tác.`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        Modal.error({ content: "Chưa hỗ trợ xóa sản phẩm trong phiên bản này." });
      },
    });
  };

  // Định dạng tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "imagePath",
      key: "imagePath",
      width: 80,
      render: (imagePath: string) => (
  <div
    style={{
      width: 48,
      height: 48,
      borderRadius: 4,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f0f0f0"
    }}
  >
    {imagePath ? (
      <img
        src={imagePath}
        alt="Product"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block"
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/48";
        }}
      />
    ) : (
      <span style={{ fontSize: 12, color: "#888" }}>No img</span>
    )}
  </div>
)

    },
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
      width: 120,
      render: (code: string) => <Badge>{code}</Badge>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: 200,
      render: (name: string) => <span style={{ fontWeight: 500 }}>{name}</span>,
    },
    {
      title: "Danh mục",
      dataIndex: "productCategory",
      key: "productCategory",
      width: 150,
      render: (category: ProductParam["productCategory"]) => category.categoryName,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      width: 150,
      render: (brand: ProductParam["brand"]) => brand.brandName || "N/A",
    },
    {
      title: "Giá mua",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      width: 120,
      render: (price: number) => formatCurrency(price),
    },
    {
      title: "Giá bán",
      dataIndex: "salePrice",
      key: "salePrice",
      width: 120,
      render: (price: number) => <span style={{ color: "#389e0d", fontWeight: 500 }}>{formatCurrency(price)}</span>,
    },
    {
      title: "Biến thể",
      dataIndex: "variantParams",
      key: "variantParams",
      width: 200,
      render: (variants: ProductParam["variantParams"]) => (
        <div className="space-y-1">
          <Badge count={variants.length} style={{ backgroundColor: "#8c8c8c" }} />
          {variants.length > 0 && (
            <div className="pl-2">
              {variants.map((variant, idx) => (
                <div key={idx} className="text-sm">
                  {`${variant.colorName || "N/A"} - ${variant.materialName || "N/A"}`}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "right" as const,
      width: 150,
      render: (_: any, product: ProductParam) => (
        <Space size="middle">
          <Link to={`/product/detail/${product.productCode}`}>
            <Button type="text" icon={<EyeOutlined />} />
          </Link>
          <Link to={`/product/edit/${product.productCode}`}>
            <Button type="text" icon={<EditOutlined />} />
          </Link>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(product.productCode)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={3}>Danh sách sản phẩm</Title>
          </Col>
          <Col>
            <Link to="/product/add">
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm sản phẩm
              </Button>
            </Link>
          </Col>
        </Row>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: 300, marginBottom: 16 }}
          allowClear
        />
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="productCode"
          loading={loading}
          locale={{ emptyText: "Không tìm thấy sản phẩm nào" }}
        //   scroll={{ x: 1200 }} // Thanh cuộn ngang khi cần
        />
      </Card>
    </div>
  );
};

export default ProductList;
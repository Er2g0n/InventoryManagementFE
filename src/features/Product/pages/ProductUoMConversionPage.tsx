"use client";

import { ProductUoMConversion } from "@/types/MasterData/Product/ProductManagement";
import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ListProductUoMConversion from "../Components/ProductUoMConversion/ConversionList";
import FormProductUoMConversion from "../Components/ProductUoMConversion/ConversionForm";


const UoMConversionPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductUoMConversion, setCurrentProductUoMConversion] = useState<ProductUoMConversion | null>(null);

  const handleAddProductUoMConversion = useCallback(() => {
    setIsEditing(false);
    setCurrentProductUoMConversion(null);
    setIsModalOpen(true);
  }, []);

  const handleEditProductUoMConversion = useCallback((productUoMConversion: ProductUoMConversion) => {
    setIsEditing(true);
    setCurrentProductUoMConversion(productUoMConversion);
    setIsModalOpen(true);
  }, []);

  return (
    <Row gutter={24}>
      <Col span={24}>
        <Card
          title="Product UoM Conversion Management"
          extra={
            <ConfigProvider>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddProductUoMConversion}
                aria-label="Thêm chuyển đổi đơn vị sản phẩm"
              >
                Thêm chuyển đổi đơn vị sản phẩm
              </Button>
            </ConfigProvider>
          }
          variant="borderless"
        >
          <ListProductUoMConversion onEdit={handleEditProductUoMConversion} />
        </Card>
      </Col>
      <FormProductUoMConversion
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditing={isEditing}
        currentProductUoMConversion={currentProductUoMConversion}
      />
    </Row>
  );
};

export default UoMConversionPage;
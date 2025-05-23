import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useCallback } from "react";
import { useForm } from "antd/es/form/Form";
// import { useButtonStyles } from "../../../hooks/useButtonStyles";
// import useNotification from "../../../hooks/useNotification";

import type { ProductType } from "../../../types/ProductClassification/ProductType";
import ListProductType from "./ProductType.list";
import FormProductType from "./ProductType.form";

const ProductTypePage: React.FC = () => {
  // const { styles } = useButtonStyles();
  // const { contextHolder } = useNotification();
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductType, setCurrentProductType] = useState<ProductType | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddProductType = useCallback(() => {
    setIsEditing(false);
    setCurrentProductType(null);
    form.resetFields();
    setIsModalOpen(true);
  }, [form]);

  const handleEditProductType = useCallback((productType: ProductType) => {
    setIsEditing(true);
    setCurrentProductType(productType);
    form.setFieldsValue({
      productTypeCode: productType.productTypeCode,
      productTypeName: productType.productTypeName
    });
    setIsModalOpen(true);
  }, [form]);

  return (
    <>
      {/* {contextHolder} */}
      <Row gutter={24}>
        <Col span={24}>
          <Card
            title="Product Type Management"
            extra={
              <ConfigProvider>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddProductType}
                  aria-label="Thêm loại sản phẩm"
                >
                  Thêm loại sản phẩm
                </Button>
              </ConfigProvider>
            }
            variant="borderless"
          >
            <ListProductType refreshTrigger={refreshTrigger} onEdit={handleEditProductType} />
          </Card>
        </Col>
      </Row>
      <FormProductType
        form={form}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditing={isEditing}
        currentProductType={currentProductType}
        setRefreshTrigger={setRefreshTrigger}
      />
    </>
  );
};

export default ProductTypePage;
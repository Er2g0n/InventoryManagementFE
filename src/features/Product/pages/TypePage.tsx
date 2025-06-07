  "use client";

  import { ProductType } from "@/types/MasterData/Product/ProductClassification";
  import { Button, Card, Col, ConfigProvider, Row } from "antd";
  import { useCallback, useState } from "react";
  import { PlusOutlined } from "@ant-design/icons";
  import ListProductType from "../Components/Type/ProductTypeList";
  import FormProductType from "../Components/Type/ProductTypeForm";


  const TypePage: React.FC = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [currentProductType, setCurrentProductType] = useState<ProductType | null>(null);
      const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleAddProductType = useCallback(() => {
      setIsEditing(false);
      setCurrentProductType(null);
      setIsModalOpen(true);
    }, []);

    const handleEditProductType = useCallback((productType: ProductType) => {
      setIsEditing(true);
      setCurrentProductType(productType);
      setIsModalOpen(true);
    }, []);

    return (
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
            <ListProductType onEdit={handleEditProductType} refreshTrigger={refreshTrigger} />
          </Card>
        </Col>
        <FormProductType
        
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isEditing={isEditing}
          currentProductType={currentProductType}
          refreshTrigger={refreshTrigger}
          setRefreshTrigger={setRefreshTrigger}
        />
      </Row>
    );
  }

  export default TypePage;
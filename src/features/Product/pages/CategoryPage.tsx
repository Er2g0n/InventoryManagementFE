import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useCallback } from "react";
import { ProductCategory } from "@/types/ProductClassification/ProductCategory";
import ListProductCategory from "../Components/Category/ProductCategoryList";
import FormProductCategory from "../Components/Category/ProductCategoryForm";


const CategoryPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductCategory, setCurrentProductCategory] = useState<ProductCategory | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddProductType = useCallback(() => {
    setIsEditing(false);
    setCurrentProductCategory(null);
    setIsModalOpen(true);
  }, []);

  const handleEditProductType = useCallback((productCategory: ProductCategory) => {
    setIsEditing(true);
    setCurrentProductCategory(productCategory);
    
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
          <ListProductCategory onEdit={handleEditProductType} refreshTrigger={refreshTrigger} />
        </Card>
      </Col>
      <FormProductCategory
       
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditing={isEditing}
        currentProductCategory={currentProductCategory}
        refreshTrigger={refreshTrigger}
        setRefreshTrigger={setRefreshTrigger}
      />
    </Row>
  );
};

export default CategoryPage;
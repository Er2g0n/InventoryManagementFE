import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useCallback } from "react";
import ListProductCategory from "../Components/Category/ProductCategoryList";
import FormProductCategory from "../Components/Category/ProductCategoryForm";
import { ProductCategory } from "@/types/MasterData/Product/ProductClassification";


const CategoryPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductCategory, setCurrentProductCategory] = useState<ProductCategory | null>(null);

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
          title="Product Category Management"
          extra={
            <ConfigProvider>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddProductType}
                aria-label="Thêm danh mục"
              >
                Thêm danh mục
              </Button>
            </ConfigProvider>
          }
          variant="borderless"
        >
          <ListProductCategory onEdit={handleEditProductType}/>
        </Card>
      </Col>
      <FormProductCategory
       
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditing={isEditing}
        currentProductCategory={currentProductCategory}
       
      />
    </Row>
  );
};

export default CategoryPage;
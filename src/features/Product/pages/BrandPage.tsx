import { Brand } from "@/types/MasterData/Product/ProductClassification";
import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import ListBrand from "../Components/Brand/ProductBrandList";
import FormProductBrand from "../Components/Brand/ProductBrandForm";

const BrandPage: React.FC = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
      const [refreshTrigger, setRefreshTrigger] = useState(0);


      const handleAddBrand = useCallback(() => {
        setIsEditing(false);
        setCurrentBrand(null);
        setIsModalOpen(true);
      }, []);

      const handleEditBrand = useCallback((brand: Brand) => {
        setIsEditing(true);
        setCurrentBrand(brand);
        setIsModalOpen(true);
      }, []);

  return (
   <Row gutter={24}>
      <Col span={24}>
        <Card
          title="Product Brand Management"
          extra={
            <ConfigProvider>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddBrand}
                aria-label="Add Brand"
              >
                Add New Brand
              </Button>
            </ConfigProvider>
          }
          variant="borderless"
        >
          <ListBrand onEdit={handleEditBrand} refreshTrigger={refreshTrigger} />
        </Card>
      </Col>
      <FormProductBrand
       
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditing={isEditing}
        currentBrand={currentBrand}
        refreshTrigger={refreshTrigger}
        setRefreshTrigger={setRefreshTrigger}
      />
    </Row>
  );
};


export default BrandPage;
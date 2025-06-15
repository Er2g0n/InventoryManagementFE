import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import ListBrand from "../Components/Brand/ProductBrandList";
import FormProductBrand from "../Components/Brand/ProductBrandForm";
import { Brand } from "@/types/MasterData/Product/ProductClassification";

const BrandPage: React.FC = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);


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
          <ListBrand onEdit={handleEditBrand} />
        </Card>
      </Col>
      <FormProductBrand
       
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditing={isEditing}
        currentBrand={currentBrand}
      />
    </Row>
  );
};


export default BrandPage;
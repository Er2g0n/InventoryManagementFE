import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useCallback } from "react";
import { Material } from "@/types/MasterData/Product/ProductProperties";
import ListMaterial from "../Components/Material/ProductMaterialList";
import FormMaterial from "../Components/Material/ProductMaterialForm";


const MaterialPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);

  const handleAddMaterial = useCallback(() => {
    setIsEditing(false);
    setCurrentMaterial(null);
    setIsModalOpen(true);
  }, []);

  const handleEditMaterial = useCallback((material: Material) => {
    setIsEditing(true);
    setCurrentMaterial(material);
    setIsModalOpen(true);
  }, []);

  return (
    <Row gutter={24}>
      <Col span={24}>
        <Card
          title="Material Management"
          extra={
            <ConfigProvider>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddMaterial}
                aria-label="Thêm chất liệu"
              >
                Thêm chất liệu
              </Button>
            </ConfigProvider>
          }
          variant="borderless"
        >
          <ListMaterial onEdit={handleEditMaterial}/>
        </Card>
      </Col>
      <FormMaterial
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditing={isEditing}
        currentMaterial={currentMaterial}
      />
    </Row>
  );
};

export default MaterialPage;
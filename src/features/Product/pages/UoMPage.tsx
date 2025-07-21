import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useCallback } from "react";
import { UnitOfMeasure } from "@/types/MasterData/Product/ProductProperties";
import ListUnitOfMeasure from "../Components/UoM/UoMList";
import FormUnitOfMeasure from "../Components/UoM/UoMForm";


const UnitOfMeasurePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUoM, setCurrentUoM] = useState<UnitOfMeasure | null>(null);

  const handleAddUoM = useCallback(() => {
    setIsEditing(false);
    setCurrentUoM(null);
    setIsModalOpen(true);
  }, []);

  const handleEditUoM = useCallback((unitOfMeasure: UnitOfMeasure) => {
    setIsEditing(true);
    setCurrentUoM(unitOfMeasure);
    setIsModalOpen(true);
  }, []);

  return (
    <Row gutter={24}>
      <Col span={24}>
        <Card
          title="Unit of Measure Management"
          extra={
            <ConfigProvider>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddUoM}
                aria-label="Thêm đơn vị tính"
              >
                Thêm đơn vị tính
              </Button>
            </ConfigProvider>
          }
          variant="borderless"
        >
          <ListUnitOfMeasure onEdit={handleEditUoM}/>
        </Card>
      </Col>
      <FormUnitOfMeasure
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditing={isEditing}
        currentUoM={currentUoM}
      />
    </Row>
  );
};

export default UnitOfMeasurePage;
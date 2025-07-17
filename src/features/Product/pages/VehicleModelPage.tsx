import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import ListVehicleModel from "../Components/VehicleModel/ProductVehicleModelList";
import FormVehicleModel from "../Components/VehicleModel/ProductVehicleModelForm";
import { VehicleModel } from "@/types/MasterData/Product/ProductClassification";

const VehicleModelPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVehicleModel, setCurrentVehicleModel] = useState<VehicleModel | null>(null);

  const handleAddVehicleModel = useCallback(() => {
    setIsEditing(false);
    setCurrentVehicleModel(null);
    setIsModalOpen(true);
  }, []);

  const handleEditVehicleModel = useCallback((vehicleModel: VehicleModel) => {
    setIsEditing(true);
    setCurrentVehicleModel(vehicleModel);
    setIsModalOpen(true);
  }, []);

  return (
    <Row gutter={24}>
      <Col span={24}>
        <Card
          title="Vehicle Model Management"
          extra={
            <ConfigProvider>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddVehicleModel}
                aria-label="Add Vehicle Model"
              >
                Add New Vehicle Model
              </Button>
            </ConfigProvider>
          }
          variant="borderless"
        >
          <ListVehicleModel onEdit={handleEditVehicleModel} />
        </Card>
      </Col>
      <FormVehicleModel
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditing={isEditing}
        currentVehicleModel={currentVehicleModel}
      />
    </Row>
  );
};

export default VehicleModelPage;
import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { Warehouse } from "@/types/WarehouseManagement/Warehouse";
import ListWarehouse from "../Components/Warehouse/InventoryWarehouseList";
import FormProductWarehouse from "../Components/Warehouse/InventoryWarehouseForm";

const WarehousePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);

  const handleAddWarehouse = useCallback(() => {
    setIsEditing(false);
    setCurrentWarehouse(null);
    setIsModalOpen(true);
  }, []);

  const handleEditWarehouse = useCallback((warehouse: Warehouse) => {
    setIsEditing(true);
    setCurrentWarehouse(warehouse);
    setIsModalOpen(true);
  }, []);

  return (
    <Row gutter={24}>
      <Col span={24}>
        <Card
          title="Warehouse Management"
          extra={
            <ConfigProvider>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddWarehouse}
                aria-label="Add Warehouse"
              >
                Add New Warehouse
              </Button>
            </ConfigProvider>
          }
          variant="borderless"
        >
          <ListWarehouse onEdit={handleEditWarehouse} />
        </Card>
      </Col>
      <FormProductWarehouse
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditing={isEditing}
        currentWarehouse={currentWarehouse}
      />
    </Row>
  );
};

export default WarehousePage;
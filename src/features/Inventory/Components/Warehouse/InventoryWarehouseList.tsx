import React, { useEffect } from "react";
import { Card, Row, Col } from "antd";
import { useWarehouses } from "@features/Inventory/Store/Warehouse/hooks/useWarehouse";
import { Warehouse } from "@/types/WarehouseManagement/Warehouse";

interface ListWarehouseProps {
  onEdit: (warehouse: Warehouse) => void;
}

const InventoryWarehouseList: React.FC<ListWarehouseProps> = React.memo(({ onEdit }) => {
  const { loading, error, loadWarehouses, warehouses } = useWarehouses();

  useEffect(() => {
    loadWarehouses();
  }, []);

  if (loading) {
    return <div style={{ padding: 20, textAlign: "center" }}>Loading...</div>;
  }
  if (error) {
    return <div style={{ padding: 20, textAlign: "center", color: "red" }}>{error}</div>;
  }
  if (!warehouses || warehouses.length === 0) {
    return <div style={{ padding: 20, textAlign: "center" }}>No warehouses available</div>;
  }

  return (
    <Row gutter={[16, 16]}>
      {warehouses.map((warehouse) => (
        <Col key={warehouse.warehouseCode} xs={24} sm={12} md={8} lg={6}>
          <Card
            title={warehouse.warehouseName}
            onClick={() => onEdit(warehouse)}
            style={{ cursor: "pointer" }}
            hoverable
          >
            {/* Chỉ hiển thị tên kho theo yêu cầu, có thể thêm thông tin khác nếu cần */}
          </Card>
        </Col>
      ))}
    </Row>
  );
});

export default InventoryWarehouseList;
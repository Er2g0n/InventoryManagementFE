import { Warehouse } from "@/types/WarehouseManagement/Warehouse";
import { useWarehouses } from "@features/WarehouseManagement/store/Warehouse/hooks/useWarehouse";
import { Row, Col, Card } from "antd";
import React, { useEffect } from "react";

interface ListWarehouseProps {
  onEdit: (warehouse: Warehouse) => void;
}

const WarehouseList: React.FC<ListWarehouseProps> = React.memo(({ onEdit }) => {
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

export default WarehouseList;
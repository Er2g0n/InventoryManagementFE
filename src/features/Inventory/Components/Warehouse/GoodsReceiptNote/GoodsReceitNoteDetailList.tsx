import { Modal, Table, Tooltip } from 'antd';
import { GoodsReceiptNoteLine } from '@/types/WarehouseManagement/GoodsReceiptNote';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

interface GoodsReceiptDetailListProps {
  goodsReceiptNoteLines: GoodsReceiptNoteLine[];
  visible: boolean;
  onCancel: () => void;
}

const GoodsReceiptDetailList = ({ goodsReceiptNoteLines, visible, onCancel }: GoodsReceiptDetailListProps) => {
  // Định nghĩa các cột cho bảng
  const columns: ColumnsType<GoodsReceiptNoteLine> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter: (a, b) => (a.id || 0) - (b.id || 0),
    },
    {
      title: 'Mã GRN',
      dataIndex: 'refGRNCode',
      key: 'refGRNCode',
      width: 150,
      sorter: (a, b) => a.refGRNCode.localeCompare(b.refGRNCode),
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productID',
      key: 'productID',
      width: 120,
      render: (value) => value ?? 'N/A',
    },
    {
      title: 'Mã biến thể sản phẩm',
      dataIndex: 'productVariantID',
      key: 'productVariantID',
      width: 150,
      render: (value) => value ?? 'N/A',
    },
    {
      title: 'Đơn vị đo lường',
      dataIndex: 'uoMID',
      key: 'uoMID',
      width: 120,
      render: (value) => (
        <Tooltip title="Mã định danh đơn vị đo lường">
          {value ?? 'N/A'}
        </Tooltip>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      render: (value) => value.toLocaleString(),
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Mã chuyển đổi đơn vị',
      dataIndex: 'uoMConversionID',
      key: 'uoMConversionID',
      width: 150,
      render: (value) => value ?? 'N/A',
    },
    {
      title: 'Số lượng chuyển đổi',
      dataIndex: 'convertedQuantity',
      key: 'convertedQuantity',
      width: 150,
      render: (value) => value.toLocaleString(),
      sorter: (a, b) => a.convertedQuantity - b.convertedQuantity,
    },
    {
      title: 'Mã vị trí lưu trữ',
      dataIndex: 'storageBinID',
      key: 'storageBinID',
      width: 120,
      render: (value) => value ?? 'N/A',
    },
  ];

  return (
    <Modal
      title="Chi tiết Goods Receipt Note"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
      style={{ top: 20 }}
    >
      {goodsReceiptNoteLines.length > 0 ? (
        <Table
          columns={columns}
          dataSource={goodsReceiptNoteLines}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }} // Cho phép cuộn ngang nếu bảng rộng
          style={{ marginTop: 16 }}
          locale={{
            emptyText: 'Không có dữ liệu để hiển thị.',
          }}
        />
      ) : (
        <p style={{ textAlign: 'center', color: '#888', marginTop: 16 }}>
          Không có dữ liệu để hiển thị.
        </p>
      )}
    </Modal>
  );
};

export default React.memo(GoodsReceiptDetailList);
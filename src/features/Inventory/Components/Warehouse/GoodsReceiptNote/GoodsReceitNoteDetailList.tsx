import { Modal, Table, Tooltip, Button, Form, Input, InputNumber, notification, Space } from 'antd';
import { GoodsReceiptNote, GoodsReceiptNote_Param, GoodsReceiptNoteLine } from '@/types/WarehouseManagement/GoodsReceiptNote';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useGoodsReceiptNote } from '@features/Inventory/Store/GoodsReceiptNote/hooks/useGoodsReceiptNote';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface GoodsReceiptDetailListProps {
  goodsReceiptNoteLines: GoodsReceiptNoteLine[];
  visible: boolean;
  onCancel: () => void;
  grnCode: GoodsReceiptNote;
}

const GoodsReceiptDetailList = ({ goodsReceiptNoteLines, visible, onCancel, grnCode }: GoodsReceiptDetailListProps) => {
  const { saveGoodsReceiptNote_Param, loadGoodsReceiptNoteLine, deleteGoodsReceiptNoteLine } = useGoodsReceiptNote();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempLines, setTempLines] = useState<GoodsReceiptNoteLine[]>(goodsReceiptNoteLines);

  React.useEffect(() => {
    setTempLines(goodsReceiptNoteLines);
  }, [goodsReceiptNoteLines]);

  const columns: ColumnsType<GoodsReceiptNoteLine> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter: (a, b) => (a.id || 0) - (b.id || 0),
    },
    {
      title: 'Ref GRN Code',
      dataIndex: 'refGRNCode',
      key: 'refGRNCode',
      width: 150,
      sorter: (a, b) => a.refGRNCode.localeCompare(b.refGRNCode),
      render: (value) => <Tooltip title="Mã GRN">{value ?? 'N/A'}</Tooltip>,
    },
    {
      title: 'Product ID',
      dataIndex: 'productID',
      key: 'productID',
      width: 120,
      render: (value) => <Tooltip title="Mã sản phẩm">{value ?? 'N/A'}</Tooltip>,
    },
    {
      title: 'Product Variant ID',
      dataIndex: 'productVariantID',
      key: 'productVariantID',
      width: 150,
      render: (value) => <Tooltip title="Mã biến thể sản phẩm">{value ?? 'N/A'}</Tooltip>,
    },
    {
      title: 'UOM ID',
      dataIndex: 'uoMID',
      key: 'uoMID',
      width: 120,
      render: (value) => <Tooltip title="Đơn vị đo lường">{value ?? 'N/A'}</Tooltip>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      sorter: (a, b) => a.quantity - b.quantity,
      render: (value) => <Tooltip title="Số lượng">{value.toLocaleString() ?? 'N/A'}</Tooltip>,
    },
    {
      title: 'UOM Conversion ID',
      dataIndex: 'uoMConversionID',
      key: 'uoMConversionID',
      width: 150,
      render: (value) => <Tooltip title="Mã chuyển đổi đơn vị">{value ?? 'N/A'}</Tooltip>,
    },
    {
      title: 'Converted Quantity',
      dataIndex: 'convertedQuantity',
      key: 'convertedQuantity',
      width: 150,
      render: (value) => <Tooltip title="Số lượng chuyển đổi">{value.toLocaleString() ?? 'N/A'}</Tooltip>,
      sorter: (a, b) => a.convertedQuantity - b.convertedQuantity,
    },
    {
      title: 'Storage Bin ID',
      dataIndex: 'storageBinID',
      key: 'storageBinID',
      width: 120,
      render: (value) => <Tooltip title="Mã Kho lưu trữ">{value ?? 'N/A'}</Tooltip>,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.rowPointer)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddNew = () => {
    form.setFieldsValue({ refGRNCode: grnCode.grnCode });
    setIsModalVisible(true);
  };

  const handleEdit = (line: GoodsReceiptNoteLine) => {
    form.setFieldsValue(line);
    setIsModalVisible(true);
  };

  const handleDelete = async (rowPointer: string | undefined) => {
    if (!rowPointer) {
      notification.error({
        message: 'Lỗi',
        description: 'RowPointer không hợp lệ',
      });
      return;
    }
    try {
      setTempLines(tempLines.filter((line) => line.rowPointer !== rowPointer));
      const response = await deleteGoodsReceiptNoteLine(rowPointer);
      await loadGoodsReceiptNoteLine(grnCode.grnCode);
      if (response.success === true) {
        notification.success({
          message: 'Thành công',
          description: `Xóa GoodsReceiptNoteLine thành công`,
        });
      } else {
        notification.error({
          message: 'Lỗi',
          description: `Xóa GoodsReceiptNoteLine thất bại`,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: `Xóa GoodsReceiptNoteLine ${rowPointer} thất bại`,
      });
      setTempLines(goodsReceiptNoteLines);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const currentDate = new Date().toISOString();
      const newLine: GoodsReceiptNoteLine = {
        id: values.id || undefined,
        refGRNCode: grnCode.grnCode,
        productID: values.productID,
        productVariantID: values.productVariantID,
        uoMID: values.uoMID,
        quantity: values.quantity,
        uoMConversionID: values.uoMConversionID,
        convertedQuantity: values.convertedQuantity,
        storageBinID: values.storageBinID,
        createdBy: 'admin',
        createdDate: currentDate,
        updatedBy: 'admin',
        updatedDate: currentDate,
      };

      const updatedLines = values.id && tempLines.some((line) => line.id === values.id)
        ? tempLines.map((line) => (line.id === values.id ? newLine : line))
        : [...tempLines, newLine];
      setTempLines(updatedLines);

      const data: GoodsReceiptNote_Param = {
        createdBy: 'admin',
        grNs: {
          ...grnCode,
          createdBy: 'admin',
          createdDate: currentDate,
          updatedBy: 'admin',
          updatedDate: currentDate,
          warehouseID: grnCode.warehouseID || 0, 
          supplierID: grnCode.supplierID || 0,
          transactionTypeID: grnCode.transactionTypeID || 0,
        },
        grnLines: updatedLines.map((line) => ({
          ...line,
          refGRNCode: grnCode.grnCode,
          createdBy: 'admin',
          createdDate: currentDate,
          updatedBy: 'admin',
          updatedDate: currentDate,
        })),
      };

      const response = await saveGoodsReceiptNote_Param(data);
      await loadGoodsReceiptNoteLine(grnCode.grnCode);
      if (response.success === true) {
        notification.success({
          message: 'Thành công',
          description: 'Lưu danh sách GoodsReceiptNoteLine thành công',
        });
        setIsModalVisible(false);
        form.resetFields();
      } else {
        notification.error({
          message: 'Lỗi',
          description: response.message || 'Lưu danh sách GoodsReceiptNoteLine thất bại',
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Lưu danh sách GoodsReceiptNoteLine thất bại',
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const modalTitle = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '40px' }}>
      <span>Chi tiết Goods Receipt Note Line</span>
      <Button type="primary" onClick={handleAddNew}>
        Thêm mới
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        title={modalTitle}
        open={visible}
        onCancel={onCancel}
        footer={null}
        width={1000}
        style={{ top: 20 }}
      >
        <Table
          columns={columns}
          dataSource={tempLines}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          style={{ marginTop: 16 }}
          locale={{
            emptyText: 'Không có dữ liệu để hiển thị.',
          }}
        />
      </Modal>

      {/* Modal thêm/sửa */}
      <Modal
        title="Nhập Goods Receipt Note Line"
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleModalCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="id"
            hidden
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="refGRNCode"
            label="Ref GRN Code"
            rules={[{ required: true, message: 'Vui lòng nhập Ref GRN Code' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="productID"
            label="Product ID"
            rules={[{ required: true, message: 'Vui lòng nhập Product ID' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="productVariantID"
            label="Product Variant ID"
            rules={[{ required: true, message: 'Vui lòng nhập Product Variant ID' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="uoMID"
            label="UOM ID"
            rules={[{ required: true, message: 'Vui lòng nhập UOM ID' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: 'Vui lòng nhập Quantity' },
              { type: 'number', min: 1, message: 'Số lượng phải lớn hơn 0' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="uoMConversionID"
            label="UOM Conversion ID"
            rules={[{ required: true, message: 'Vui lòng nhập UOM Conversion ID' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="convertedQuantity"
            label="Converted Quantity"
            rules={[
              { required: true, message: 'Vui lòng nhập Số lượng chuyển đổi' },
              { type: 'number', min: 1, message: 'Số lượng chuyển đổi phải lớn hơn 0' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="storageBinID"
            label="Storage Bin ID"
            rules={[{ required: true, message: 'Vui lòng nhập Storage Bin ID' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(GoodsReceiptDetailList);
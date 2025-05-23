import { useState } from 'react';
import { Card, Col, Row, Button, ConfigProvider, Modal, Form, Input } from 'antd';
import ListBrand from './Components/ProductClassification.ListBrand';
import { PlusOutlined } from '@ant-design/icons';
import { useButtonStyles } from '../../../src/hooks/useButtonStyles';
import type { Brand } from '../../types/ProductClassification/Brand/Brand';
import useNotification from '../../../src/hooks/useNotification';
import { saveBrandByDapper } from '../../services/MasterData/Product/ProductClassification/BrandService';

type FieldType = {
  brandCode: string;
  brandName: string;
};

const Brands: React.FC = () => {
  const { styles } = useButtonStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const { notify, notifyError, contextHolder } = useNotification();

  const handleAddBrand = () => {
    setIsEditing(false);
    setCurrentBrand(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setIsEditing(true);
    setCurrentBrand(brand);
    form.setFieldsValue({
      brandCode: brand.brandCode,
      brandName: brand.brandName,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentBrand(null);
    form.resetFields();
  };

  const onFinish = async (values: FieldType) => {
    try {
      const brand: Brand = {
        id: isEditing && currentBrand ? currentBrand.id : 0, // Set ID to 0 for new brand
        brandCode: isEditing && currentBrand ? currentBrand.brandCode : '', // Empty for new brand, backend will generate
        brandName: values.brandName,
        createdBy: 'admin', // Replace with actual user from auth context
        updatedBy: 'admin', // Required for both create and update
        createdDate: isEditing && currentBrand ? currentBrand.createdDate : new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };

      const result = await saveBrandByDapper(brand);

      notify(result, {
        successMessage: isEditing ? 'Brand updated successfully' : 'Brand added successfully',
        errorMessage: `Failed to ${isEditing ? 'update' : 'add'} brand`,
      });

 // Làm mới danh sách nếu thao tác thành công hoặc không phải lỗi nghiêm trọng
    if (result.code === "0" || result.message?.includes('No changes were made')) {
      setRefreshTrigger((prev) => prev + 1);
      setIsModalOpen(false);
      setCurrentBrand(null);
      form.resetFields();
    }
    } catch (error) {
      notifyError('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Row gutter={24}>
        <Col span={24}>
          <Card
            title="Brands Management"
            extra={
              <ConfigProvider
                button={{
                  className: styles.gradientButtonGreen,
                }}
              >
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddBrand}
                >
                  Add Brand
                </Button>
              </ConfigProvider>
            }
            variant="borderless"
          >
            <ListBrand refreshTrigger={refreshTrigger} onEdit={handleEditBrand} />
          </Card>
        </Col>
      </Row>

      <Modal
        title={isEditing ? "Edit Brand" : "Add New Brand"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="brand_form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {isEditing && (
            <Form.Item<FieldType>
              label="Brand Code"
              name="brandCode"
              rules={[{ required: true, message: 'Brand code is required!' }]}
            >
              <Input readOnly />
            </Form.Item>
          )}

          <Form.Item<FieldType>
            label="Brand Name"
            name="brandName"
            rules={[{ required: true, message: 'Please input the brand name!' }]}
          >
            <Input placeholder="e.g., Nike" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button danger style={{ marginLeft: 8 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Brands;
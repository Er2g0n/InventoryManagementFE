import { Button, Form, Input, Modal } from "antd";
import { useCallback } from "react";
import type { FormInstance } from "antd/es/form/Form";
// import useNotification from "../../../hooks/useNotification";
import { saveProductType } from "@/services/MasterData/Product/ProductClassification/ProductType.service";
import type { ProductType } from "../../../types/ProductClassification/ProductType";

type FieldType = {
  productTypeCode?: string;
  productTypeName: string;
};

interface FormProductTypeProps {
  form: FormInstance;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isEditing: boolean;
  currentProductType: ProductType | null;
  setRefreshTrigger: (setter: (prev: number) => number) => void;
}

const FormProductType: React.FC<FormProductTypeProps> = ({
  form,
  isModalOpen,
  setIsModalOpen,
  isEditing,
  currentProductType,
  setRefreshTrigger
}) => {
  // const { styles } = useButtonStyles();
  // const { notify, contextHolder } = useNotification();

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
  }, [form, setIsModalOpen]);

  const onFinish = useCallback(
    async (values: FieldType) => {
      try {
        const productType: ProductType = {
          id: isEditing && currentProductType ? currentProductType.id : 0,
          productTypeCode: isEditing && currentProductType ? currentProductType.productTypeCode : "",
          productTypeName: values.productTypeName,
          createdBy: "admin", // Thay bằng user từ context xác thực
          updatedBy: "admin",
          createdDate:
            isEditing && currentProductType ? currentProductType.createdDate : new Date().toISOString(),
          updatedDate: new Date().toISOString()
        };

        const result = await saveProductType(productType);

        // notify(result, {
        //   successMessage: `Loại sản phẩm ${values.productTypeName} đã được ${
        //     isEditing ? "cập nhật" : "thêm"
        //   } thành công`,
        //   errorMessage: result.message || "Lỗi khi lưu loại sản phẩm",
        //   warningMessage: result.message || "Hành động không được phép"
        // });

        if (result.code === "0") {
          setRefreshTrigger((prev) => prev + 1);
        }
      } catch (error) {
        // notify({
        //   code: "1",
        //   message: "Lỗi khi lưu loại sản phẩm"
        // });
      } finally {
        handleCancel();
      }
    },
    [isEditing, currentProductType, setRefreshTrigger, handleCancel]
  );

  const onFinishFailed = useCallback((errorInfo: unknown) => {
    console.log("Form submission failed:", errorInfo);
  }, []);

  return (
    <>
      {/* {contextHolder} */}
      <Modal
        title={isEditing ? "Chỉnh sửa loại sản phẩm" : "Thêm loại sản phẩm mới"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="product_type_form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {isEditing && (
            <Form.Item<FieldType>
              label="Mã loại sản phẩm"
              name="productTypeCode"
              rules={[{ required: true, message: "Mã loại sản phẩm là bắt buộc!" }]}
            >
              <Input readOnly />
            </Form.Item>
          )}
          <Form.Item<FieldType>
            label="Tên loại sản phẩm"
            name="productTypeName"
            rules={[{ required: true, message: "Vui lòng nhập tên loại sản phẩm!" }]}
          >
            <Input placeholder="Ví dụ: Điện tử" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              >Lưu</Button>
            <Button danger style={{ marginLeft: 8 }} onClick={handleCancel}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormProductType;
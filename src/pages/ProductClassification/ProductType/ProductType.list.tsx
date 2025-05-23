import { Button, Popconfirm, Space, Table, type TableColumnsType, type TableProps } from "antd";
import type { ProductType } from "../../../types/ProductClassification/ProductType";
import { useEffect, useState } from "react";
// import { useButtonStyles } from "../../../hooks/useButtonStyles";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { deleteProductType, getAllProductType } from "@/services/MasterData/Product/ProductClassification/ProductType.service";
// import useNotification from "../../../hooks/useNotification";

interface ListProductTypeProps {
    refreshTrigger: number;
    onEdit: (productType: ProductType) => void;
}

const ListProductType: React.FC<ListProductTypeProps> = ({ refreshTrigger, onEdit }) => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const { styles } = useButtonStyles();
  // Initialize the notification hook
  // const { notifySuccess, notifyError, contextHolder } = useNotification();

  // Đỗ data ra list
  useEffect(() => {
    const getProductTypes = async () => {
      try {
        const response = await getAllProductType();

        if ( response.code==="0" && response.data){
          setProductTypes(response.data);
        }
      }
      catch (error) {
        // notifyError("Failed to load product types");
      }
      finally {
        setLoading(false);
      }
    };

    getProductTypes();

  }, [refreshTrigger]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const columns: TableColumnsType<ProductType> = [
    {
      title: "Product-Type Code",
      dataIndex: "productTypeCode",
           
      filters: productTypes.map((productType) => ({
        text: productType.productTypeCode,
        value: productType.productTypeCode
      })),
      onFilter: (value, record) => record.productTypeCode === value
    },
    {
      title: "Product-Type Name",
      dataIndex: "productTypeName",
           
      filterSearch: true,
      filters: productTypes.map((productType) => ({
        text: productType.productTypeName,
        value: productType.productTypeName
      })),
      onFilter: (value, record) => record.productTypeName === value
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
           
      render: (createdBy: string | null) => createdBy || "N/A"
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
          
      render: (createdDate: string | null) =>
        createdDate ? new Date(createdDate).toLocaleString() : "N/A"
    },

    {
      title: "Updated By",
      dataIndex: "updatedBy",
         
      render: (updatedBy: string | null) => updatedBy || "N/A"
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
           
      render: (updatedDate: string | null) =>
        updatedDate ? new Date(updatedDate).toLocaleString() : "N/A"
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        
          <Space>
            <Button
              type="primary"
              size="middle"
              icon={<EditOutlined />}
              onClick={() => {
                onEdit(record);
              }}></Button>
            <Popconfirm
              title="Are you sure to delete this product type?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {

                handleDelete(record);
              }}>
              <Button
                danger
                size="middle"
                icon={<DeleteOutlined />}
                ></Button>
            </Popconfirm>
          </Space>
      )
    }
  ];



  // Function to handle table changes
  const handleDelete = async (record: ProductType) => {
    try {
      if (!record.productTypeCode){
        setError("Product Type Code is null");
        return;
      }
      const response = await deleteProductType(record.productTypeCode);

      if (response.code === "0"){
        setProductTypes((prev) => prev.filter((item) => item.productTypeCode !== record.productTypeCode));
        // notifySuccess(response.message);
        setError(null);
      } else {
        // notifyError(response.message);
      }
      return;
    } catch ( error) {
      // setError("Error deleting product type");
      // notifyError("Error deleting product type");
    }
  };

  const onChange: TableProps<ProductType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("Table params", pagination, filters, sorter, extra);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ProductType[]) => {
      console.log("Selected Row Keys:", selectedRowKeys);
      console.log("Selected Rows Data:", selectedRows);
    }
  };

  return (
    <>
      {/* {contextHolder} */}
      <Table<ProductType>
        columns={columns}
        rowSelection={{ type: "checkbox", ...rowSelection }}
        dataSource={productTypes}
        onChange={onChange}
        rowKey="id"
      />
    </>
  );


};


export default ListProductType;
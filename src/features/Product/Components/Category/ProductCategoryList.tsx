import { Button, Popconfirm, Space, Table, type TableColumnsType, type TableProps } from "antd";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { ProductCategory } from "@/types/ProductClassification/ProductCategory";
import { useProductCategories } from "@features/Product/store/ProductCategory/hooks/useProductCategory";

interface ListProductCategoryProps {
  onEdit: (productCategory: ProductCategory) => void;
  refreshTrigger: number;
}

const ListProductCategory: React.FC<ListProductCategoryProps> = React.memo(({ onEdit, refreshTrigger }) => {
  const { productCategories, loading, error, loadProductCategories, deleteProductCategory } = useProductCategories();

  useEffect(() => {
    loadProductCategories();
  }, [refreshTrigger]);

  if (loading && productCategories.length === 0) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleDelete = (categoryCode: string) => {
    deleteProductCategory(categoryCode);
    refreshTrigger += 1;
    }

  const columns: TableColumnsType<ProductCategory> = [
    {
      title: "Category Code",
      dataIndex: "categoryCode",
      filters: productCategories.map((pc) => ({ text: pc.categoryCode, value: pc.categoryCode })),
      onFilter: (value, record) => record.categoryCode === value,
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      filterSearch: true,
      filters: productCategories.map((pc) => ({ text: pc.categoryName, value: pc.categoryName })),
      onFilter: (value, record) => record.categoryName === value,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      render: (createdBy: string | null) => createdBy || "N/A",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      render: (createdDate: string | null) =>
        createdDate ? new Date(createdDate).toLocaleString() : "N/A",
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      render: (updatedBy: string | null) => updatedBy || "N/A",
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      render: (updatedDate: string | null) =>
        updatedDate ? new Date(updatedDate).toLocaleString() : "N/A",
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
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this category?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDelete(record.categoryCode)} // Dispatch action để xóa
          >
            <Button
              danger
              size="middle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<ProductCategory>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("Table params", pagination, filters, sorter, extra);
  };

  return (
    <Table<ProductCategory>
      columns={columns}
      dataSource={productCategories}
      onChange={onChange}
      rowKey="categoryCode"
      loading={loading}
      pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ["10", "20", "50"] }}
    />
  );
});

export default ListProductCategory;
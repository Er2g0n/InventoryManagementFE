// import { useEffect, useState } from "react";
// import { type TableColumnsType, Table, type TableProps, Button, Space, ConfigProvider, Popconfirm } from "antd";
// import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
// import { deleteBrandByDapper, getAllBrands } from "../../../services/MasterData/Product/ProductClassification/BrandService";
// import { Brand } from "@/types/ProductClassification/Brand/Brand";
// import { ResultService } from "@/types/Base/ResultService";

// interface ListBrandProps {
//   refreshTrigger: number;
//   onEdit: (brand: Brand) => void;
// }

// const ListBrand: React.FC<ListBrandProps> = ({ refreshTrigger, onEdit }) => {
//   const [brands, setBrands] = useState<Brand[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const { styles } = useButtonStyles();

//   const handleDelete = async (record: Brand) => {
//     try {
//       if (!record.brandCode) {
        
//         console.error("Missing brandCode for delete");
//         return;
//       }

//       const result = await deleteBrandByDapper(record.brandCode);

//       if (result.code === "0") {
//         setBrands((prev) => prev.filter((b) => b.brandCode !== record.brandCode));
//         console.log(`Deleted brand: ${record.brandCode}`);
//       } else {
//         console.error(`Delete failed: ${result.message}`);
//       }
//     } catch (error) {
//       console.error("Error deleting brand:", error);
//     }
//   };

//   const columns: TableColumnsType<Brand> = [
//     {
//       title: "Brand Code",
//       dataIndex: "brandCode",
//       width: "15%",
//       filters: brands.map((brand) => ({
//         text: brand.brandCode,
//         value: brand.brandCode
//       })),
//       onFilter: (value, record) => record.brandCode === value
//     },
//     {
//       title: "Brand Name",
//       dataIndex: "brandName",
//       width: "20%",
//       filterSearch: true,
//       filters: brands.map((brand) => ({
//         text: brand.brandName,
//         value: brand.brandName,
//       })),
//       onFilter: (value, record) => record.brandName === value,
//     },
//     {
//       title: "Created By",
//       dataIndex: "createdBy",
//       width: "10%",
//       render: (createdBy: string | null) => createdBy || "N/A",
//     },
//     {
//       title: "Created Date",
//       dataIndex: "createdDate",
//       width: "10%",
//       render: (createdDate: string | null) =>
//       createdDate ? new Date(createdDate).toLocaleString() : "N/A",
//     },

//     {
//       title: "Updated By",
//       dataIndex: "updatedBy",
//       width: "10%",
//       render: (updatedBy: string | null) => updatedBy || "N/A",
//     },
//     {
//       title: "Updated Date",
//       dataIndex: "updatedDate",
//       width: "10%",
//       render: (updatedDate: string | null) =>
//       updatedDate ? new Date(updatedDate).toLocaleString() : "N/A",
//     },

//     {
//       title: "Action",
//       key: "action",
//       // width: "30%",
//       render: (_, record) => (
//         <ConfigProvider
//           button={{
//             className: styles.gradientButtonBlue,
//           }}
//         >
//           <Space>
//             <Button
//               type="primary"
//               size="middle"
//               icon={<EditOutlined />}
//               onClick={() => onEdit(record)}
//             >
//               {/* Edit */}
//             </Button>
//             <Popconfirm
//               title="Delete the brand"
//               description={`Are you sure to delete the brand "${record.brandName}"?`}
//               icon={<QuestionCircleOutlined style={{ color: "red" }} />}
//               onConfirm={() => handleDelete(record)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button
//                 danger
//                 size="middle"
//                 icon={<DeleteOutlined />}
//                 className={styles.gradientButtonRed}
//               >
//                 {/* Delete */}
//               </Button>
//             </Popconfirm>
//           </Space>
//         </ConfigProvider>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const getBrands = async () => {
//       try {
//         const result: ResultService<Brand[]> = await getAllBrands({ cache: false });
//         setBrands(result.data ?? []);
//         setLoading(false);
//       } catch (error) {
//         const errorMessage =
//           error instanceof Error
//             ? error.message
//             : "Có lỗi xảy ra khi tải sản phẩm";
//         setError(errorMessage);
//         setLoading(false);
//       }
//     };

//     getBrands();
//   }, [refreshTrigger]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const onChange: TableProps<Brand>["onChange"] = (
//     pagination,
//     filters,
//     sorter,
//     extra
//   ) => {
//     console.log("Table params", pagination, filters, sorter, extra);
//   };

//   const rowSelection = {
//     onChange: (selectedRowKeys: React.Key[], selectedRows: Brand[]) => {
//       console.log("Selected Row Keys:", selectedRowKeys);
//       console.log("Selected Rows Data:", selectedRows);
//     },
//   };

//   return (
//     <Table<Brand>
//       columns={columns}
//       rowSelection={{
//         type: "checkbox",
//         ...rowSelection,
//       }}
//       dataSource={brands}
//       onChange={onChange}
//       rowKey="id"
//     />
//   );
// };

// export default ListBrand;
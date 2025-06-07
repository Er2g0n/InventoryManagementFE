import React, { useEffect, useState } from "react";
import { type TableColumnsType, Table, type TableProps, Button, Space, ConfigProvider, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { ResultService } from "@/types/Base/ResultService";
import { Brand } from "@/types/MasterData/Product/ProductClassification";
import { getAllProductBrand } from "@features/Product/Services/ProductBrandService";

interface ListBrandProps {
    onEdit: (brand: Brand) => void;
    refreshTrigger: number;
}

const ListBrand: React.FC<ListBrandProps> = React.memo({ refreshTrigger, onEdit }) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
      useEffect(() => {
        loadBrands();
      }, [refreshTrigger]);
    
  const handleDelete = async (record: Brand) => {
    try {
      if (!record.brandCode) {
        
        console.error("Missing brandCode for delete");
        return;
      }


    }
  }}
export default ListBrand;
function loadBrands() {
    throw new Error("Function not implemented.");
}


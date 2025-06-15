import { BusinessPartner } from "@/types/BusinessPartner";
import useFetchData from "../hooks/useFectchData";
import { getAll } from "../services/partnerServices";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Button, message, Modal, Spin } from "antd";

import PartnerForm from "./partnerForm";
import PartnerTable, { PartnerTableHandle } from "./PartnerTableData";

export default function PartnerList () {
  const { data: partners, loading, hasError, fetchData } = useFetchData<BusinessPartner[]>([]);
  const partnerTableRef = useRef<PartnerTableHandle>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeForm, setTypeForm] = useState<"create" | "update">("create");
  const [singleData, setSingleData] = useState<BusinessPartner | undefined>();
  const columnAdd = useMemo(() => {
    const columnHelper = partnerTableRef.current?.getColumnHelper();

    if (columnHelper) {
      return [
        columnHelper.display({
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <Button size="small" onClick={() => handleOpenUpdate(row.original)}>
              Detail
            </Button>
          ),
          size: 80,
          enableColumnFilter: false,
          meta: {
            disabledTransition: true
          }
        })
      ];
    }
    return [];
  }, [partners]);

  const handleOpenUpdate = (data: BusinessPartner) => {
    setTypeForm("update");
    setSingleData(data);
    setIsModalOpen(true);
  };

  function afterDelete (isDelete : boolean) {
    if (isDelete) {
      message.success("Delete succes");
      setIsModalOpen(false);
      fetchData(getAll);
    } else {
      message.error("Delete error");
    }

  }

  const handleOpenCreate = () => {
    setTypeForm("create");
    setSingleData(undefined);
    setIsModalOpen(true);
  };

  const afterSave = (isSave :boolean) => {
    if (isSave) {
      message.success("Save succes");
      setIsModalOpen(false);
      fetchData(getAll);
    } else {
      message.error("save error");
    }
  };

  useEffect(() => {
    fetchData(getAll);
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Partner List</h1>
        <Button type="primary" onClick={handleOpenCreate}>
          Create Partner
        </Button>
      </div>

      {loading && <Spin size="large" className="flex justify-center my-4" />}
      {hasError && (
        <Alert
          message="Error"
          description="Failed to load partners. Please try again."
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow mb-6 pb-2">
        <PartnerTable addColumns={columnAdd} ref={partnerTableRef} data={partners ?? []} />
      </div>

      {/* Modal Form */}
      <Modal
        title={typeForm === "create" ? "Create New Partner" : "Update Partner"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <PartnerForm
          afterDelete={afterDelete}
          type={typeForm}
          defaultValue2={singleData}
          afterSave={afterSave}
        />
      </Modal>
    </div>
  );
}
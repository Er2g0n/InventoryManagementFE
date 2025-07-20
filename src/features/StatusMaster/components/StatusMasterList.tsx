import { StatusMaster } from "@/types/StatusMaster";
import useFetchData from "../hooks/useFetchData";
import { getAll } from "../services/StatusMasterService";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Button, message, Modal, Spin } from "antd";
import StatusMasterForm from "./StatusMasterForm";
import StatusMasterTable, { StatusMasterTableHandle } from "./StatusMasterTableData";

export default function StatusMasterList () {
  const { data: statuses, loading, hasError, fetchData } = useFetchData<StatusMaster[]>([]);
  const statusTableRef = useRef<StatusMasterTableHandle>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeForm, setTypeForm] = useState<"create" | "update">("create");
  const [singleData, setSingleData] = useState<StatusMaster | undefined>();

  const columnAdd = useMemo(() => {
    const columnHelper = statusTableRef.current?.getColumnHelper();

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
  }, [statuses]);

  const handleOpenUpdate = (data: StatusMaster) => {
    setTypeForm("update");
    setSingleData(data);
    setIsModalOpen(true);
  };

  function afterDelete (isDelete: boolean) {
    if (isDelete) {
      message.success("Delete success");
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

  const afterSave = (isSave: boolean) => {
    if (isSave) {
      message.success("Save success");
      setIsModalOpen(false);
      fetchData(getAll);
    } else {
      message.error("Save error");
    }
  };

  useEffect(() => {
    fetchData(getAll);
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Status Master List</h1>
        <Button type="primary" onClick={handleOpenCreate}>
          Create Status
        </Button>
      </div>

      {loading && <Spin size="large" className="flex justify-center my-4" />}
      {hasError && (
        <Alert
          message="Error"
          description="Failed to load statuses. Please try again."
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow mb-6 pb-2">
        <StatusMasterTable addColumns={columnAdd} ref={statusTableRef} data={statuses ?? []} />
      </div>

      <Modal
        title={typeForm === "create" ? "Create New Status" : "Update Status"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <StatusMasterForm
          afterDelete={afterDelete}
          type={typeForm}
          defaultValue2={singleData}
          afterSave={afterSave}
        />
      </Modal>
    </div>
  );
}
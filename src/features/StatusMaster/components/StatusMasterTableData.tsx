import { StatusMaster } from "@/types/StatusMaster";
import GenericTable, { GenericTableProps } from "./StatusMasterTable";
import { ColumnDef, ColumnHelper, createColumnHelper } from "@tanstack/react-table";
import { forwardRef, useImperativeHandle, useMemo } from "react";

const columnHelper = createColumnHelper<StatusMaster>();

const columns = [
  columnHelper.accessor((row) => row.statusCode, {
    id: "statusCode",
    header: () => "Status Code",
    cell: (info) => info.getValue(),
    size: 150,
    enableSorting: true,
    enableColumnFilter: false
  }),
  columnHelper.accessor((row) => row.statusName, {
    header: () => "Status Name",
    cell: (info) => info.getValue(),
    size: 200,
    id: "statusName",
    enableSorting: true,
    enableColumnFilter: false
  }),
  columnHelper.accessor("description", {
    header: () => "Description",
    cell: (info) => info.getValue(),
    size: 250,
    id: "description",
    enableColumnFilter: false
  })
];

export interface StatusMasterTableProps extends Omit<GenericTableProps<StatusMaster>, "newColumns"> {
  addColumns?: ColumnDef<StatusMaster, any>[];
}

export interface StatusMasterTableHandle {
  getColumnHelper: () => ColumnHelper<StatusMaster>;
}

const StatusMasterTable = forwardRef<StatusMasterTableHandle, StatusMasterTableProps>(
  ({ addColumns = [], ...attribute }, ref) => {
    useImperativeHandle(ref, () => ({
      getColumnHelper () {
        return columnHelper;
      }
    }));

    const columnsDefault = useMemo<ColumnDef<StatusMaster, any>[]>(() => {
      const computedColumns = [...columns, ...addColumns];

      return computedColumns;
    }, [addColumns]);

    return <GenericTable<StatusMaster> {...attribute} newColumns={columnsDefault} />;
  }
);

export default StatusMasterTable;
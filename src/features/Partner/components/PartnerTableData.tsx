import { BusinessPartner } from "@/types/BusinessPartner";

import GenericTable, { GenericTableProps } from "./PartnerTable";
import { ColumnDef, ColumnHelper, createColumnHelper } from "@tanstack/react-table";
import { forwardRef, useImperativeHandle, useMemo } from "react";

const columnHelper = createColumnHelper<BusinessPartner>();

const columns = [
  columnHelper.accessor(row => row.partnerCode, {
    id: "partnerCode",
    header: () => "Partner Code",
    cell: info => info.getValue(),
    size: 150,
    enableSorting: true,
    enableColumnFilter : false
  }),
  columnHelper.accessor(row=>row.partnerName, {
    header: () => "Partner Name",
    cell: info => info.getValue(),
    size: 200,
    id:"partnerName",
    enableSorting: true,
    enableColumnFilter : false
  }),
  columnHelper.accessor("isSupplier", {
    header: () => "Supplier",
    cell: info => (info.getValue() ? "Yes" : "No"),
    size: 100,
    id:"isSupplier",
    enableSorting: true,
    meta : {
      filterVariant : "select"
    },
    enableColumnFilter : true
  }),
  columnHelper.accessor("isCustomer", {
    header: () => "Customer",
    cell: info => (info.getValue() ? "Yes" : "No"),
    size: 100,
    id:"isCustomer",
    enableSorting: true,
    meta : {
      filterVariant : "select"
    },
    enableColumnFilter : true
  }),
  columnHelper.accessor("contactInfo", {
    header: () => "Contact Info",
    cell: info => info.getValue(),
    id:"contactInfo",
    size: 250,
    enableColumnFilter : false
  }),
  columnHelper.accessor("statusID", {
    header: () => "Status ID",
    cell: info => info.getValue(),
    size: 100,
    id:"statusID",
    enableSorting: true,
    enableColumnFilter : false
  })
];


export interface PartnerTableProps extends  Omit<GenericTableProps<BusinessPartner>, "newColumns"> {
 addColumns? : ColumnDef<BusinessPartner, any>[]
  
}
export interface PartnerTableHandle {
  getColumnHelper: () => ColumnHelper<BusinessPartner>;
}
const PartnerTable = forwardRef<PartnerTableHandle, PartnerTableProps>(
  ({ addColumns = [], ...attribute }, ref) => {
    useImperativeHandle(ref, () => ({
      getColumnHelper () {
        return columnHelper;
      }
    }));
    const columnsDefault = useMemo<ColumnDef<BusinessPartner, any>[]>(()=>{
      
      const computedColumns= [...columns, ...addColumns] ;

      return computedColumns;
    }, [addColumns]);
  
    return (
      <GenericTable<BusinessPartner>   {...attribute}   newColumns={columnsDefault}  />
    );

  });

export default PartnerTable;
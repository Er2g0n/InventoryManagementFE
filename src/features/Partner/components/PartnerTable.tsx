import {  ColumnDef, flexRender, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel,  PaginationState, useReactTable } from "@tanstack/react-table";

import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {  useMemo, useState } from "react";
import {
  FilterFilled
} from "@ant-design/icons";

import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { Card, Dropdown, Radio } from "antd";

export interface GenericTableProps<T extends Record<string, any>> extends React.HTMLAttributes<HTMLTableElement>{
  data: T[];
  newColumns?: ColumnDef<T>[];
}

export interface GenericTableHandle<T extends Record<string, any>> {
  table: ReturnType<typeof useReactTable<T>>;
}

function Filter ({ column }: { column: any }) {
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnFilterValue = column.getFilterValue();
  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === "range"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant]
  );

  return filterVariant === "select" ? (
    <Dropdown
      trigger={["click"]}
      placement="bottomLeft"
      overlay={
        <Card styles={{ body: { padding: 0 }}}>
          <div className="flex flex-col p-1">
            {sortedUniqueValues.map((value: any) => (
              <Radio
                key={"filter-" + value}
                checked={columnFilterValue == value}
                onChange={(e) => column.setFilterValue(e.target.value)}
                value={value}
              >
                {column.columnDef?.cell &&
                  column.columnDef.cell({ getValue: () => value })}
              </Radio>
            ))}
          </div>
        </Card>
      }
    >
      <div
        className={`cursor-pointer ${
          sortedUniqueValues.includes(columnFilterValue)
            ? "text-blue-600"
            : ""
        }`}
      >
        <FilterFilled />
      </div>
    </Dropdown>
  ) : null;
}

const DraggableTableHeader = ({
  header
}: {
  header: any;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id
    });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    width: header.column.getSize(),
    transition: "width transform 0.2s ease-in-out"
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      colSpan={header.colSpan}
      className={`border border-gray-300 p-2 text-left font-semibold relative ${
        isDragging ? "opacity-80 z-10" : "opacity-100 z-0"
      }`}
    >
      <div className="flex">
        {!header.column.columnDef.meta?.disabledTransition && (
          <button
            {...attributes}
            {...listeners}
            className="ml-2 mr-1 cursor-grab active:cursor-grabbing hover:bg-gray-300 rounded"
            type="button"
          >
            ⋮⋮
          </button>
        )}
        <div className="text-nowrap pointer-events-none select-none">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>
        {header.column.getCanFilter() && <Filter column={header.column} />}
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className="absolute right-0 top-0 h-full w-1 bg-gray-400 cursor-col-resize hover:bg-blue-500"
        />
      </div>
    </th>
  );
};

const DragAlongCell = ({ cell }: { cell: any }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id
  });
  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    width: cell.column.getSize(),
    transition: "width transform 0.2s ease-in-out"
  };

  return (
    <td
      ref={setNodeRef}
      style={style}
      className={`border border-gray-300 p-2 relative ${
        isDragging ? "opacity-80 z-10" : "opacity-100 z-0"
      }`}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

function GenericTable<T extends Record<string, any>> (
  { data, newColumns = [], ...attribute }: GenericTableProps<T>
   
)  {
  const columnsDefault = useMemo<ColumnDef<T>[]>(() => {
    return [...newColumns];
  }, [newColumns]);

  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columnsDefault.map(c => c.id!)
  );
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [pagination, setPagination] =useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  });

  const table = useReactTable({
    data: data || [],
    columns: columnsDefault,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",

    state: {
      columnOrder,
      columnFilters,
      pagination
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel:   getPaginationRowModel(),
    onPaginationChange: setPagination
  });

  function handleDragEnd (event: DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setColumnOrder(prev => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      
      <div className="w-full overflow-auto">

        <table className="w-full overflow-auto border-collapse border border-gray-300" {...attribute}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-gray-200">
                {headerGroup.headers.map(header => (
                  <SortableContext
                    key={header.id}
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    <DraggableTableHeader key={header.id} header={header} />
                  </SortableContext>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <SortableContext
                    key={cell.id}
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    <DragAlongCell key={cell.id} cell={cell} />
                  </SortableContext>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        
    
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm mt-3">
        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-0.5 border rounded text-gray-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="px-2 py-0.5 border rounded text-gray-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="px-2 py-0.5 border rounded text-gray-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="px-2 py-0.5 border rounded text-gray-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>

        {/* Page info */}
        <span className="text-gray-600">
    Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          <strong>{table.getPageCount()}</strong>
        </span>

        {/* Go to page input */}
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Go to</span>
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;

              table.setPageIndex(page);
            }}
            className="w-14 px-1.5 py-0.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-300 text-center text-xs"
          />
        </div>

        {/* Page size selector */}
        <div className="flex items-center gap-1">
          <label htmlFor="page-size" className="text-gray-600">Show</label>
          <select
            id="page-size"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-1.5 py-0.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-300 text-xs"
          >
            {[5, 10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
     

     
    
      
    </DndContext>
  );
};

export default GenericTable;
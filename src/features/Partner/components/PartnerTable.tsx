import {  ColumnDef, flexRender, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, Header, useReactTable } from "@tanstack/react-table";

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

function Filter<T extends Record<string, any>> ({ column }: { column: any }) {
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

const DraggableTableHeader = <T extends Record<string, any>>({
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

const DragAlongCell = <T extends Record<string, any>>({ cell }: { cell: any }) => {
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

  const table = useReactTable({
    data: data || [],
    columns: columnsDefault,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    state: {
      columnOrder,
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    debugTable: true
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
      <table className="w-full border-collapse border border-gray-300" {...attribute}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map(header => (
                <SortableContext
                  key={header.id}
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  <DraggableTableHeader<T> key={header.id} header={header} />
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
                  <DragAlongCell<T> key={cell.id} cell={cell} />
                </SortableContext>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DndContext>
  );
};

export default GenericTable;
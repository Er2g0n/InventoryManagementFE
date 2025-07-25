import { GoodsReceiptNote } from "@/types/WarehouseManagement/GoodsReceiptNote";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined, SearchOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, notification, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useGoodsReceiptNote } from "@features/Inventory/Store/GoodsReceiptNote/hooks/useGoodsReceiptNote";
import dayjs from "dayjs";
import GoodsReceiptDetailList from "./GoodsReceitNoteDetailList";



interface ListGoodsReceiptNoteProps {
    onEdit: (GoodsReceiptNote: GoodsReceiptNote) => void;
    refreshTrigger: number;
}

const ListGoodsReceiptNote: React.FC<ListGoodsReceiptNoteProps> = React.memo(({ onEdit, refreshTrigger }) => {
    const { GoodsReceiptNotes, GoodsReceiptNoteLines, loading, error, loadGoodsReceiptNote, loadGoodsReceiptNoteLine, deleteGoodsReceiptNote } = useGoodsReceiptNote();
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isFunction, setIsFunction] = useState(false);
    const [currentPageIndex, setcurrentPageIndex] = useState(0);
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
        loadGoodsReceiptNote();

    }, [refreshTrigger])

    useEffect(()=>{
        if(GoodsReceiptNoteLines.length > 0)
            setLoading2(true);
    },[GoodsReceiptNoteLines])

    const handlecloseModal = () => {
        setLoading2(false);
        
    }
    const handleDelete = async (GoodsReceiptNoteCode: string) => {

        const response = await deleteGoodsReceiptNote(GoodsReceiptNoteCode);

        if (response.success === true) {
            notification.success({
                message: "Success",
                description: `Xoá phiếu ${GoodsReceiptNoteCode} thành công`,
            });
            setIsFunction(true);
            setcurrentPageIndex(pageIndex);
            loadGoodsReceiptNote();
        } else {
            notification.error({
                message: "Error",
                description: `Xoá phiếu ${GoodsReceiptNoteCode} không thành công`,
            });
        }
    };

    const LoadGoodsReceiptNoteDetail = async (GoodsReceiptNote: string) => {
        setLoading2(true);
        try {
            loadGoodsReceiptNoteLine(GoodsReceiptNote);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết:', error);
        }
    };

    const uniqueGoodsReceiptNotesCodes = [...new Set(GoodsReceiptNotes.map(grn => grn.grnCode))];
    const columns: ColumnDef<GoodsReceiptNote>[] = [
        {
            header: ({ column }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontWeight: 600 }}>GoodsReceiptNote Code</span>
                    <select
                        value={(column.getFilterValue() as string) || ''}
                        onChange={e => column.setFilterValue(e.target.value)}
                        style={{
                            padding: '8px',
                            borderRadius: '6px',
                            border: '1px solid #d9d9d9',
                            width: '100%',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="">All</option>
                        {uniqueGoodsReceiptNotesCodes.map(code => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                </div>
            ),
            accessorKey: 'grnCode',
            filterFn: 'equals',
        },
        {
            header: 'Transaction Type ID',
            accessorKey: 'transactionTypeID',
            cell: ({ getValue }) => {
                const value = getValue() as number | null;
                return value ? value : 0;
            },
        },
        {
            header: 'Ware House',
            accessorKey: 'warehouseID',
            cell: ({ getValue }) => {
                const value = getValue() as number | null;
                return value ? value : 0;
            },
        },
        {
            header: 'Supplier',
            accessorKey: 'supplierID',
            cell: ({ getValue }) => {
                const value = getValue() as number | null;
                return value ? value : 0;
            },
        },
        {
            header: 'Receipt Date',
            accessorKey: 'receiptDate',
            cell: ({ getValue }) => {
                const value = getValue() as number | null;
                return value ? dayjs(value).format('DD/MM/YYYY') : 0;
            },
        },
        {
            header: 'Note',
            accessorKey: 'notes',
            cell: ({ getValue }) => {
                const value = getValue() as string | null;
                return value ? value : "";
            },
        },
        {
            header: 'Created By',
            accessorKey: 'createdBy',
            cell: ({ getValue }) => getValue() || 'N/A',
        },
        {
            header: 'Created Date',
            accessorKey: 'createdDate',
            cell: ({ getValue }) => {
                const value = getValue() as string | null;
                return value ? dayjs(value).format('DD/MM/YYYY') : '';
            },
        },
        {
            header: 'Updated By',
            accessorKey: 'updatedBy',
            cell: ({ getValue }) => getValue() || 'N/A',
        },
        {
            header: 'Updated Date',
            accessorKey: 'updatedDate',
            cell: ({ getValue }) => {
                const value = getValue() as string | null;
                return value ? dayjs(value).format('DD/MM/YYYY') : '';
            },
        },
        {
            header: 'Action',
            id: 'actions',
            cell: ({ row }) => (
                <Space>
                    <Button
                        type="primary"
                        size="middle"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(row.original)}
                        style={{ borderRadius: 'px' }}
                    />
                    <Button
                        danger
                        size="middle"
                        icon={<DeleteOutlined />}
                        onClick={() => showDeleteConfirm(row.original)}
                        style={{ borderRadius: '6px' }}
                    />
                    <Button
                        type="link"
                        size="middle"
                        icon={<FileSearchOutlined />}
                        onClick={() => LoadGoodsReceiptNoteDetail(row.original.grnCode)}
                        style={{ transform: "translateY(-3px)", boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", borderColor: "black" }}
                    />
                </Space>
            ),
        },
    ];

    const table = useReactTable<GoodsReceiptNote>({
        data: GoodsReceiptNotes,
        columns,
        state: {
            globalFilter,
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: updater => {
            const newState = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
            if (isFunction) {
                setPageIndex(currentPageIndex);
                setPageSize(newState.pageSize);
                setIsFunction(false);
            }
            else {
                setPageIndex(newState.pageIndex);
                setPageSize(newState.pageSize);
            }
        },
    });

    const showDeleteConfirm = (model: GoodsReceiptNote) => {
        Modal.confirm({
            title: (
                <div>
                    <div>Bạn có chắc chắn muốn xóa:</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>
                        {model.grnCode} - {model.notes}
                    </div>
                </div>
            ),
            icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDelete(model.grnCode);
            },
        });
    };

    if (loading && GoodsReceiptNotes.length === 0) {
        return <div style={{ padding: 20, textAlign: 'center' }}>Loading...</div>;
    }
    if (error) {
        return <div style={{ padding: 20, textAlign: 'center', color: 'red' }}>{error}</div>;
    }

    return (
        <>
            {loading2 === false ? <>
                <div style={{ padding: '0px 16px', width: '100%', margin: '0 auto' }}>

                    {/* Thanh tìm kiếm */}
                    <Input
                        type="text"
                        value={globalFilter}
                        onChange={e => setGlobalFilter(e.target.value)}
                        placeholder="Search all columns..."
                        prefix={<SearchOutlined />}
                        style={{
                            marginBottom: '20px',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            width: '300px',
                        }}
                    />
                    {/* Bảng */}
                    <div style={{ width: '100%', overflowX: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                style={{
                                                    border: '1px solid #e8e8e8',
                                                    padding: '12px',
                                                    backgroundColor: '#f5f5f5',
                                                    fontWeight: 600,
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr
                                        key={row.id}
                                        style={{
                                            border: '1px solid #e8e8e8',
                                            transition: 'background-color 0.2s',
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f0f7ff')}
                                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                style={{
                                                    border: '1px solid #e8e8e8',
                                                    padding: '12px',
                                                }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Phân trang */}
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            style={{ borderRadius: '6px' }}
                        >
                            Previous
                        </Button>
                        <span>
                            Page{' '}
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </strong>
                        </span>
                        <Button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            style={{ borderRadius: '6px' }}
                        >
                            Next
                        </Button>
                        <select
                            value={pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value));
                                setPageSize(Number(e.target.value));
                            }}
                            style={{
                                padding: '8px',
                                borderRadius: '6px',
                                border: '1px solid #d9d9d9',
                                backgroundColor: '#fff',
                            }}
                        >
                            {[10, 20, 50].map(size => (
                                <option key={size} value={size}>
                                    Show {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </> :
                <>
                    <GoodsReceiptDetailList
                        goodsReceiptNoteLines={GoodsReceiptNoteLines}
                        visible={loading2} 
                        onCancel={handlecloseModal} />
                </>}
        </>
    );
});

export default ListGoodsReceiptNote;
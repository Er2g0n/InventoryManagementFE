import { ProductType } from "@/types/MasterData/Product/ProductClassification";
import { useProductTypes } from "@features/Product/store/ProductType/hooks/useProductType";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';

import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Space } from "antd";

interface ListProductTypeProps {
    onEdit: (productType: ProductType) => void;
}

const ListProductType: React.FC<ListProductTypeProps> = React.memo(({ onEdit }) => {
    const { productTypes, loading, error, loadProductTypes, deleteProductType } = useProductTypes();
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        loadProductTypes();
    }, []);

    const handleDelete = (productTypeCode: string) => {
        deleteProductType(productTypeCode);
    };

    const uniqueCategoryCodes = [...new Set(productTypes.map(pt => pt.productTypeCode))];
    const uniqueCategoryNames = [...new Set(productTypes.map(pt => pt.productTypeName))];

    const columns: ColumnDef<ProductType>[] = [
        {
            header: ({ column }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontWeight: 600 }}>Product Type Code</span>
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
                        {uniqueCategoryCodes.map(code => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                </div>
            ),
            accessorKey: 'productTypeCode',
            filterFn: 'equals',
        },
        {
            header: ({ column }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontWeight: 600 }}>Product Type Name</span>
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
                        {uniqueCategoryNames.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
            ),
            accessorKey: 'productTypeName',
            filterFn: 'includesString',
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
                return value ? new Date(value).toLocaleString() : 'N/A';
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
                return value ? new Date(value).toLocaleString() : 'N/A';
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
                        style={{ borderRadius: '6px' }}
                    />
                    <Button
                        danger
                        size="middle"
                        icon={<DeleteOutlined />}
                        onClick={() => showDeleteConfirm(row.original)}
                        style={{ borderRadius: '6px' }}
                    />
                </Space>
            ),
        },
    ];

    const table = useReactTable<ProductType>({
        data: productTypes,
        columns,
        state: {
            globalFilter,
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        autoResetPageIndex: false, // Ngăn ko cho quay về trang đầu khi thay đổi dữ liệu
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: updater => {
            const newState = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
            setPageIndex(newState.pageIndex);
            setPageSize(newState.pageSize);
        },
    })


    const showDeleteConfirm = (record: ProductType) => {
        Modal.confirm({
            title: (
                <div>
                    <div>Bạn có chắc chắn muốn xóa:</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>
                        {record.productTypeCode} - {record.productTypeName}
                    </div>
                </div>
            ),
            icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDelete(record.productTypeCode);
            },
        });
    };

    if (loading && productTypes.length === 0) {
        return <div style={{ padding: 20, textAlign: 'center' }}>Loading...</div>;
    }
    if (error) {
        return <div style={{ padding: 20, textAlign: 'center', color: 'red' }}>{error}</div>;
    }

    return (
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
            <div style={{width: '100%', overflowX: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
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
    );
});
export default ListProductType;
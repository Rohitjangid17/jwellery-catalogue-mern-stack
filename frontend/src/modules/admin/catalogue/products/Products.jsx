import { useState } from "react";
import AdminPageHeader from "../../../../shared/components/admin/PageHeader";
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Select, Table } from "antd";

const products = [
    {
        key: '1',
        image: 'http://localhost:5000/uploads/products/il_1140xN.3873329088_g9o6-1757833873747.webp',
        title: 'Gold Ring',
        price: 1200,
        category: 'Rings',
        description: 'Elegant 18K gold ring with diamond accent',
        status: 'active',
        createdAt: '2025-10-01T10:30:00Z',
        variants: [
            { key: '1-1', size: 'S', color: 'Gold', stock: 5 },
            { key: '1-2', size: 'M', color: 'Gold', stock: 2 },
        ],
    },
    {
        key: '2',
        image: 'http://localhost:5000/uploads/products/il_1140xN.3873329088_g9o6-1757833873747.webp',
        title: 'Silver Necklace',
        price: 2200,
        category: 'Necklaces',
        description: 'Sterling silver necklace with pendant',
        status: 'inactive',
        createdAt: '2025-09-28T12:15:00Z',
        variants: [
            { key: '2-1', size: 'One Size', color: 'Silver', stock: 10 },
        ],
    },
];

const ActionsColumn = ({ record }) => {
    const menu = {
        items: [
            { key: 'edit', label: 'Edit', icon: <EditOutlined />, onClick: () => console.log('Edit', record.key) },
            { key: 'delete', label: 'Delete', icon: <DeleteOutlined />, onClick: () => console.log('Delete', record.key) },
        ],
    };

    return (
        <Dropdown menu={menu} trigger={['click']} placement="bottomRight">
            <Button
                type="text"
                icon={
                    <EllipsisOutlined
                        style={{ fontSize: 20, transform: 'rotate(90deg)' }}
                    />
                }
            />
        </Dropdown>
    );
};

const columns = [
    {
        title: 'Image',
        dataIndex: 'image',
        width: 80,
        render: (text, record) => <img src={record.image} alt={record.title} style={{ width: 50, height: 50, borderRadius: 4 }} />,
    },
    {
        title: 'Product Name',
        dataIndex: 'title',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        width: 200,
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        width: 120,
        render: (text) => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return new Date(text).toLocaleDateString('en-US', options);
        }
    },
    {
        title: 'Action',
        key: 'action',
        width: 120,
        render: (_, record) => <ActionsColumn record={record} />,
    },
];

const Products = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
            setSelectedRowKeys(selectedKeys);
        },
    };

    return (
        <>
            <AdminPageHeader />

            <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
                <Input
                    placeholder="Search Product"
                    className="!rounded !shadow-none !border !border-gray-300"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 250 }}
                    allowClear
                />

                <div className="flex items-center gap-3">
                    {/* Category Filter */}
                    {/* <Select
                        placeholder="Filter by Category"
                        style={{ width: 120 }}
                        className="!rounded !border-gray-300"
                        options={[
                            { value: 'all', label: 'All Categories' },
                            { value: 'rings', label: 'Rings' },
                            { value: 'necklaces', label: 'Necklaces' },
                            { value: 'bracelets', label: 'Bracelets' },
                        ]}
                    /> */}

                    {/* Status Filter */}
                    {/* <Select
                        placeholder="Status"
                        style={{ width: 90 }}
                        className="!rounded !border-gray-300"
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ]}
                    /> */}

                    {/* Stock Filter */}
                    {/* <Select
                        placeholder="Stock"
                        style={{ width: 130 }}
                        className="!rounded !border-gray-300"
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'in-stock', label: 'In Stock' },
                            { value: 'out-of-stock', label: 'Out of Stock' },
                            { value: 'low-stock', label: 'Low Stock (<10)' },
                        ]}
                    /> */}

                    {/* Sort Dropdown */}
                    {/* <Select
                        placeholder="Sort by"
                        style={{ width: 160 }}
                        className="!rounded !border-gray-300"
                        options={[
                            { value: 'newest', label: 'Newest First' },
                            { value: 'oldest', label: 'Oldest First' },
                            { value: 'price-asc', label: 'Price: Low to High' },
                            { value: 'price-desc', label: 'Price: High to Low' },
                        ]}
                    /> */}

                    {/* Add Product Button */}
                    <Button
                        className="!bg-[#ff6f61] hover:!bg-[#e55d51] !text-white border-none shadow-none font-medium rounded"
                        icon={<PlusOutlined />}
                    >
                        Add Product
                    </Button>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={products}
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 'calc(100vh - 383px)' }}
                expandable={{
                    expandedRowRender: (record) => (
                        <Table
                            columns={[
                                { title: 'Size', dataIndex: 'size', key: 'size' },
                                { title: 'Color', dataIndex: 'color', key: 'color' },
                                { title: 'Stock', dataIndex: 'stock', key: 'stock' },
                            ]}
                            dataSource={record.variants}
                            pagination={false}
                            rowKey="key"
                        />
                    ),
                    rowExpandable: (record) => record.variants && record.variants.length > 0,
                }}
            />
        </>
    )
}

export default Products;
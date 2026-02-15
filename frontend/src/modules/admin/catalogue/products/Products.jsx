 import { useState, useEffect } from "react";
import AdminPageHeader from "../../../../shared/components/admin/PageHeader";
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Table, notification } from "antd";
import { productService } from "../../../../services/productService";
import { Link } from "react-router-dom";
import { SOMETHING_WENT_WRONG } from "../../../../shared/constants";

const ActionsColumn = ({ record, onDelete }) => {
    const menu = {
        items: [
            { key: 'edit', label: 'Edit', icon: <EditOutlined />, onClick: () => console.log('Edit', record._id) },
            {
                key: 'delete',
                label: 'Delete',
                icon: <DeleteOutlined />,
                onClick: () => {
                    onDelete(record._id);
                },
            },
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



const Products = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [products, setProducts] = useState([]);
    const [messageApi, contextHolder] = notification.useNotification();

    useEffect(() => {
        getProducts();
    }, []);

    // Fetch Products
    const getProducts = async () => {
        setIsLoader(true);
        try {
            const response = await productService.getAllProducts();

            if (!response?.products) {
                setProducts([]);
                return;
            }

            const formattedProducts = response.products.map(product => {
                const sizes = product.sizes || [];
                const colors = product.colors || [];

                // create variants
                const variants = [];

                sizes.forEach(sizeObj => {
                    colors.forEach(color => {
                        variants.push({
                            size: sizeObj.size || "-",
                            color,
                            stockStatus: product.stockStatus || "-"
                        });
                    });
                });

                return {
                    ...product,
                    variants
                };
            });

            setProducts(formattedProducts);
        } catch (error) {
            messageApi.error({
                message: "Server Error",
                description: error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
                placement: "topRight",
            });
            setProducts([]);
        } finally {
            setIsLoader(false);
        }
    };

    // Delete Product
    const deleteProduct = async (product_id) => {
        try {
            setIsLoader(true);
            const response = await productService.deleteProduct(product_id);

            if (response?.status) {
                messageApi.success({
                    message: "Success",
                    description: response?.message ?? "Product deleted successfully!",
                    placement: "topRight",
                });
                getProducts();
            }

        } catch (error) {
            console.error(error);
            messageApi.error({
                message: "Server Error",
                description: error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
                placement: "topRight",
            });
        } finally {
            setIsLoader(false);
        }
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            width: 80,
            render: (text, record) => <img src={record.images?.[0] || "/assets/images/product/placeholder.png"} alt={record.title} style={{ width: 50, height: 50, borderRadius: 4 }} />,
        },
        {
            title: 'Product Name',
            dataIndex: 'title',
        },
        {
            title: 'Price',
            render: (_, record) => `₹${record.finalPrice}`,
        },
        {
            title: 'Category',
            render: (_, record) => record.category?.title || "—",
        },
        {
            title: 'Description',
            render: (_, record) => {
                const words = record.description?.split(' ') || [];
                return words.slice(0, 6).join(' ') + (words.length > 6 ? '...' : '');
            },
            width: 200,
        },
        {
            title: 'Status',
            dataIndex: 'stockStatus',
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
            render: (_, record) => <ActionsColumn record={record} onDelete={deleteProduct} />,
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
            setSelectedRowKeys(selectedKeys);
        },
    };

    return (
        <>
            {contextHolder}

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
                    <Link to="/admin/catalogue/add-product">
                        <Button
                            className="!bg-[#ff6f61] hover:!bg-[#e55d51] !text-white border-none shadow-none font-medium rounded"
                            icon={<PlusOutlined />}
                        >
                            Add Product
                        </Button>
                    </Link>
                </div>
            </div>

            <Table
                columns={columns}
                loading={isLoader}
                dataSource={products}
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                pagination={{ pageSize: 50 }}
                rowKey="_id"
                scroll={{ y: 'calc(100vh - 383px)' }}
                expandable={{
                    expandedRowRender: (record) => (
                        <Table
                            columns={[
                                { title: 'Size', dataIndex: 'size', key: 'size' },
                                { title: 'Color', dataIndex: 'color', key: 'color' },
                                { title: 'Stock Status', dataIndex: 'stockStatus', key: 'stockStatus' },
                            ]}
                            dataSource={record.variants}
                            pagination={false}
                            rowKey={(variant, index) => `${record._id}-${index}`}
                        />
                    ),
                    rowExpandable: (record) => record.variants && record.variants.length > 0,
                }}
            />
        </>
    )
}

export default Products;
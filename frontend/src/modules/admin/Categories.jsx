import { useEffect, useState } from "react";
import AdminPageHeader from "../../shared/components/admin/PageHeader"
import { Table, Dropdown, Menu, Button, Input } from 'antd';
import { EllipsisOutlined, EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { categoryService } from "../../services/categoryService";

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
        title: 'Category Name',
        dataIndex: 'title',
        width: 260,
    },
    {
        title: 'Description',
        dataIndex: 'description',
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

const Categories = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        getCategories();
    }, []);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
            setSelectedRowKeys(selectedKeys);
        },
    };

    // get category list
    const getCategories = async () => {
        try {
            const response = await categoryService.getCategories();
            const categoriesWithKeys = response.categories.map((category) => ({
                ...category,
                key: category._id,
            }));
            setCategories(categoriesWithKeys);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <AdminPageHeader />

            <div className="flex justify-between items-center mb-4">
                <Input
                    placeholder="Search Category"
                    className="!rounded !shadow-none !border !border-gray-300"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 250 }}
                    allowClear
                />

                <Button className="!bg-[#ff6f61] !text-white border-none shadow-none font-medium rounded" icon={<PlusOutlined />} onClick={() => console.log('Add Category')}>
                    Add Category
                </Button>

            </div>

            <Table
                columns={columns}
                dataSource={categories}
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 49 * 5 }}
            />
        </>
    )
}

export default Categories;
import { useEffect, useState } from "react";
import AdminPageHeader from "../../../shared/components/admin/PageHeader";
import { Table, Dropdown, Button, Input, notification } from "antd";
import { EllipsisOutlined, EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { categoryService } from "../../../services/categoryService";
import CategoryModel from "../../../shared/components/admin/modals/CategoryModel";
import { SOMETHING_WENT_WRONG } from "../../../shared/constants";

const ActionsColumn = ({ record, deleteCategory, editCategory }) => {
    const menu = {
        items: [
            {
                key: "edit",
                label: "Edit",
                icon: <EditOutlined />,
                onClick: () => editCategory(record),
            },
            {
                key: "delete",
                label: "Delete",
                icon: <DeleteOutlined />,
                onClick: () => deleteCategory(record.key),
            },
        ],
    };

    return (
        <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
            <Button
                type="text"
                icon={<EllipsisOutlined style={{ fontSize: 20, transform: "rotate(90deg)" }} />}
            />
        </Dropdown>
    );
};

const Categories = () => {
    const [messageApi, contextHolder] = notification.useNotification();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [category, setCategory] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    useEffect(() => {
        getCategories();
    }, []);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
    };

    // search category
    const searchCategory = (e) => {
        setSearchText(e.target.value);
        setPagination((prev) => ({
            ...prev,
            current: 1,
        }));
    };

    // Get category list
    const getCategories = async () => {
        try {
            setIsLoader(true);
            const response = await categoryService.getCategories();
            const categoriesWithKeys = response.categories.map((category) => ({
                ...category,
                key: category._id,
            }));
            setCategories(categoriesWithKeys);
        } catch (error) {
            messageApi.error({
                message: "Server Error",
                description: error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
                placement: "topRight",
            });
            console.error(error);
        } finally {
            setIsLoader(false);
        }
    };

    // Create category
    const createCategory = async (values, form) => {
        try {
            setIsLoader(true);
            const response = await categoryService.createCategory({
                title: values.title,
                description: values.description,
                image: values.image[0].originFileObj,
            });

            if (response?.status) {
                messageApi.success({
                    message: "Success",
                    description: response?.message ?? "Category created successfully!",
                    placement: "topRight",
                });
                setIsModalOpen(false);
                form.resetFields();
                getCategories();
            }
        } catch (error) {
            messageApi.error({
                message: "Server Error",
                description: error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
                placement: "topRight",
            });
            console.error(error);
        } finally {
            setIsLoader(false);
        }
    };

    // Update category
    const updateCategory = async (values, form) => {
        if (!category) return;

        try {
            setIsLoader(true);
            const response = await categoryService.updateCategoryById(category._id, {
                title: values.title,
                description: values.description,
                image: values.image?.[0]?.originFileObj,
            });

            if (response?.status) {
                messageApi.success({
                    message: "Success",
                    description: response?.message ?? "Category updated successfully!",
                    placement: "topRight",
                });
                setIsModalOpen(false);
                setCategory(null);
                form.resetFields();
                getCategories();
            }
        } catch (error) {
            messageApi.error({
                message: "Server Error",
                description: error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
                placement: "topRight",
            });
            console.error(error);
        } finally {
            setIsLoader(false);
        }
    };

    // Delete category by ID
    const deleteCategoryById = async (category_id) => {
        try {
            setIsLoader(true);
            const response = await categoryService.deleteCategoryById(category_id);
            if (response?.status) {
                messageApi.success({
                    message: "Deleted",
                    description: response?.message ?? "Category deleted successfully!",
                    placement: "topRight",
                });
                getCategories();
            }
        } catch (error) {
            messageApi.error({
                message: "Server Error",
                description: error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
                placement: "topRight",
            });
            console.error(error);
        } finally {
            setIsLoader(false);
        }
    };

    // Trigger editing
    const editCategory = (category) => {
        setCategory(category);
        setIsModalOpen(true);
    };

    // Filter categories based on search
    const filteredCategories = categories.filter((cat) =>
        cat.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            width: 80,
            render: (text, record) => (
                <img src={record.image} alt={record.title} style={{ width: 50, height: 50, borderRadius: 4 }} />
            ),
        },
        {
            title: "Category Name",
            dataIndex: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            render: (text) => {
                const options = { day: "2-digit", month: "short", year: "numeric" };
                return new Date(text).toLocaleDateString("en-US", options);
            },
        },
        {
            title: "Action",
            key: "action",
            width: 120,
            render: (_, record) => (
                <ActionsColumn
                    record={record}
                    deleteCategory={deleteCategoryById}
                    editCategory={editCategory}
                />
            ),
        },
    ];

    return (
        <>
            {contextHolder}

            <AdminPageHeader />

            <div className="flex justify-between items-center mb-4">
                <Input
                    placeholder="Search Category"
                    className="!rounded !shadow-none !border !border-gray-300"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={searchCategory}
                    style={{ width: 250 }}
                    allowClear
                />

                <Button
                    className="!bg-[#ff6f61] hover:!bg-[#e55d51] !text-white border-none shadow-none font-medium rounded"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setCategory(null);
                        setIsModalOpen(true);
                    }}
                >
                    Add Category
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={filteredCategories}
                loading={isLoader}
                rowSelection={{ type: "checkbox", ...rowSelection }}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: filteredCategories.length,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],
                }}
                onChange={(paginationData) => {
                    setPagination({
                        current: paginationData.current,
                        pageSize: paginationData.pageSize,
                    });
                }}
                scroll={{ y: 49 * 5 }}
            />

            <CategoryModel
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setCategory(null);
                }}
                onSubmit={category ? updateCategory : createCategory}
                loading={isLoader}
                initialValues={category}
            />
        </>
    );
};

export default Categories;

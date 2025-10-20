import { useState } from "react";
import AdminPageHeader from "../../../shared/components/admin/PageHeader"
import { Table, Dropdown, Button, Input } from 'antd';
import { EllipsisOutlined, EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CategoryModel from "../../../shared/components/admin/modals/CategoryModel";

const productReviews = [
    {
        id: 1,
        productId: "P1001",
        productName: "Gold-Plated Necklace",
        reviewerName: "Rohit Jangid",
        reviewerEmail: "rohitjangid17@gmail.com",
        rating: 5,
        comment: "Beautiful craftsmanship! The shine and detailing are perfect. Highly recommended!",
        reviewDate: "2025-10-10",
        status: "approved",
        image: "http://localhost:5000/uploads/categories/1753859628293-238335676.jpg"
    },
    {
        id: 2,
        productId: "P1002",
        productName: "Silver Anklet",
        reviewerName: "Priya Sharma",
        reviewerEmail: "priya.s@example.com",
        rating: 4,
        comment: "Looks elegant, but the size was slightly smaller than expected.",
        reviewDate: "2025-10-08",
        status: "approved",
        image: "http://localhost:5000/uploads/categories/1753859628293-238335676.jpg"
    },
    {
        id: 3,
        productId: "P1003",
        productName: "Diamond Ring",
        reviewerName: "Amit Verma",
        reviewerEmail: "amitv@example.com",
        rating: 5,
        comment: "Absolutely stunning! My fiancée loved it 💍",
        reviewDate: "2025-10-05",
        status: "approved",
        image: "http://localhost:5000/uploads/categories/1753859628293-238335676.jpg"
    },
    {
        id: 4,
        productId: "P1004",
        productName: "Pearl Earrings",
        reviewerName: "Sneha Patel",
        reviewerEmail: "sneha.patel@example.com",
        rating: 3,
        comment: "Good quality but packaging could be better.",
        reviewDate: "2025-09-30",
        status: "pending",
        image: "http://localhost:5000/uploads/categories/1753859628293-238335676.jpg"
    },
    {
        id: 5,
        productId: "P1005",
        productName: "Men’s Gold Chain",
        reviewerName: "Rahul Mehta",
        reviewerEmail: "rahul.m@example.com",
        rating: 4,
        comment: "Heavy and classy design. Worth the price!",
        reviewDate: "2025-09-25",
        status: "approved",
        image: "http://localhost:5000/uploads/categories/1753859628293-238335676.jpg"
    },
    {
        id: 6,
        productId: "P1002",
        productName: "Silver Anklet",
        reviewerName: "Komal Yadav",
        reviewerEmail: "komal.y@example.com",
        rating: 2,
        comment: "Not as shiny as shown in the photos.",
        reviewDate: "2025-09-22",
        status: "rejected",
        image: "http://localhost:5000/uploads/categories/1753859628293-238335676.jpg"
    },
    {
        id: 7,
        productId: "P1006",
        productName: "Emerald Bracelet",
        reviewerName: "Deepak Singh",
        reviewerEmail: "deepaks@example.com",
        rating: 5,
        comment: "Superb quality, came in elegant packaging. Looks premium.",
        reviewDate: "2025-09-20",
        status: "approved",
        image: "http://localhost:5000/uploads/categories/1753859628293-238335676.jpg"
    },
    {
        id: 8,
        productId: "P1007",
        productName: "Rose Gold Pendant",
        reviewerName: "Meena Rathi",
        reviewerEmail: "meena.rathi@example.com",
        rating: 4,
        comment: "Delicate and beautiful. Matches with any outfit!",
        reviewDate: "2025-09-15",
        status: "approved",
        image: "http://localhost:5000/uploads/categories/1753859628293-238335676.jpg"
    },
    {
        id: 9,
        productId: "P1001",
        productName: "Gold-Plated Necklace",
        reviewerName: "Karan Gupta",
        reviewerEmail: "karan.g@example.com",
        rating: 3,
        comment: "Nice design but the clasp feels a bit loose.",
        reviewDate: "2025-09-10",
        status: "pending",
        image: "http://localhost:5000/uploads/categories/1753859628293-238335676.jpg"
    },
    {
        id: 10,
        productId: "P1008",
        productName: "Silver Toe Rings",
        reviewerName: "Neha Soni",
        reviewerEmail: "nehasoni@example.com",
        rating: 5,
        comment: "Perfect fit and lightweight. Just loved them!",
        reviewDate: "2025-09-08",
        status: "approved",
        image: "http://localhost:5000/uploads/categories/1753859628293-238335676.jpg"
    }
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
        render: (text, record) => <img src={record.image} alt={record.title} className="w-12 h-12 rounded-md" />,
    },
    {
        title: 'Product Name',
        dataIndex: 'productName',
        width: 200,
        ellipsis: true
    },
    {
        title: 'Reviewer Name',
        dataIndex: 'reviewerName',
        width: 160,
    },
    {
        title: 'Reviewer Email',
        dataIndex: 'reviewerEmail',
        width: 220,
        ellipsis: true,
    },
    {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        width: 140,
        align: "center",
        render: (rating) => (
            <span>{"⭐".repeat(rating)}{"☆".repeat(5 - rating)}</span>
        ),
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
        key: "comment",
        width: 300,
        ellipsis: true,
    },
    // {
    //     title: 'Status',
    //     dataIndex: 'status',
    // },
    {
        title: 'Date',
        dataIndex: 'reviewDate',
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

const ProductReview = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
            setSelectedRowKeys(selectedKeys);
        },
    };

    return (
        <>
            <AdminPageHeader />

            <div className="flex justify-between items-center mb-4">
                <Input
                    placeholder="Search Product Review"
                    className="!rounded !shadow-none !border !border-gray-300"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 250 }}
                    allowClear
                />

                <Button className="!bg-[#ff6f61] hover:!bg-[#e55d51] !text-white border-none shadow-none font-medium rounded" icon={<PlusOutlined />}>
                    Add Review
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={productReviews}
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 'calc(100vh - 363px)' }}
            />
        </>
    )
}

export default ProductReview;
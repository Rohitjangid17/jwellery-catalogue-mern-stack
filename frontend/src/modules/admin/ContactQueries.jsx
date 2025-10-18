import { SearchOutlined } from "@ant-design/icons";
import AdminPageHeader from "../../shared/components/admin/PageHeader"
import { Table, Input } from 'antd';
import { useState } from "react";

const contactQueries = [
    {
        name: "Rohit Jangid",
        email: "rohitjangid17@gmail.com",
        phone_number: "+91 9876543210",
        subject: "Product Inquiry",
        message: "I would like to know more about your latest jewellery collection.",
        createdAt: "2025-10-10T09:30:00Z",
    },
    {
        name: "Neha Sharma",
        email: "neha.sharma@example.com",
        phone_number: "+91 9812345678",
        subject: "Collaboration Opportunity",
        message: "We are interested in partnering with your brand for an influencer campaign.",
        createdAt: "2025-10-09T14:15:00Z",
    },
    {
        name: "Amit Verma",
        email: "amit.verma@example.com",
        phone_number: "+91 9123456789",
        subject: "Order Issue",
        message: "I received the wrong product. Please help me with a replacement.",
        createdAt: "2025-10-08T18:45:00Z",
    },
    {
        name: "Priya Singh",
        email: "priya.singh@example.com",
        phone_number: "+91 9098765432",
        subject: "Custom Design Request",
        message: "Can you make a custom gold ring with my initials engraved?",
        createdAt: "2025-10-07T11:20:00Z",
    },
    {
        name: "Ankit Mehta",
        email: "ankit.mehta@example.com",
        phone_number: "+91 9988776655",
        subject: "Bulk Order Discount",
        message: "I want to place a bulk order. Do you offer discounts for that?",
        createdAt: "2025-10-06T16:00:00Z",
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 260,
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone_number',
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
    },
    {
        title: 'Message',
        dataIndex: 'message',
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        width: 120,
        render: (text) => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return new Date(text).toLocaleDateString('en-US', options);
        }
    }
];

const ContactQueries = () => {
    const [searchText, setSearchText] = useState("");

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
            </div>

            <Table
                columns={columns}
                dataSource={contactQueries}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 49 * 5 }}
            />
        </>
    )
}

export default ContactQueries;
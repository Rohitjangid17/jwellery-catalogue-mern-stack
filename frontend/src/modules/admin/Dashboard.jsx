import AdminPageHeader from "../../shared/components/admin/PageHeader";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Table } from "antd";
import { FiPackage, FiUsers, FiHeart, FiAlertTriangle } from "react-icons/fi";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const data = {
    labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    datasets: [
        {
            label: "Views",
            data: [120, 200, 150, 80, 90],
            backgroundColor: "rgba(255, 111, 97, 0.7)",
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Top Viewed Products",
        },
    },
};

const categoryData = {
    labels: ["Electronics", "Clothing", "Jewelry", "Home Decor", "Books"],
    datasets: [
        {
            label: "Category Distribution",
            data: [12, 19, 7, 14, 8],
            backgroundColor: [
                "rgba(255, 111, 97, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
            ],
            borderColor: [
                "rgba(255, 111, 97, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

const categoryOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "right",
        },
        title: {
            display: true,
            text: "Category Distribution",
        },
    },
};

const dataSource = [
    {
        key: "1",
        name: "Silver Necklace",
        category: "Jewelry",
        price: "$50",
        added: "2 mins ago",
    },
    {
        key: "2",
        name: "Smart Watch",
        category: "Electronics",
        price: "$120",
        added: "1 hour ago",
    },
    {
        key: "3",
        name: "Leather Wallet",
        category: "Accessories",
        price: "$35",
        added: "Yesterday",
    },
];

const columns = [
    {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Category",
        dataIndex: "category",
        key: "category",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Added",
        dataIndex: "added",
        key: "added",
    },
];

const Dashboard = () => {
    return (
        <>
            <AdminPageHeader />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
                    <FiPackage className="text-2xl text-[#ff6f61]" />
                    <div>
                        <p className="text-gray-500 text-sm">Total Products</p>
                        <p className="text-lg font-semibold">120</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
                    <FiUsers className="text-2xl text-[#4f46e5]" />
                    <div>
                        <p className="text-gray-500 text-sm">Customers</p>
                        <p className="text-lg font-semibold">85</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
                    <FiHeart className="text-2xl text-[#facc15]" />
                    <div>
                        <p className="text-gray-500 text-sm">Wishlist</p>
                        <p className="text-lg font-semibold">42</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
                    <FiAlertTriangle className="text-2xl text-[#ef4444]" />
                    <div>
                        <p className="text-gray-500 text-sm">Low Stock</p>
                        <p className="text-lg font-semibold">8</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-4 pb-3">
                <div className="col-span-12 md:col-span-8">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <Bar data={data} options={options} />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <Pie data={categoryData} options={categoryOptions} />
                            </div>
                        </div>

                        <div className="col-span-12">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <h2 className="text-md font-medium mb-3">Recently Added Products</h2>
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    pagination={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4 first:mt-0">
                        <ul className="list-disc p-4 divide-y divide-gray-200 max-h-64 overflow-y-auto pl-8">
                            <li className="py-2">
                                <p className="text-sm text-gray-700">New Product Added: 'Silver Necklace'</p>
                                <span className="text-xs text-gray-400">2 mins ago</span>
                            </li>
                            <li className="py-2">
                                <p className="text-sm text-gray-700">Category Updated: 'Electronics'</p>
                                <span className="text-xs text-gray-400">1 hour ago</span>
                            </li>
                            <li className="py-2">
                                <p className="text-sm text-gray-700">New Product Added: 'Smart Watch'</p>
                                <span className="text-xs text-gray-400">3 hours ago</span>
                            </li>
                            <li className="py-2">
                                <p className="text-sm text-gray-700">New Product Added: 'Smart Watch'</p>
                                <span className="text-xs text-gray-400">3 hours ago</span>
                            </li>
                            <li className="py-2">
                                <p className="text-sm text-gray-700">New Product Added: 'Smart Watch'</p>
                                <span className="text-xs text-gray-400">3 hours ago</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4 first:mt-0">
                        <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                            <li className="py-2">
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Rohit Jangid</span> reviewed{" "}
                                    <span className="font-medium">Silver Necklace</span>
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">10 mins ago</span>
                                    <span className="text-yellow-500">★★★★☆</span>
                                </div>
                                <p className="text-sm text-gray-600">Beautiful design, but packaging could improve.</p>
                            </li>

                            <li className="py-2">
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Anita Sharma</span> reviewed{" "}
                                    <span className="font-medium">Smart Watch</span>
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">1 hour ago</span>
                                    <span className="text-yellow-500">★★★★★</span>
                                </div>
                                <p className="text-sm text-gray-600">Excellent product! Highly recommend.</p>
                            </li>

                            <li className="py-2">
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Vikram Singh</span> reviewed{" "}
                                    <span className="font-medium">Leather Wallet</span>
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">Yesterday</span>
                                    <span className="text-yellow-500">★★★☆☆</span>
                                </div>
                                <p className="text-sm text-gray-600">Good quality but a bit expensive.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
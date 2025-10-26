import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Card, Divider, Empty, message, Space } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import CommonBanner from "../../shared/components/customer/banner/CommonBanner";

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            key: 1,
            name: "Elegant Gold Necklace",
            image: "/assets/images/category/product-5.jpg",
            price: 1299,
            quantity: 1,
        },
        {
            key: 2,
            name: "Silver Diamond Ring",
            image: "/assets/images/category/product-5.jpg",
            price: 899,
            quantity: 2,
        },
    ]);

    const handleQuantityChange = (key, type) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.key === key) {
                    const newQty =
                        type === "increase"
                            ? item.quantity + 1
                            : item.quantity > 1
                                ? item.quantity - 1
                                : 1;
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const handleRemove = (key) => {
        setCartItems((prev) => prev.filter((item) => item.key !== key));
        message.success("Item removed from cart");
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const columns = [
        {
            title: "Product",
            dataIndex: "name",
            key: "name",
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={record.image}
                        alt={record.name}
                        className="w-16 h-16 object-cover rounded-md border"
                    />
                    <span className="font-medium text-[#0d0d0d]">{record.name}</span>
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => `₹${price}`,
        },
        {
            title: "Quantity",
            key: "quantity",
            render: (_, record) => (
                <Space>
                    <Button
                        type="default"
                        icon={<MinusOutlined />}
                        size="small"
                        onClick={() => handleQuantityChange(record.key, "decrease")}
                        className="hover:bg-transparent focus:bg-transparent rounded-sm !shadow-none !text-black !border-gray-200"
                    />
                    <span className="px-2">{record.quantity}</span>
                    <Button
                        type="default"
                        icon={<PlusOutlined />}
                        size="small"
                        onClick={() => handleQuantityChange(record.key, "increase")}
                        className="hover:bg-transparent focus:bg-transparent rounded-sm !shadow-none !text-black !border-gray-200"
                    />
                </Space>

            ),
        },
        {
            title: "Total",
            key: "total",
            render: (_, record) => (
                <span className="font-semibold">
                    ₹{record.price * record.quantity}
                </span>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button
                    type="default"
                    size="small"
                    icon={<DeleteOutlined className="text-[#ff6f61]" />}
                    onClick={() => handleRemove(record.key)}
                    className="!border-none !bg-transparent !shadow-none"
                />
            ),
        },
    ];

    return (
        <>
            <CommonBanner title="Cart" />

            <div className="container mx-auto px-4 py-12">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <Empty
                            description={
                                <>
                                    <p className="text-lg font-semibold text-[#0d0d0d]">
                                        Your cart is empty
                                    </p>
                                    <Link
                                        to="/products"
                                        className="text-[#ff6f61] hover:underline"
                                    >
                                        Continue Shopping
                                    </Link>
                                </>
                            }
                        />
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Table */}
                        <div className="lg:col-span-2 bg-white p-4 rounded-lg border shadow-sm">
                            <Table
                                columns={columns}
                                dataSource={cartItems}
                                pagination={false}
                                className="cart-table"
                            />
                        </div>

                        {/* Summary Card */}
                        <Card
                            title="Order Summary"
                            className="shadow-sm h-fit"
                        >
                            <div className="flex justify-between mb-2 text-[#545454]">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="flex justify-between mb-2 text-[#545454]">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>

                            <Divider />

                            <div className="flex justify-between text-lg font-semibold mb-4">
                                <span>Total</span>
                                <span className="text-[#ff6f61]">
                                    ₹{subtotal}
                                </span>
                            </div>

                            <Button type="submit" size="middle" className="bg-black text-white text-center rounded-sm w-full">
                                Proceed to Checkout
                            </Button>

                            <Button
                                type="link"
                                block
                                className="mt-1 !text-[#0d0d0d]"
                                href="/products"
                            >
                                Continue Shopping
                            </Button>
                        </Card>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;

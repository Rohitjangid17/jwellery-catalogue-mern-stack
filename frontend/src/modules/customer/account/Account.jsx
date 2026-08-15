import { Menu, Card, Badge, Button } from "antd";
import {
    ShoppingOutlined,
    HeartOutlined,
    EnvironmentOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import CommonBanner from "../../../shared/components/customer/banner/CommonBanner";
import { Link, Outlet } from "react-router-dom";

const Account = () => {
    return (
        <>
            <CommonBanner title="My Account" />

            <section className="py-8 sm:py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-[30px]">
                        <div className="col-span-12 lg:col-span-3">
                            <Menu
                                mode="vertical"
                                defaultSelectedKeys={["dashboard"]}
                                className="account-menu border-none"
                                items={[
                                    {
                                        key: "dashboard",
                                        label: <Link to="/account/dashboard">Dashboard</Link>,
                                        icon: <ShoppingOutlined />,
                                    },
                                    {
                                        key: "orders",
                                        label: <Link to="/account/orders">My Orders</Link>,
                                        icon: <ShoppingOutlined />,
                                    },
                                    {
                                        key: "wishlist",
                                        label: <Link to="/account/wishlist">My Wishlist</Link>,
                                        icon: <HeartOutlined />,
                                    },
                                    {
                                        key: "address",
                                        label: <Link to="/account/address">Addresses</Link>,
                                        icon: <EnvironmentOutlined />,
                                    },
                                    {
                                        key: "logout",
                                        label: "Log Out",
                                        icon: <LogoutOutlined />,
                                    },
                                ]}
                            />
                        </div>
                        <div className="col-span-9">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Account;
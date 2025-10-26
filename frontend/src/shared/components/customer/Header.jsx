import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMenu, FiX, } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineStorefront } from "react-icons/md";
import { Drawer, Button, Form, Input, Badge } from "antd";

// nav links 
const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Shop", path: "/shop" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
];

// mobile bottom menu
const mobileMenuItems = [
    { label: "Home", path: "/home", icon: <AiOutlineHome /> },
    { label: "Account", path: "/account", icon: <FiUser /> },
    { label: "Shop", path: "/shop", icon: <MdOutlineStorefront /> },
    { label: "Wishlist", path: "/wishlist", icon: <FiHeart />, badge: 3 },
    { label: "Cart", path: "/cart", icon: <FiShoppingBag />, badge: 1 },
];

const CustomerHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userDrawerOpen, setUserDrawerOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const location = useLocation();
    const [form] = Form.useForm();

    const handleLogin = () => {
        console.log("handle login")
    }

    const handleRegister = () => {
        console.log("handle register")
    }

    return (
        <header className="relative z-50 px-4">
            <div className="container mx-auto">
                {/* Desktop Header */}
                <nav className="flex items-center justify-between py-6 bg-white">
                    {/* Left: Menu Links */}
                    <div className="grow">
                        <ul className="hidden md:flex gap-8">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className={`text-sm font-medium hover:text-[#ff6f61] transition ${location.pathname === link.path ? "text-[#ff6f61]" : ""}`}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="md:hidden">
                            <FiMenu size={24} className="cursor-pointer" onClick={() => setMenuOpen(true)} />
                        </div>
                    </div>

                    {/* Center: Logo */}
                    <div className="grow flex justify-center md:inline">
                        <img src="/assets/images/logo.svg" className="object-cover" alt="logo" />
                    </div>

                    {/* Right: Icons */}
                    <div className="grow">
                        <div className="flex gap-4 items-center justify-end">
                            <FiSearch size={20} />

                            <FiUser size={20} className="cursor-pointer hidden md:block" onClick={() => setUserDrawerOpen(true)} />

                            <div className="relative hidden md:block">
                                <Link to="/wishlist">
                                    <FiHeart size={20}
                                        className={`cursor-pointer transition ${location.pathname === "/wishlist"
                                            ? "text-[#ff6f61]"
                                            : "text-gray-800 hover:text-[#ff6f61]"
                                            }`}
                                    />
                                    <span className="absolute -top-2 -right-2 bg-[#ff6f61] text-white text-xs rounded-full px-1">
                                        3
                                    </span>
                                </Link>
                            </div>
                            <div className="relative">
                                <Link to="/cart">
                                    <FiShoppingBag
                                        size={20}
                                        className={`cursor-pointer transition ${location.pathname === "/cart"
                                            ? "text-[#ff6f61]"
                                            : "text-gray-800 hover:text-[#ff6f61]"
                                            }`}
                                    />
                                    <span className="absolute -top-2 -right-2 bg-[#ff6f61] text-white text-xs rounded-full px-1">
                                        1
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile Drawer menu left side */}
                <Drawer placement="left" onClose={() => setMenuOpen(false)} open={menuOpen}
                    width={320} closable={false}>
                    <div className="flex items-center justify-between">
                        <Button type="default" icon={<FiX size={24} />}
                            onClick={() => setMenuOpen(false)}
                            className="justify-start !border-none text-black hover:!text-[#ff6f61] !shadow-none"
                        />
                    </div>
                    <div>
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.label} className="border-b last:border-b-0 border-[#ebebeb] py-3">
                                    <Link to={link.path} className={`text-sm font-medium hover:text-[#ff6f61] transition ${location.pathname === link.path ? "text-[#ff6f61]" : ""}`}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-4 mt-4">
                            <Link to="/wishlist" onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-center gap-2 bg-[#ebebeb] rounded text-black font-semibold px-4 py-[10px] text-base hover:bg-black hover:text-white transition duration-300 ease-in-out"
                            >
                                <FiHeart size={16} />
                                Wishlist
                            </Link>
                            <Button type="default" size="large" icon={<FiUser size={16} />}
                                onClick={() => {
                                    setMenuOpen(false);
                                    setUserDrawerOpen(true);
                                }}
                                className="bg-[#ebebeb] !rounded !border-none !shadow-none hover:!bg-black text-black font-semibold hover:!text-white"
                            >Login</Button>
                        </div>

                        <div className="flex flex-col gap-y-3 mt-4">
                            <Link to="/contact" className="text-sm font-medium !text-black">Need Help?</Link>
                            <ul className="flex flex-col gap-y-3">
                                <li className="text-[#545454] text-sm">Address: 123 Yarran st, Punchbowl, NSW 2196, Australia</li>
                                <li className="text-[#545454] text-sm">Email: clientcare@ecom.com</li>
                                <li className="text-[#545454] text-sm">Phone: 1.888.838.3022</li>
                            </ul>
                        </div>
                    </div>
                </Drawer>

                {/* Mobile Bottom Nav */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow z-40">
                    <ul className="flex justify-around text-xs py-2">
                        {mobileMenuItems.map((item) => (
                            <li key={item.label} className="flex flex-col items-center relative">
                                <Link to={item.path} className="flex flex-col items-center">
                                    <div className="text-xl">{item.icon}</div>
                                    <span>{item.label}</span>
                                    {item.badge && (
                                        <span className="absolute top-0 right-2 text-[10px] bg-[#ff6f61] text-white rounded-full px-1">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* login & register model start here */}
                <Drawer placement="right" onClose={() => setUserDrawerOpen(false)} open={userDrawerOpen}
                    width={520} closable={false}>
                    <div className="flex items-center justify-between border-b pb-3">
                        <h2 className="text-xl font-semibold text-black">
                            {isLogin ? "Log in" : "Create an account"}
                        </h2>
                        <Button type="default" icon={<FiX size={24} />}
                            onClick={() => setUserDrawerOpen(false)}
                            className="!border-none text-black hover:!text-[#ff6f61]"
                        />
                    </div>
                    <div className="py-6">
                        {isLogin ? (
                            <Form form={form} layout="vertical" onFinish={handleLogin} className="flex flex-col gap-4" >
                                <Form.Item name="email" rules={[
                                    { required: true, message: "Please enter your email" },
                                    { type: "email", message: "Please enter a valid email" },
                                ]} className="mb-0" >
                                    <Input placeholder="Email*" size="large" className="rounded !border border-[#ebebeb] w-full px-4 py-2 text-base font-normal !shadow-none placeholder:text-[#6b7280] placeholder:text-sm hover:!border-[#000c] focus:!border-[#000c] [&>input]:!placeholder-[#6b7280] [&>input]:!text-sm" />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: "Please enter your password" }]}
                                    className="mb-0"
                                >
                                    <Input.Password
                                        placeholder="Password*"
                                        size="large"
                                        className="rounded !border border-[#ebebeb] w-full px-4 py-2 text-base font-normal !shadow-none placeholder:text-[#6b7280] placeholder:text-sm hover:!border-[#000c] focus:!border-[#000c] [&>input]:!placeholder-[#6b7280] [&>input]:!text-sm"
                                    />
                                </Form.Item>

                                <Form.Item className="mb-0">
                                    <Link
                                        to="/forgot-password"
                                        className="text-[#393939] underline text-sm hover:text-[#ff6f61] transition-colors duration-300 ease-in"
                                    >
                                        Forgot Password?
                                    </Link>
                                </Form.Item>

                                <div className="flex items-center gap-3">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        size="large"
                                        className="text-base font-medium !bg-black text-white rounded-full"
                                    >
                                        Sign in
                                    </Button>
                                    <Button
                                        type="default"
                                        size="large"
                                        block
                                        onClick={() => setIsLogin(false)} // switch to register form
                                        className="text-base font-medium !bg-white border border-black text-black hover:!bg-black hover:!text-white rounded-full transition duration-300 ease-in-out"
                                    >
                                        Create an account
                                    </Button>
                                </div>
                            </Form>
                        ) : (
                            <Form
                                layout="vertical"
                                onFinish={handleRegister}
                                className="flex flex-col gap-4"
                            >
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: "Please enter your name" }]}
                                    className="mb-0"
                                >
                                    <Input
                                        placeholder="Full Name*"
                                        size="large"
                                        className="rounded !border border-[#ebebeb] w-full px-4 py-2 text-base font-normal !shadow-none placeholder:text-[#6b7280] placeholder:text-sm hover:!border-[#000c] focus:!border-[#000c] [&>input]:!placeholder-[#6b7280]"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: "Please enter your email" },
                                        { type: "email", message: "Please enter a valid email" },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input
                                        placeholder="Email*"
                                        size="large"
                                        className="rounded !border border-[#ebebeb] w-full px-4 py-2 text-base font-normal !shadow-none placeholder:text-[#6b7280] placeholder:text-sm hover:!border-[#000c] focus:!border-[#000c] [&>input]:!placeholder-[#6b7280]"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: "Please enter your password" }]}
                                    className="mb-0"
                                >
                                    <Input.Password
                                        placeholder="Password*"
                                        size="large"
                                        className="rounded !border border-[#ebebeb] w-full px-4 py-2 text-base font-normal !shadow-none placeholder:text-[#6b7280] placeholder:text-sm hover:!border-[#000c] focus:!border-[#000c] [&>input]:!placeholder-[#6b7280]"
                                    />
                                </Form.Item>

                                <div className="flex items-center gap-3">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        size="large"
                                        className="text-base font-medium !bg-black text-white rounded-full"
                                    >
                                        Register
                                    </Button>
                                    <Button
                                        type="default"
                                        size="large"
                                        block
                                        onClick={() => setIsLogin(true)}
                                        className="text-base font-medium !bg-white border border-black text-black hover:!bg-black hover:!text-white rounded-full transition duration-300 ease-in-out"
                                    >
                                        Back to Login
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </div>
                </Drawer>
                {/* login & register model endF here */}
            </div >
        </header >
    );
};

export default CustomerHeader;

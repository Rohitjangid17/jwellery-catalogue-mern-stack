import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FiSearch,
    FiUser,
    FiHeart,
    FiShoppingBag,
    FiMenu,
    FiX,
} from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineStorefront } from "react-icons/md";

const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Shop", path: "/shop" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
];

const mobileMenuItems = [
    { label: "Home", path: "/home", icon: <AiOutlineHome /> },
    { label: "Account", path: "/account", icon: <FiUser /> },
    { label: "Shop", path: "/shop", icon: <MdOutlineStorefront /> },
    { label: "Wishlist", path: "/wishlist", icon: <FiHeart />, badge: 3 },
    { label: "Cart", path: "/cart", icon: <FiShoppingBag />, badge: 1 },
];

const CustomerHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="relative z-50 px-4">
            <div className="container mx-auto">
                {/* Desktop Header */}
                <nav className="hidden md:flex items-center justify-between py-6 bg-white">
                    {/* Left: Menu Links */}
                    <div className="grow">
                        <ul className="flex gap-8">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className={`text-sm font-medium hover:text-[#ff6f61] transition ${location.pathname === link.path ? "text-[#ff6f61]" : ""}`}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Center: Logo */}
                    <div className="grow">
                        <img src="/assets/images/logo.svg" className="object-cover" alt="logo" />
                    </div>

                    {/* Right: Icons */}
                    <div className="grow">
                        <div className="flex gap-4 items-center justify-end">
                            <FiSearch size={20} />
                            <FiUser size={20} />
                            <div className="relative">
                                <Link to="/wishlist">
                                    <FiHeart size={20}
                                        className={`cursor-pointer transition ${location.pathname === "/wishlist"
                                            ? "text-[#ff6f61]"
                                            : "text-gray-800 hover:text-[#ff6f61]"
                                            }`}
                                    />
                                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full px-1">
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
                                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full px-1">
                                        1
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile Top Bar */}
                <div className="md:hidden flex items-center justify-between py-3 border-b bg-white">
                    <FiMenu size={24} className="cursor-pointer" onClick={() => setMenuOpen(true)} />
                    <div className="text-xl font-semibold">Vineta</div>
                    <div className="flex gap-4 items-center">
                        <FiSearch size={20} />
                        <div className="relative">
                            <FiShoppingBag size={20} />
                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full px-1">
                                1
                            </span>
                        </div>
                    </div>
                </div>

                {/* Mobile Overlay */}
                {menuOpen && (
                    <div style={{ backgroundColor: "rgba(0,0,0,0.4)" }} className="fixed inset-0 z-50" onClick={() => setMenuOpen(false)} />
                )}

                {/* Mobile Drawer */}
                <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <span className="text-lg font-semibold">Menu</span>
                        <FiX size={24} className="cursor-pointer" onClick={() => setMenuOpen(false)} />
                    </div>
                    <ul className="p-4 space-y-4">
                        {mobileMenuItems.map((item) => (
                            <li key={item.label}>
                                <Link to={item.path} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-sm text-gray-800">
                                    {item.icon}
                                    {item.label}
                                    {item.badge && (
                                        <span className="ml-auto bg-rose-500 text-white rounded-full text-xs px-2">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Bottom Nav */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow z-40">
                    <ul className="flex justify-around text-xs py-2">
                        {mobileMenuItems.map((item) => (
                            <li key={item.label} className="flex flex-col items-center relative">
                                <Link to={item.path} className="flex flex-col items-center">
                                    <div className="text-xl">{item.icon}</div>
                                    <span>{item.label}</span>
                                    {item.badge && (
                                        <span className="absolute top-0 right-2 text-[10px] bg-rose-500 text-white rounded-full px-1">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default CustomerHeader;

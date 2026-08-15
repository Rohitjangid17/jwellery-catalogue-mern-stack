import { Menu } from 'antd';
import {
    DashboardOutlined,
    SettingOutlined,
    LogoutOutlined,
    MessageOutlined,
    ShoppingOutlined,
    TagsOutlined,
    StarOutlined,
    HeartOutlined,
    AppstoreOutlined,
    ShareAltOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { COMPANY_LOGO } from '../../constants';
import { authService } from '../../../services/authService';

const AdminSidebar = ({ onItemClick }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // logout user
    const logoutUser = () => {
        authService.logout();
        navigate("/auth/login");
    }

    const menuItems = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },

        {
            key: 'catalogue',
            icon: <AppstoreOutlined />,
            label: 'Catalogue',
            children: [
                { key: 'categories', icon: <TagsOutlined />, label: 'Categories' },
                { key: 'products', icon: <ShoppingOutlined />, label: 'Products' },
                { key: 'product-reviews', icon: <StarOutlined />, label: 'Product Reviews' },
                { key: 'wishlist', icon: <HeartOutlined />, label: 'Wishlist' },
            ],
        },

        { key: 'contact-queries', icon: <MessageOutlined />, label: 'Contacted Queries' },

        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
            children: [
                { key: 'general', icon: <AppstoreOutlined />, label: 'General Settings' },
                { key: 'whatsapp', icon: <WhatsAppOutlined />, label: 'WhatsApp Settings' },
                { key: 'social-media', icon: <ShareAltOutlined />, label: 'Social Media Settings' },
            ],
        },
    ];

    return (
        <div className="flex flex-col h-full bg-black text-white">
            <div className="flex justify-center items-center py-6 sticky top-0 bg-black z-20">
                <img src={COMPANY_LOGO} alt="Logo" className="invert w-[100px] h-[50px]" />
            </div>
            <div className="flex-1 overflow-y-auto">
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[location.pathname.split('/')[2] || 'dashboard']}
                    onClick={({ key, keyPath }) => {
                        const url = keyPath.length > 1 ? `/admin/${keyPath[1]}/${key}` : `/admin/${key}`;
                        navigate(url);
                        onItemClick && onItemClick();
                    }}
                    items={menuItems}
                    className="custom-ant-menu px-1.5"
                    style={{ background: '#000', borderRight: 0 }}
                />
            </div>

            <div className="p-4 sticky bottom-0 z-20 border-t border-zinc-400/20">
                <div
                    className="flex items-center justify-center gap-2 text-white hover:text-[#ff6f61] cursor-pointer transition-colors duration-300"
                    onClick={logoutUser}
                >
                    <LogoutOutlined className="text-sm" />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;

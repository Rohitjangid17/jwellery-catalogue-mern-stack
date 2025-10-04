import { Menu, Button } from 'antd';
import {
    DashboardOutlined,
    ShoppingCartOutlined,
    AppstoreOutlined,
    UserOutlined,
    SettingOutlined,
    BarChartOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = ({ onItemClick }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: 'orders', icon: <ShoppingCartOutlined />, label: 'Orders' },
        { key: 'products', icon: <AppstoreOutlined />, label: 'Products' },
        { key: 'users', icon: <UserOutlined />, label: 'Users' },
        { key: 'reports', icon: <BarChartOutlined />, label: 'Reports' },
        { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    ];

    return (
        <div className="flex flex-col h-full bg-black text-white">
            <div className="flex justify-center items-center py-4 sticky top-0 bg-black z-20">
                <img src="/assets/images/logo.svg" alt="Logo" className="invert" />
            </div>
            <div className="flex-1 overflow-y-auto">
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[location.pathname.split('/')[2] || 'dashboard']}
                    onClick={({ key }) => {
                        navigate(`/admin/${key}`);
                        onItemClick && onItemClick();
                    }}
                    items={menuItems}
                    className="custom-ant-menu"
                    style={{ background: '#000', borderRight: 0 }}
                />
            </div>

            <div className="p-4 sticky bottom-0 z-20 border-t border-zinc-400/20">
                <div
                    className="flex items-center justify-center gap-2 text-white hover:text-[#ff6f61] cursor-pointer transition-colors duration-300"
                    onClick={() => console.log('Logout clicked')}
                >
                    <LogoutOutlined className="text-sm" />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;

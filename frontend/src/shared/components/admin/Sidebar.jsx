import { Menu } from 'antd';
import {
    DashboardOutlined,
    ShoppingCartOutlined,
    AppstoreOutlined,
    UserOutlined,
    SettingOutlined,
    BarChartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: 'orders', icon: <ShoppingCartOutlined />, label: 'Orders' },
        { key: 'products', icon: <AppstoreOutlined />, label: 'Products' },
        { key: 'users', icon: <UserOutlined />, label: 'Users' },
        { key: 'reports', icon: <BarChartOutlined />, label: 'Reports' },
        { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    ];

    return (
        <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['dashboard']}
            onClick={({ key }) => navigate(`/admin/${key}`)}
            items={menuItems}
            style={{ paddingTop: 20 }}
        />
    );
};

export default AdminSidebar;

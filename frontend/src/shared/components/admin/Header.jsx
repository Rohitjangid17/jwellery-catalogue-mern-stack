import { Layout, Avatar, Dropdown, Menu, Badge } from 'antd';
import { UserOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AdminHeader = () => {
    const dropdownMenu = (
        <Menu>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="bg-white shadow-sm px-6 flex items-center justify-between sticky top-0 z-50">
            <div className="text-xl font-semibold">Admin Panel</div>
            <div className="flex items-center gap-6">
                <Badge count={5}>
                    <BellOutlined style={{ fontSize: 20 }} />
                </Badge>
                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    );
};

export default AdminHeader;

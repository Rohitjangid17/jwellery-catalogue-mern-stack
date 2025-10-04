import { Layout, Avatar, Dropdown, Menu, Badge } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    LogoutOutlined,
    MenuOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const AdminHeader = ({
    collapsed,
    setCollapsed,
    isMobile,
    drawerVisible,
    setDrawerVisible,
}) => {
    const dropdownMenu = (
        <Menu>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="bg-white shadow-sm px-6 flex items-center justify-between sticky top-0 z-50">
            {/* Left: Hamburger + Title */}
            <div className="flex items-center gap-4">
                <MenuOutlined
                    onClick={() =>
                        isMobile
                            ? setDrawerVisible(!drawerVisible)
                            : setCollapsed(!collapsed)
                    }
                    style={{ fontSize: 20, cursor: 'pointer' }}
                />
                <div className="text-xl font-semibold">Admin Panel</div>
            </div>

            {/* Right: Notifications + Avatar */}
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

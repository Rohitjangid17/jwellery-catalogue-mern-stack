import { Layout, Avatar, Dropdown, Badge } from 'antd';
import { UserOutlined, BellOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AdminHeader = ({ collapsed, setCollapsed, isMobile, drawerVisible, setDrawerVisible }) => {
    const dropdownMenuItems = [
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
        },
    ];

    return (
        <Header className="bg-white shadow-sm px-6 flex items-center justify-between sticky top-0 z-50">
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

            <div className="flex items-center gap-6">
                <Badge count={5}>
                    <BellOutlined style={{ fontSize: 20 }} />
                </Badge>

                <Dropdown menu={{ items: dropdownMenuItems }} placement="bottomRight">
                    <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
                </Dropdown>
            </div>
        </Header>
    );
};

export default AdminHeader;

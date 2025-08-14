import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import AdminSidebar from '../admin/Sidebar';
import AdminHeader from '../admin/Header';
import AdminFooter from '../admin/Footer';

const { Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    background: '#001529',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                }}
            >
                <div className="text-white text-center py-4 font-bold text-lg">
                    {collapsed ? 'A' : 'Admin'}
                </div>
                <AdminSidebar />
            </Sider>
            <Layout>
                <AdminHeader />
                <Content className="m-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm min-h-[80vh]">
                        <Outlet />
                    </div>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

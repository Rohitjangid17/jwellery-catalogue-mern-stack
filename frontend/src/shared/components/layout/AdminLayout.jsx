import { Layout, Drawer } from 'antd';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Grid } from 'antd';
import AdminSidebar from '../admin/Sidebar';
import AdminHeader from '../admin/Header';
import AdminFooter from '../admin/Footer';

const { useBreakpoint } = Grid;
const { Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const screens = useBreakpoint();

    const isMobile = !screens.md;

    return (
        <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
            {!isMobile ? (
                // ----- Desktop Sidebar -----
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    collapsedWidth={0}
                    width={260}
                    style={{
                        background: '#000',
                        position: 'sticky',
                        top: 0,
                        height: '100vh',
                        zIndex: 1000,
                    }}
                >
                    <AdminSidebar />
                </Sider>
            ) : (
                // ----- Mobile Sidebar Drawer -----
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    styles={{ body: { padding: 0, background: '#000', height: '100%' } }}
                >
                    <AdminSidebar />
                </Drawer>
            )}

            <Layout style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <AdminHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    isMobile={isMobile}
                    drawerVisible={drawerVisible}
                    setDrawerVisible={setDrawerVisible}
                />
                <Content style={{ overflowY: 'auto', height: 'calc(100vh - 64px - 68px)' }}>
                    <main className="bg-white px-6 pt-6 rounded-lg shadow-sm min-h-full">
                        <Outlet />
                    </main>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

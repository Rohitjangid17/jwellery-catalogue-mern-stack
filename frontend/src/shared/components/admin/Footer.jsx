import { Layout } from 'antd';

const { Footer } = Layout;

const AdminFooter = () => {
    return (
        <Footer className="text-center !px-4 !py-2">
            <p className="text-sm">
                © {new Date().getFullYear()} Vineta. All rights reserved.
            </p>
        </Footer>
    );
};

export default AdminFooter;

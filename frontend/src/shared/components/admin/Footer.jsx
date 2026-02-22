import { Layout } from 'antd';
import { SITE_NAME } from '../../constants';

const { Footer } = Layout;

const AdminFooter = () => {
    return (
        <Footer className="text-center !px-4 !py-2">
            <p className="text-sm">
                © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </p>
        </Footer>
    );
};

export default AdminFooter;

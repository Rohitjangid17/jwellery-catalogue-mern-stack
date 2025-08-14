import { Layout } from 'antd';

const { Footer } = Layout;

const AdminFooter = () => {
    return (
        <Footer className="text-center text-gray-400">
            © {new Date().getFullYear()} E-Commerce Admin Panel. Built with ❤️
        </Footer>
    );
};

export default AdminFooter;

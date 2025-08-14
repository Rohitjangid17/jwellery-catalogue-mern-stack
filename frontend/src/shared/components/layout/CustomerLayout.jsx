import { Outlet } from 'react-router-dom';
import CustomerFooter from '../customer/Footer';
import CustomerHeader from '../customer/Header';

const CustomerLayout = () => (
    <>
        <CustomerHeader />
        <main>
            <Outlet />
        </main>
        <CustomerFooter />
    </>
);

export default CustomerLayout;

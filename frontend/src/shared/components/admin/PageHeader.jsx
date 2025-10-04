import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const AdminPageHeader = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const currentPage = pathSnippets[pathSnippets.length - 1] || 'Dashboard';
    const pageTitle = capitalize(currentPage.replace('-', ' '));

    // Update document title
    useEffect(() => {
        document.title = `${pageTitle} | Vineta Admin Panel`;
    }, [pageTitle]);

    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return {
            key: url,
            title: (
                <Link to={url} className="hover:text-blue-600">
                    {capitalize(pathSnippets[index].replace('-', ' '))}
                </Link>
            ),
        };
    });

    return (
        <div className="mb-4">
            <h1 className="text-xl mb-1 font-semibold">{pageTitle}</h1>
            <Breadcrumb
                items={[
                    { title: <Link to="/admin/dashboard">Home</Link>, key: 'home' },
                    ...breadcrumbItems,
                ]}
                separator=">"
                className="text-sm text-[#545454] mb-2"
            />
        </div>
    );
};

export default AdminPageHeader;
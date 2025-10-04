import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <main className="min-h-screen bg-[#f6f6f6]">
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout;
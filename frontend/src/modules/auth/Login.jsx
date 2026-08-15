"use client";

import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { COMPANY_LOGO, SOMETHING_WENT_WRONG } from "../../shared/constants";
import { authService } from "../../services/authService";

const Login = () => {
    const [messageApi, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const [isLoader, setIsLoader] = useState(false);

    // login user
    const loginUser = async (payload) => {
        setIsLoader(true);

        try {
            const response = await authService.login(payload);
            if (response.success) {
                localStorage.setItem("admin_token", response?.user?.token);
                localStorage.setItem("admin_user", JSON.stringify({
                    name: response.user.name,
                    email: response.user.email,
                    role: response.user.role
                }));
                messageApi.success({
                    message: "Success",
                    description: "Admin login successfully!",
                    placement: "topRight",
                });
                navigate("/admin/dashboard", { replace: true });
            }
        } catch (error) {
            messageApi.error({
                message: "Server Error",
                description: error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
                placement: "topRight",
            });
            console.error(error);
        } finally {
            setIsLoader(false)
        }
    }

    return (
        <>
            {contextHolder}

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <img
                            src={COMPANY_LOGO}
                            alt="Logo"
                            width={100}
                            height={100}
                            className="object-cover w-[100px] h-[50px]"
                        />
                    </div>

                    <div className="mb-6 flex flex-col gap-2">
                        {/* Title */}
                        <h2 className="text-2xl font-semibold text-center text-gray-800">
                            Login
                        </h2>

                        {/* Paragraph */}
                        <p className="text-center text-gray-500 text-sm">
                            Welcome back! Please enter your credentials to access your account.
                        </p>
                    </div>

                    {/* Form */}
                    <Form
                        name="login"
                        onFinish={loginUser}
                        layout="vertical"
                        className="space-y-5"
                    >
                        {/* Email */}
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: "Please enter your email!" }]}
                            className="mb-5"
                        >
                            <Input
                                typeof="email"
                                prefix={<MailOutlined className="text-gray-400" />}
                                placeholder="Enter your email"
                                className="py-[6px] !rounded !border-gray-300 focus:!border-[#ff6f61] hover:!border-[#ff6f61] focus:!shadow-none !shadow-none"
                            />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Please enter your password!" }]}
                            className="mb-5"
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="Enter your password"
                                className="py-[6px] !rounded !border-gray-300 focus:!border-[#ff6f61] hover:!border-[#ff6f61] focus:!shadow-none !shadow-none"
                            />
                        </Form.Item>

                        {/* Submit */}
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                loading={isLoader}
                                className="w-full !bg-[#ff6f61] hover:!bg-[#e55d51] !text-white border-none shadow-none font-medium rounded"
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Extra Links */}
                    <div className="mt-4 text-center text-sm">
                        <Link href="#" className="text-[#ff6f61] hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;
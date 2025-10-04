"use client";

import { useState } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        console.log("Form Values:", values);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img
                        src="/assets/images/logo.svg"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="object-cover"
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
                    onFinish={onFinish}
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
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder="Enter your email"
                            className="rounded border-gray-300 focus:border-[#ff6f61] hover:border-[#ff6f61] focus:shadow-none"
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
                            className="rounded border-gray-300 focus:border-[#ff6f61] hover:border-[#ff6f61] focus:shadow-none"
                        />
                    </Form.Item>

                    {/* Submit */}
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            loading={loading}
                            className="w-full !bg-[#ff6f61] hover:!bg-[#e55d51] !text-white border-none shadow-none font-medium rounded"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                {/* Extra Links */}
                <div className="mt-4 text-center text-sm">
                    <a href="#" className="text-[#ff6f61] hover:underline">
                        Forgot Password?
                    </a>
                </div>
            </div>
        </div>
    );
}
export default Login;
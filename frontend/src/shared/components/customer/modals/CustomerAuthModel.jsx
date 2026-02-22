import { Drawer, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

const CustomerAuthModel = ({
    open,
    onClose,
    isLogin,
    setIsLogin,
    handleLogin,
    handleRegister,
    form,
    isLoader
}) => {

    return (
        <Drawer
            placement="right"
            onClose={onClose}
            open={open}
            width={520}
            closable={false}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-xl font-semibold text-black">
                    {isLogin ? "Log in" : "Create an account"}
                </h2>
                <Button
                    type="default"
                    icon={<FiX size={24} />}
                    onClick={onClose}
                    className="!border-none text-black hover:!text-[#ff6f61]"
                />
            </div>

            <div className="py-6">
                {isLogin ? (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleLogin}
                        className="flex flex-col gap-4"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email" },
                                { type: "email", message: "Please enter a valid email" },
                            ]}
                            className="mb-0"
                        >
                            <Input
                                placeholder="Email*"
                                size="large"
                                className="rounded !border border-[#ebebeb] px-4 py-2 !shadow-none"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Please enter your password" }]}
                            className="mb-0"
                        >
                            <Input.Password
                                placeholder="Password*"
                                size="large"
                                className="rounded !border border-[#ebebeb] px-4 py-2 !shadow-none"
                            />
                        </Form.Item>

                        <Form.Item className="mb-0">
                            <Link
                                to="/forgot-password"
                                className="text-[#393939] underline text-sm hover:text-[#ff6f61]"
                            >
                                Forgot Password?
                            </Link>
                        </Form.Item>

                        <div className="flex gap-3">
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                className="!bg-black text-white rounded-full"
                                loading={isLoader}
                            >
                                Sign in
                            </Button>

                            <Button
                                type="default"
                                size="large"
                                block
                                onClick={() => setIsLogin(false)}
                                className="border border-black text-black hover:!bg-black hover:!text-white rounded-full"
                            >
                                Create Account
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <Form
                        layout="vertical"
                        onFinish={handleRegister}
                        className="flex flex-col gap-4"
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: "Please enter your name" }]}
                            className="mb-0"
                        >
                            <Input
                                placeholder="Full Name*"
                                size="large"
                                className="rounded !border border-[#ebebeb] px-4 py-2 !shadow-none"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email" },
                                { type: "email", message: "Please enter a valid email" },
                            ]}
                            className="mb-0"
                        >
                            <Input
                                placeholder="Email*"
                                size="large"
                                className="rounded !border border-[#ebebeb] px-4 py-2 !shadow-none"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Please enter your password" }]}
                            className="mb-0"
                        >
                            <Input.Password
                                placeholder="Password*"
                                size="large"
                                className="rounded !border border-[#ebebeb] px-4 py-2 !shadow-none"
                            />
                        </Form.Item>

                        <div className="flex gap-3">
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                className="!bg-black text-white rounded-full"
                                loading={isLoader}  
                            >
                                Register
                            </Button>

                            <Button
                                type="default"
                                size="large"
                                block
                                onClick={() => setIsLogin(true)}
                                className="border border-black text-black hover:!bg-black hover:!text-white rounded-full"
                            >
                                Back to Login
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </Drawer>
    );
};

export default CustomerAuthModel;
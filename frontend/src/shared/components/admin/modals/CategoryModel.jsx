import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form, Upload } from "antd";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";

const CategoryModel = ({ open, onCancel, onSubmit, loading, initialValues }) => {
    const [form] = Form.useForm();

    // When initialValues changes (edit mode), set form fields
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                title: initialValues.title,
                description: initialValues.description,
                image: initialValues.image
                    ? [
                        {
                            uid: "-1",
                            name: "current_image",
                            status: "done",
                            url: initialValues.image,
                        },
                    ]
                    : [],
            });
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const handleFinish = (values) => {
        onSubmit(values, form);
    };

    return (
        <Modal
            open={open}
            footer={null}
            title={null}
            closable={false}
            confirmLoading={loading}
            centered
        >
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3 mb-4">
                <h2 className="text-lg font-semibold text-[#0d0d0d]">
                    {initialValues ? "Edit Category" : "Add Category"}
                </h2>

                <button onClick={onCancel} className="text-[#545454] hover:text-[#ff6f61] text-xl">
                    <FiX size={24} />
                </button>
            </div>

            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    label="Category Name"
                    name="title"
                    rules={[{ required: true, message: "Category name is required" }]}
                >
                    <Input placeholder="Enter category name" className="py-[6px] hover:!border-[#ff6f61]" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Category description is required" }]}
                >
                    <Input.TextArea rows={3} placeholder="Enter description" className="py-[6px] hover:!border-[#ff6f61]" />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: !initialValues, message: "Category image is required" }]} // image required only if new
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) return e;
                        return e?.fileList;
                    }}
                >
                    <Upload accept="image/*" beforeUpload={() => false} maxCount={1} listType="picture">
                        <Button className="hover:!border-[#ff6f61] hover:!text-[#ff6f61] !outline-none !shadow-none" icon={<UploadOutlined />}>
                            Upload Image
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>

            <div className="flex justify-end gap-3 border-t border-[#ebebeb] pt-4 mt-6">
                <Button onClick={onCancel} className="hover:!border-[#ff6f61] hover:!text-[#ff6f61] !outline-none !shadow-none">
                    Cancel
                </Button>

                <Button
                    type="primary"
                    loading={loading}
                    className="!bg-[#ff6f61] hover:!bg-[#e85a4f] !outline-none !shadow-none"
                    onClick={() => form.submit()}
                >
                    Save Category
                </Button>
            </div>
        </Modal>
    );
};

export default CategoryModel;

import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form, Upload } from 'antd';

const CategoryModel = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title="Add Category"
            open={open}
            onCancel={onCancel}
            onOk={onOk}
            okText="Save Category"
            cancelText="Cancel"
            centered
            styles={{
                body: {
                    maxHeight: '60vh',
                    overflowY: 'auto',
                    paddingRight: '16px',
                },
                content: {
                    borderRadius: 12,
                    padding: '12px 16px',
                    width: '100%',
                    maxWidth: 600,
                },
            }}
            className="responsive-modal"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Category Name"
                    name="title"
                    rules={[{ required: true, message: "Please enter category name" }]}
                >
                    <Input placeholder="Enter category name" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <Input.TextArea rows={3} placeholder="Enter description" />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) return e;
                        return e?.fileList;
                    }}
                >
                    <Upload beforeUpload={() => false} maxCount={1} listType="picture">
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CategoryModel
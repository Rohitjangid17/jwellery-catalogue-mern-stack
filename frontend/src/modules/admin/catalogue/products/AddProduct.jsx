import { Card, Collapse, Form, Input, notification, Select } from "antd";
import AdminPageHeader from "../../../../shared/components/admin/PageHeader";
import { categoryService } from "../../../../services/categoryService";
import { SOMETHING_WENT_WRONG } from "../../../../shared/constants";
import { useEffect, useState } from "react";

const { Panel } = Collapse;

const AddProduct = () => {
  const [messageApi, contextHolder] = notification.useNotification();

  const [categories, setCategories] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = async () => {
    try {
      setIsLoader(true);

      const response = await categoryService.getCategories();
      console.log("response ", response);

      if (response?.status) {
        setCategories(response.categories);
      }
    } catch (error) {
      messageApi.error({
        message: "Category API Server Error",
        description: error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
        placement: "topRight",
      });
      console.error(error);
    } finally {
      setIsLoader(false);
    }
  }

  return (
    <>
      {contextHolder}

      <AdminPageHeader />

      <Form layout="vertical">
        <Collapse
          accordion
          ghost
          expandIconPosition="end"
          defaultActiveKey={["basic"]}
          className="product-collapse"
        >
          <Panel header="Basic Information" key="basic">
            <div className="grid grid-cols-4 gap-4">
              <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: "Product name is required" }]}
              >
                <Input placeholder="Enter product name" size="middle" className="hover:!border-black" />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Category is required" }]}
              >
                <Select
                  placeholder="Select category"
                  size="middle"
                  className="hover:!border-black !shadow-none"
                  loading={isLoader}
                  disabled={isLoader}
                >
                  <Select.Option value="" selected={true}>Select Category</Select.Option>
                  {categories?.map(category => (
                    <Select.Option value={category._id}>{category.title}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Panel>

          <Panel header="Pricing" key="pricing">
            <Card>
              {/* Pricing Fields */}
            </Card>
          </Panel>

          <Panel header="Images" key="images">
            <Card>
              {/* Image Upload */}
            </Card>
          </Panel>

          <Panel header="Sizes" key="sizes">
            <Card>
              {/* Sizes Form.List */}
            </Card>
          </Panel>

          <Panel header="Gemstones" key="gemstones">
            <Card>
              {/* Gemstones Form.List */}
            </Card>
          </Panel>

          <Panel header="Materials" key="materials">
            <Card>
              {/* Materials Form.List */}
            </Card>
          </Panel>

          <Panel header="Dimensions" key="dimensions">
            <Card>
              {/* Dimensions Inputs */}
            </Card>
          </Panel>
        </Collapse>
      </Form>
    </>
  )
}

export default AddProduct
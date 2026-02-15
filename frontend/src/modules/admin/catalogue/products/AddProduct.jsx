import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  Card,
  Space,
  notification,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AdminPageHeader from "../../../../shared/components/admin/PageHeader";
import { categoryService } from "../../../../services/categoryService";
import { productService } from "../../../../services/productService";
import { SOMETHING_WENT_WRONG } from "../../../../shared/constants";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const AddProduct = () => {
  const [productForm] = Form.useForm();
  const [messageApi, contextHolder] = notification.useNotification();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFileList, setImageFileList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  // get category list
  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getCategories();
      if (response?.status) {
        setCategories(response.categories);
      }
    } catch (error) {
      messageApi.error({
        message: "Category Error",
        description:
          error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
      });
    } finally {
      setLoading(false);
    }
  };

  // create product
  const createProduct = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();

      /* ================= BASIC ================= */

      formData.append("title", values.title);
      formData.append("sku", values.sku);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("basePrice", values.basePrice || 0);
      formData.append("weightInGrams", values.weightInGrams || 0);
      formData.append("metalType", values.metalType);

      /* ================= DISCOUNT ================= */

      formData.append("discount.type", values?.discount?.type || "flat");
      formData.append("discount.amount", values?.discount?.amount || 0);

      /* ================= DIMENSIONS ================= */

      formData.append(
        "dimensions.lengthMm",
        values?.dimensions?.lengthMm || 0
      );
      formData.append(
        "dimensions.widthMm",
        values?.dimensions?.widthMm || 0
      );
      formData.append(
        "dimensions.heightMm",
        values?.dimensions?.heightMm || 0
      );
      formData.append(
        "dimensions.diameterMm",
        values?.dimensions?.diameterMm || 0
      );

      /* ================= COLORS ================= */

      values.colors?.forEach((color, index) => {
        formData.append(`colors[${index}]`, color);
      });

      /* ================= TAGS ================= */

      values.tags?.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });

      /* ================= MATERIALS ================= */

      values.materials?.forEach((item, index) => {
        formData.append(`materials[${index}].type`, item.type);
        formData.append(`materials[${index}].name`, item.name);
        formData.append(
          `materials[${index}].percentage`,
          item.percentage
        );
      });

      /* ================= GEMSTONES ================= */

      values.gemstones?.forEach((item, index) => {
        formData.append(`gemstones[${index}].name`, item.name);
        formData.append(
          `gemstones[${index}].caratWeight`,
          item.caratWeight
        );
        formData.append(
          `gemstones[${index}].clarity`,
          item.clarity
        );
      });

      /* ================= SIZES ================= */

      values.sizes?.forEach((item, index) => {
        formData.append(`sizes[${index}].size`, item.size);
        formData.append(
          `sizes[${index}].stockQuantity`,
          item.stockQuantity || 0
        );
        formData.append(
          `sizes[${index}].priceModifier`,
          item.priceModifier || 0
        );
      });

      imageFileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      const response = await productService.createProduct(formData);

      if (response.status) {
        messageApi.success({
          message: "Success",
          description: response?.message ?? "Product created successfully!",
          placement: "topRight",
        });
        productForm.resetFields();
        navigate("/admin/catalogue/products");
        setImageFileList([]);
      }
    } catch (error) {
      messageApi.error({
        message: "Product Error",
        description:
          error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
      });
      setImageFileList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <AdminPageHeader title="Add Product" />

      <Form
        form={productForm}
        layout="vertical"
        onFinish={createProduct}
      >
        <Space direction="vertical" size={20} className="w-full">

          {/* BASIC INFO */}
          <Card title="Basic Information">
            <div className="grid md:grid-cols-3 gap-4">
              <Form.Item name="title" label="Product Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Select loading={loading}>
                  {categories.map((cat) => (
                    <Select.Option key={cat._id} value={cat._id}>
                      {cat.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <TextArea rows={4} />
            </Form.Item>
          </Card>

          {/* PRICING */}
          <Card title="Pricing">
            <div className="grid md:grid-cols-4 gap-4">
              <Form.Item name="basePrice" label="Base Price" rules={[{ required: true }]}>
                <InputNumber className="w-full" />
              </Form.Item>

              <Form.Item name={["discount", "type"]} label="Discount Type">
                <Select>
                  <Select.Option value="flat">Flat</Select.Option>
                  <Select.Option value="percent">Percent</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name={["discount", "amount"]} label="Discount Amount">
                <InputNumber className="w-full" />
              </Form.Item>

              <Form.Item name="weightInGrams" label="Weight (g)" rules={[{ required: true }]}>
                <InputNumber className="w-full" />
              </Form.Item>
            </div>
          </Card>

          {/* METAL & TAGS */}
          <Card title="Metal & Classification">
            <div className="grid md:grid-cols-3 gap-4">
              <Form.Item name="metalType" label="Metal Type" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="Gold">Gold</Select.Option>
                  <Select.Option value="Silver">Silver</Select.Option>
                  <Select.Option value="Platinum">Platinum</Select.Option>
                  <Select.Option value="Rose Gold">Rose Gold</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="colors" label="Colors" rules={[{ required: true }]}>
                <Select mode="tags" />
              </Form.Item>

              <Form.Item name="tags" label="Tags" rules={[{ required: true }]}>
                <Select mode="tags" />
              </Form.Item>
            </div>
          </Card>

          {/* MATERIALS */}
          <Card title="Materials">
            <Form.List name="materials">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <Space key={key} align="baseline">
                      <Form.Item name={[name, "type"]} rules={[{ required: true }]}>
                        <Input placeholder="Type" />
                      </Form.Item>

                      <Form.Item name={[name, "name"]} rules={[{ required: true }]}>
                        <Input placeholder="Name" />
                      </Form.Item>

                      <Form.Item name={[name, "percentage"]} rules={[{ required: true }]}>
                        <InputNumber placeholder="%" />
                      </Form.Item>

                      <DeleteOutlined onClick={() => remove(name)} style={{ color: "red" }} />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>
                    Add Material
                  </Button>
                </>
              )}
            </Form.List>
          </Card>

          {/* GEMSTONES */}
          <Card title="Gemstones">
            <Form.List name="gemstones">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <Space key={key} align="baseline">
                      <Form.Item name={[name, "name"]} rules={[{ required: true }]}>
                        <Input placeholder="Name" />
                      </Form.Item>

                      <Form.Item name={[name, "caratWeight"]} rules={[{ required: true }]}>
                        <InputNumber placeholder="Carat" />
                      </Form.Item>

                      <Form.Item name={[name, "clarity"]} rules={[{ required: true }]}>
                        <Input placeholder="Clarity" />
                      </Form.Item>

                      <DeleteOutlined onClick={() => remove(name)} style={{ color: "red" }} />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>
                    Add Gemstone
                  </Button>
                </>
              )}
            </Form.List>
          </Card>

          {/* IMAGES */}
          <Card title="Images">
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              multiple
              fileList={imageFileList}
              onChange={({ fileList }) => setImageFileList(fileList)}
            >
              <PlusOutlined />
            </Upload>
          </Card>

          <div className="flex justify-end pb-6">
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Product
            </Button>
          </div>

        </Space>
      </Form>
    </>
  );
};

export default AddProduct;

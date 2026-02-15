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
              <Form.Item name="title" label="Product Title" className="!mb-4" rules={[{ required: true }]}>
                <Input className="py-[6px] hover:!border-[#ff6f61]" />
              </Form.Item>

              <Form.Item name="sku" label="SKU" className="!mb-4" rules={[{ required: true }]}>
                <Input className="py-[6px] hover:!border-[#ff6f61]" />
              </Form.Item>

              <Form.Item name="category" label="Category" className="!mb-4" rules={[{ required: true }]}>
                <Select loading={loading} className="select-dropdown">
                  {categories.map((cat) => (
                    <Select.Option key={cat._id} value={cat._id}>
                      {cat.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Form.Item name="description" label="Description" className="!mb-3" rules={[{ required: true }]}>
              <TextArea rows={4} className="py-[6px] hover:!border-[#ff6f61]" />
            </Form.Item>
          </Card>

          {/* PRICING */}
          <Card title="Pricing">
            <div className="grid md:grid-cols-3 gap-x-4">
              <Form.Item name="basePrice" label="Base Price" className="!mb-3" rules={[{ required: true }]}>
                <Input className="py-[6px] hover:!border-[#ff6f61]" />
              </Form.Item>

              <Form.Item name={["discount", "type"]} className="!mb-3" label="Discount Type">
                <Select className="select-dropdown">
                  <Select.Option value="flat">Flat</Select.Option>
                  <Select.Option value="percent">Percent</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name={["discount", "amount"]} className="!mb-3" label="Discount Amount">
                <Input className="py-[6px] hover:!border-[#ff6f61]" />
              </Form.Item>

              <Form.Item name="weightInGrams" label="Weight (g)" className="!mb-3" rules={[{ required: true }]}>
                <Input className="py-[6px] hover:!border-[#ff6f61]" />
              </Form.Item>
            </div>
          </Card>

          {/* METAL & TAGS */}
          <Card title="Metal & Classification">
            <div className="grid md:grid-cols-3 gap-x-4">
              <Form.Item name="metalType" label="Metal Type" className="!mb-3" rules={[{ required: true }]}>
                <Select className="select-dropdown">
                  <Select.Option value="Gold">Gold</Select.Option>
                  <Select.Option value="Silver">Silver</Select.Option>
                  <Select.Option value="Platinum">Platinum</Select.Option>
                  <Select.Option value="Rose Gold">Rose Gold</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="colors" label="Colors" className="!mb-3" rules={[{ required: true }]}>
                <Select mode="tags" className="select-dropdown" />
              </Form.Item>

              <Form.Item name="tags" label="Tags" className="!mb-3" rules={[{ required: true }]}>
                <Select mode="tags" className="select-dropdown" />
              </Form.Item>
            </div>
          </Card>

          {/* MATERIALS */}
          <Card title="Materials">
            <Form.List name="materials">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <div className="flex items-start gap-4" key={key}>
                      <div className="grid md:grid-cols-3 gap-4 w-full">
                        <Form.Item name={[name, "type"]} className="!mb-3" rules={[{ required: true }]}>
                          <Input placeholder="Type" className="py-[6px] hover:!border-[#ff6f61]" />
                        </Form.Item>

                        <Form.Item name={[name, "name"]} className="!mb-3" rules={[{ required: true }]}>
                          <Input placeholder="Name" className="py-[6px] hover:!border-[#ff6f61]" />
                        </Form.Item>

                        <Form.Item name={[name, "percentage"]} className="!mb-3" rules={[{ required: true }]}>
                          <Input placeholder="%" className="py-[6px] hover:!border-[#ff6f61]" />
                        </Form.Item>
                      </div>

                      <Button
                        danger
                        type="default"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                    </div>
                  ))}
                  <Button type="dashed" className={`${fields.length ? 'mt-3' : 'mt-0'}`} onClick={() => add()} block>
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
                    <div className="flex items-start gap-4" key={key}>
                      <div className="grid md:grid-cols-3 gap-4 w-full">
                        <Form.Item name={[name, "name"]} className="!mb-3" rules={[{ required: true }]}>
                          <Input placeholder="Name" className="py-[6px] hover:!border-[#ff6f61]" />
                        </Form.Item>

                        <Form.Item name={[name, "caratWeight"]} className="!mb-3" rules={[{ required: true }]}>
                          <Input placeholder="Carat" className="py-[6px] hover:!border-[#ff6f61]" />
                        </Form.Item>

                        <Form.Item name={[name, "clarity"]} className="!mb-3" rules={[{ required: true }]}>
                          <Input placeholder="Clarity" className="py-[6px] hover:!border-[#ff6f61]" />
                        </Form.Item>
                      </div>
                      <Button
                        danger
                        type="default"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                    </div>
                  ))}
                  <Button type="dashed" className={`${fields.length ? 'mt-3' : 'mt-0'}`} onClick={() => add()} block>
                    Add Gemstone
                  </Button>
                </>
              )}
            </Form.List>
          </Card>

          {/* SIZES */}
          <Card title="Sizes & Stock">
            <Form.List name="sizes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <div className="flex items-start gap-4" key={key}>
                      <div className="grid md:grid-cols-3 gap-4 w-full">
                        <Form.Item
                          name={[name, "size"]} className="!mb-3"
                          rules={[{ required: true, message: "Size required" }]}
                        >
                          <Input placeholder="Size (e.g. 6, 7, M, L)" className="py-[6px] hover:!border-[#ff6f61]" />
                        </Form.Item>

                        <Form.Item
                          name={[name, "stockQuantity"]} className="!mb-3"
                          rules={[{ required: true, message: "Stock required" }]}
                        >
                          <Input placeholder="Stock Qty" min={0} className="py-[6px] hover:!border-[#ff6f61]" />
                        </Form.Item>

                        <Form.Item
                          name={[name, "priceModifier"]} className="!mb-3"
                        >
                          <Input placeholder="Price Modifier (+/-)" className="py-[6px] hover:!border-[#ff6f61]" />
                        </Form.Item>
                      </div>

                      <Button
                        danger
                        type="default"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                    </div>
                  ))}

                  <Button
                    type="dashed"
                    className={`${fields.length ? 'mt-3' : 'mt-0'}`}
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Size
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

          {/* FOOTER */}
          <div className="flex gap-3 justify-end pb-6">
            <Button
              type="default"
              htmlType="button"
              onClick={() => navigate("/admin/catalogue/products")}
              className="hover:!text-black hover:!border-black shadow-none font-medium rounded"
            >
              Back to Products
            </Button>

            <Button className="!bg-[#ff6f61] hover:!bg-[#e55d51] !text-white border-none shadow-none font-medium rounded" htmlType="submit" loading={loading}>
              Save Product
            </Button>
          </div>
        </Space>
      </Form >
    </>
  );
};

export default AddProduct;

import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Option } = Select;

const CustomSelect = ({ options = [], value, onChange, placeholder = "Sort By (Default)", allowClear = false }) => {
    return (
        <Select value={value} onChange={onChange} placeholder={placeholder} allowClear={allowClear} suffixIcon={<DownOutlined style={{ fontSize: 16, color: "#111" }} />}
            className="custom-select max-w-52" popupClassName="custom-select-dropdown" bordered={false}>
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default CustomSelect;

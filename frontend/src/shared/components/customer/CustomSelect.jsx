import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";

const CustomSelect = ({
    options = [],
    value,
    onChange,
    placeholder = "Sort By (Default)",
    allowClear = false,
}) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            allowClear={allowClear}
            suffixIcon={<DownOutlined style={{ fontSize: 16, color: "#111" }} />}
            variant="borderless"
            classNames={{
                root: "custom-select max-w-52",
                popup: {
                    root: "custom-select-dropdown",
                },
            }}
        >
            {options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                    {option.label}
                </Select.Option>
            ))}
        </Select>
    );
};

export default CustomSelect;

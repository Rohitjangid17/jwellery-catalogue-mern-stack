import { Checkbox } from "antd";

const CheckboxGroup = ({ options }) => {
    return (
        <div className="space-y-1 text-sm">
            {options.map(({ label, count }, i) => (
                <div key={i}>
                    <Checkbox>{label} ({count})</Checkbox>
                </div>
            ))}
        </div>
    );
};

export default CheckboxGroup;

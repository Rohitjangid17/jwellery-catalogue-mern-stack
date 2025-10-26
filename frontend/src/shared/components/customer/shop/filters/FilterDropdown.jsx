import { Collapse } from "antd";

const FilterDropdown = ({ title, children, defaultActive = false }) => {
    const items = [
        {
            key: title,
            label: <span className="text-xl font-semibold">{title}</span>,
            children: children,
        },
    ];

    return (
        <Collapse
            expandIconPosition="end"
            ghost
            defaultActiveKey={defaultActive ? [title] : []}
            className="custom-collapse"
            items={items}
        />
    );
};

export default FilterDropdown;

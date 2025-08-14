import { Collapse } from "antd";

const { Panel } = Collapse;

const FilterDropdown = ({ title, children, defaultActive = false }) => {
    return (
        <Collapse
            expandIconPosition="end"
            ghost
            defaultActiveKey={defaultActive ? [title] : []}
            className="custom-collapse"
        >
            <Panel header={<span className="text-xl font-semibold">{title}</span>} key={title}>
                {children}
            </Panel>
        </Collapse>
    );
};

export default FilterDropdown;

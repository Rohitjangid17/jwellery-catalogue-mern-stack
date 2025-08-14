import { Button } from "antd";

const SizeSelector = ({ sizes }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {sizes.map((size, idx) => (
                <Button
                    key={idx}
                    className="border border-gray-300 text-xs px-2 py-1"
                    size="small"
                >
                    {size}
                </Button>
            ))}
        </div>
    );
};

export default SizeSelector;

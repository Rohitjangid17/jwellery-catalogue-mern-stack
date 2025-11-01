import { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import CategoryList from "./CategoryList";
import CheckboxGroup from "./CheckboxGroup";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import { Slider } from "antd";

const SidebarFilters = () => {
    const [priceRange, setPriceRange] = useState([20, 1200]);

    const colors = ["#e2d2ab", "#dcc8ba", "#d6d6d6"];
    const sizes = ["XS", "S", "M", "L", "XL"];

    return (
        <div className="space-y-4 sticky top-0">
            <div className="border-b border-[#ebebeb] pb-4">
                <FilterDropdown title="Categories" defaultActive>
                    <CategoryList />
                </FilterDropdown>
            </div>

            <div className="border-b border-[#ebebeb] pb-4">
                <FilterDropdown title="Availability" defaultActive>
                    <CheckboxGroup
                        options={[
                            { label: "In Stock", count: 20 },
                            { label: "Out of Stock", count: 3 },
                        ]}
                    />
                </FilterDropdown>
            </div>

            <div className="border-b border-[#ebebeb] pb-4">
                <FilterDropdown title="Price" defaultActive>
                    <Slider
                        range
                        min={0}
                        max={1200}
                        value={priceRange}
                        onChange={(value) => setPriceRange(value)}
                        trackStyle={{ backgroundColor: "#ff6f61" }}
                        handleStyle={{ borderColor: "#ff6f61" }}
                    />
                    <div className="flex items-center gap-1">
                        <span className="!font-semibold text-black text-sm">Price:</span> <span className="text-sm text-[#ff6f61]">₹{priceRange[0]} - ₹{priceRange[1]}</span>
                    </div>
                </FilterDropdown>
            </div>

            <div className="border-b border-[#ebebeb] pb-4">
                <FilterDropdown title="Color" defaultActive>
                    <ColorSelector colors={colors} />
                </FilterDropdown>
            </div>

            <div className="border-b border-[#ebebeb] pb-4">
                <FilterDropdown title="Size" defaultActive>
                    <SizeSelector sizes={sizes} />
                </FilterDropdown>
            </div>
            
            <div className="border-b border-[#ebebeb] pb-4">
                <FilterDropdown title="Brand" defaultActive>
                    <CheckboxGroup
                        options={[
                            { label: "Vikasa", count: 20 },
                            { label: "Zisace", count: 23 },
                        ]}
                    />
                </FilterDropdown>
            </div>
        </div >
    );
};

export default SidebarFilters;

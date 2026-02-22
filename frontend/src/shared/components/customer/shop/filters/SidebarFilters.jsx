import { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import CategoryList from "./CategoryList";
import CheckboxGroup from "./CheckboxGroup";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import { Slider } from "antd";
import { SITE_CURRENCY } from "../../../../constants";

const SidebarFilters = ({ onCategorySelect }) => {
    const [priceRange, setPriceRange] = useState([20, 1200]);

    const colors = ["#E1B768", "#E3A177", "#BEC7C7"];
    const sizes = ["XS", "S", "M", "L", "XL"];

    return (
        <div className="space-y-4 sticky top-0">
            <div className="border-b border-[#ebebeb] pb-4">
                <FilterDropdown title="Categories" defaultActive>
                    <CategoryList onCategorySelect={onCategorySelect} />
                </FilterDropdown>
            </div>

            <div className="border-b border-[#ebebeb] pb-4">
                <FilterDropdown title="Availability" defaultActive>
                    <CheckboxGroup
                        options={[
                            { label: "In Stock", count: 20 },
                            { label: "Out of Stock", count: 3 },
                            { label: "Made to Order", count: 5 },
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
                        <span className="!font-semibold text-black text-sm">Price:</span> <span className="text-sm text-[#ff6f61]">{SITE_CURRENCY}{priceRange[0]} - {SITE_CURRENCY}{priceRange[1]}</span>
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

            {/* <div className="border-b border-[#ebebeb] pb-4">
                <FilterDropdown title="Brand" defaultActive>
                    <CheckboxGroup
                        options={[
                            { label: "Vikasa", count: 20 },
                            { label: "Zisace", count: 23 },
                        ]}
                    />
                </FilterDropdown>
            </div> */}
        </div >
    );
};

export default SidebarFilters;

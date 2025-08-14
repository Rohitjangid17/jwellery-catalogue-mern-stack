import { Input } from "antd";

const CommonInput = ({ type = "text", placeholder, name, id= "", value, onChange }) => {
    return (
        <Input
            className="h-14 border border-[#ebebeb] text-[#000c] w-full px-4 py-2 rounded-full text-base leading-[25px] font-normal hover:border-[#000c] outline-none focus:outline-none focus:border-[#000c] transition-all duration-300 ease-in-out !shadow-none placeholder:[#6b7280] placeholder:font-medium placeholder:text-base"
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
        />
    );
};

export default CommonInput;
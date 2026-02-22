import { Input } from "antd";

const CommonInput = ({ type = "text", placeholder, name, id= "", value, onChange, 
    className
 }) => {
    return (
        <Input
            className={className}
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
const ColorSelector = ({ colors }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {colors.map((color, idx) => (
                <div
                    key={idx}
                    className="w-8 h-8 rounded-full border cursor-pointer"
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
    );
};

export default ColorSelector;

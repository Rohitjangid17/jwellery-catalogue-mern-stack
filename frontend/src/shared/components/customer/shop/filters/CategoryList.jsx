const categories = ["Men’s top", "Men", "Women", "Kid", "T-shirt"];

const CategoryList = () => {
    return (
        <ul className="space-y-[12px]">
            {categories.map((cat, i) => (
                <li key={i} className="cursor-pointer text-sm text-black hover:text-[#ff6f61] transition duration-300 ease-in-out">
                    {cat} (20)
                </li>
            ))}
        </ul>
    );
};

export default CategoryList;

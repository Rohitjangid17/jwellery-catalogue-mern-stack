import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoryCard = ({ category = {}, loading = false }) => {
    const title = category?.title || "Untitled Category";
    const image = category?.image || "/assets/images/category/default.jpg";

    return (
        <div className="flex flex-col gap-5 group">
            {loading ? (
                <Skeleton height={250} />
            ) :
                <div className="overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="mx-auto scale-100 group-hover:scale-105 transition-opacity duration-500 ease-in-out [transition:opacity_0.5s_ease,transform_2s_cubic-bezier(0,0,.44,1.18)]"
                    />
                </div>}

            {loading ? (
                <>
                    <Skeleton height={20} width="70%" />
                </>
            ) : (
                <>
                    <h2 className="uppercase text-[28px] font-normal tracking-tight text-black hover:text-[#ff6f61] transition-colors duration-300 flex items-center gap-1">
                        {title}
                        {/* <sup className="text-sm align-super">{count}</sup> */}
                    </h2>
                </>
            )}
        </div>
    );
};

export default CategoryCard;

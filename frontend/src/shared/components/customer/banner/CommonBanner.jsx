import { LuDot } from "react-icons/lu";
import { Link } from "react-router-dom";

const CommonBanner = ({ title }) => {
    return (
        <section className="py-16 px-4" style={{ backgroundImage: "url('/assets/images/banner/static-banner.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <div className="container mx-auto">
                <h1 className="text-center text-black text-4xl leading-[44px] font-medium tightest-[-0.02em]">{title}</h1>

                <div className="mt-6 flex items-center gap-2 justify-center text-center">
                    <Link to="/" className="text-[#757575]">Home</Link>
                    <LuDot className="text-[#757575]" size={20} />
                    <span className="text-black">{title}</span>
                </div>
            </div>
        </section>
    )
}

export default CommonBanner;
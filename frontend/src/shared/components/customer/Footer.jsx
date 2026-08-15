import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail, MdOutlineArrowRightAlt } from "react-icons/md"
import { LuArrowUpRight } from "react-icons/lu";
import SocialInfo from "./contact/SocialInfo";
import CommonInput from "./CommonInput";
import { Link } from "react-router-dom";
import { COMPANY_ADDRESS, COMPANY_LOGO, SITE_NAME, SUPPORT_EMAIL, SUPPORT_PHONE } from "../../constants";

const CustomerFooter = () => {
    const isAuthenticated = localStorage.getItem("admin_token");

    const paymentMethodList = [
        { id: 1, title: "EximBank", path: "/assets/images/EximBank.png" },
        { id: 2, title: "ApplePay", path: "/assets/images/ApplePay.png" },
        { id: 3, title: "DinersClub", path: "/assets/images/DinersClub.png" },
        { id: 4, title: "Discover", path: "/assets/images/Discover.png" },
        { id: 5, title: "GooglePay", path: "/assets/images/GooglePay.png" },
        { id: 6, title: "Mastercard-2", path: "/assets/images/Mastercard-2.png" },
        { id: 7, title: "Mastercard", path: "/assets/images/Mastercard.png" },
        { id: 8, title: "Shop", path: "/assets/images/Shop.png" },
        { id: 9, title: "UnionPay", path: "/assets/images/UnionPay.png" },
        { id: 10, title: "Visa", path: "/assets/images/Visa.png" },
    ]

    return (
        <footer className="bg-white pt-14">
            <div className="px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-5 md:gap-10">
                        <div className="col-span-12 md:col-span-4 lg:col-span-4">
                            <img src={COMPANY_LOGO} className="object-cover w-[100px] h-[50px]" alt="logo" />

                            <ul className="mt-8 flex flex-col gap-4">
                                <li className="flex items-center gap-[10px]">
                                    <span className="group bg-white hover:bg-[#ff6f61] border border-[#ebebeb] rounded-full p-2">
                                        <IoLocationOutline className="text-black group-hover:text-white" />
                                    </span>
                                    <span className="text-[#0d0d0d] text-base font-normal">{COMPANY_ADDRESS}</span>
                                </li>
                                <li className="flex items-center gap-[10px]">
                                    <span className="group bg-white hover:bg-[#ff6f61] border border-[#ebebeb] rounded-full p-2">
                                        <FiPhone className="text-black group-hover:text-white" />
                                    </span>
                                    <span className="text-[#0d0d0d] text-base font-normal">{SUPPORT_PHONE}</span>
                                </li>
                                <li className="flex items-center gap-[10px]">
                                    <span className="group bg-white hover:bg-[#ff6f61] border border-[#ebebeb] rounded-full p-2">
                                        <MdOutlineEmail className="text-black group-hover:text-white" />
                                    </span>
                                    <span className="text-[#0d0d0d] text-base font-normal">{SUPPORT_EMAIL}</span>
                                </li>
                            </ul>

                            {/* <a href="#" className="group text-[#444] text-center mt-6 text-sm font-normal flex items-center transition-all duration-300 ease-in-out">
                                <span className="border-b border-[#444] flex items-center gap-1">
                                    Get Direction <LuArrowUpRight />
                                </span>
                            </a>

                            <ul className="flex items-center gap-4 mt-8">
                                <SocialInfo />
                                <SocialInfo />
                                <SocialInfo />
                                <SocialInfo />
                            </ul> */}
                        </div>

                        <div className="col-span-12 md:col-span-4 lg:col-span-2">
                            <h2 className="mb-4 md:mb-6 text-[#0d0d0d] text-xl leading-[30px] font-medium">About Us</h2>
                            <ul className="flex flex-col gap-4">
                                <li>
                                    <Link to="/about" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">Contact Us</Link>
                                </li>
                                <li>
                                    <Link to="/our-story" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">Our Story</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-12 md:col-span-4 lg:col-span-2">
                            <h2 className="mb-4 md:mb-6 text-[#0d0d0d] text-xl leading-[30px] font-medium">Resource</h2>
                            <ul className="flex flex-col gap-4">
                                <li>
                                    <Link to="/privacy-policy" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">Privacy Policies</Link>
                                </li>
                                <li>
                                    <Link to="/term-and-condition" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">Terms & Conditions</Link>
                                </li>
                                <li>
                                    <Link to="/return-and-refund" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">Returns & Refunds</Link>
                                </li>
                                <li>
                                    <Link to="/faq" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">FAQ’s</Link>
                                </li>
                                <li>
                                    <Link to="/shipping" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">Shipping</Link>
                                </li>
                                <li>
                                    <Link to={isAuthenticated ? '/admin/dashboard' : '/auth/login'} className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">Go to Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <h2 className="mb-4 md:mb-6 text-[#0d0d0d] text-xl leading-[30px] font-medium">Subscribe Newsletter</h2>
                            <p className="text-[#545454] text-base font-normal mb-6">Subscribe to our newsletter to get the latest updates and offers.</p>
                            <form className="flex items-center gap-4">
                                <div className="flex-1 relative">
                                    <CommonInput type="email" placeholder="Email address" className="h-14 border border-[#ebebeb] text-[#000c] w-full px-4 py-2 rounded-full text-base leading-[25px] font-normal hover:border-[#000c] outline-none focus:outline-none focus:border-[#000c] transition-all duration-300 ease-in-out !shadow-none placeholder:[#6b7280] placeholder:font-medium placeholder:text-base" />
                                    <button className="absolute right-1 top-1/2 max-h-max bottom-0 transform -translate-y-1/2 bg-[#000000] text-white p-4 rounded-full text-base font-normal">
                                        <MdOutlineArrowRightAlt size={20} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#ebebeb] mt-7 md:mt-14 px-4 pb-20 md:py-8">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p>Copyright © 2025 by <b>{SITE_NAME}</b>. All Rights Reserved.</p>
                        <ul className="flex items-center gap-2">
                            {paymentMethodList.map(paymentMethod => (
                                <li className="max-w-[40px]" key={paymentMethod.id}>
                                    <img src={paymentMethod.path} loading="lazy" width="80" height="50" className="object-cover max-w-full h-auto" alt={paymentMethod.title} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default CustomerFooter;
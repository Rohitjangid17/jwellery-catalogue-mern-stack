import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail, MdOutlineArrowRightAlt } from "react-icons/md"
import { LuArrowUpRight } from "react-icons/lu";
import SocialInfo from "./contact/SocialInfo";
import CommonInput from "./CommonInput";
import { Link } from "react-router-dom";

const CustomerFooter = () => {
    return (
        <footer className="bg-white pt-14">
            <div className="px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-10">
                        <div className="col-span-12 md:col-span-4 lg:col-span-4">
                            <img src="/assets/images/logo.svg" className="object-cover" alt="logo" />

                            <ul className="mt-8 flex flex-col gap-4">
                                <li className="flex items-center gap-[10px]">
                                    <span className="group bg-white hover:bg-[#ff6f61] border border-[#ebebeb] rounded-full p-2">
                                        <IoLocationOutline className="text-black group-hover:text-white" />
                                    </span>
                                    <span className="text-[#0d0d0d] text-base font-normal">123 Yarran st, Punchbowl, NSW 2196, Australia</span>
                                </li>
                                <li className="flex items-center gap-[10px]">
                                    <span className="group bg-white hover:bg-[#ff6f61] border border-[#ebebeb] rounded-full p-2">
                                        <FiPhone className="text-black group-hover:text-white" />
                                    </span>
                                    <span className="text-[#0d0d0d] text-base font-normal">(+91) 9587683849</span>
                                </li>
                                <li className="flex items-center gap-[10px]">
                                    <span className="group bg-white hover:bg-[#ff6f61] border border-[#ebebeb] rounded-full p-2">
                                        <MdOutlineEmail className="text-black group-hover:text-white" />
                                    </span>
                                    <span className="text-[#0d0d0d] text-base font-normal">support@example.com</span>
                                </li>
                            </ul>

                            <a href="#" className="group text-[#444] text-center mt-6 text-sm font-normal flex items-center transition-all duration-300 ease-in-out">
                                <span className="border-b border-[#444] flex items-center gap-1">
                                    Get Direction <LuArrowUpRight />
                                </span>
                            </a>

                            <ul className="flex items-center gap-4 mt-8">
                                <SocialInfo />
                                <SocialInfo />
                                <SocialInfo />
                                <SocialInfo />
                            </ul>
                        </div>

                        <div className="col-span-12 md:col-span-4 lg:col-span-2">
                            <h2 className="mb-6 text-[#0d0d0d] text-xl leading-[30px] font-medium">About Us</h2>
                            <ul className="flex flex-col gap-4">
                                <li>
                                    <Link to="/about" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">Contact Us</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-[#545454] hover:text-[#ff6f61] text-base font-normal transition-all duration-300 ease-in-out">Our Story</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-12 md:col-span-4 lg:col-span-2">
                            <h2 className="mb-6 text-[#0d0d0d] text-xl leading-[30px] font-medium">Resource</h2>
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
                            </ul>
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <h2 className="mb-6 text-[#0d0d0d] text-xl leading-[30px] font-medium">Subscribe Newsletter</h2>
                            <p className="text-[#545454] text-base font-normal mb-6">Subscribe to our newsletter to get the latest updates and offers.</p>
                            <form className="flex items-center gap-4">
                                <div className="flex-1 relative">
                                    <CommonInput type="email" placeholder="Email address" />
                                    <button className="absolute right-1 top-1/2 max-h-max bottom-0 transform -translate-y-1/2 bg-[#000000] text-white p-4 rounded-full text-base font-normal">
                                        <MdOutlineArrowRightAlt size={20} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#ebebeb] mt-14 px-4 py-8">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p>Copyright © 2025 by Vineta. All Rights Reserved.</p>
                        <ul className="flex items-center gap-2">
                            <li>
                                <img src="/assets/images/gpay.png" className="object-cover w-12 h-auto" alt="gpay" />
                            </li>
                            <li>
                                <img src="/assets/images/gpay.png" className="object-cover w-12 h-auto" alt="gpay" />
                            </li>
                            <li>
                                <img src="/assets/images/gpay.png" className="object-cover w-12 h-auto" alt="gpay" />
                            </li>
                            <li>
                                <img src="/assets/images/gpay.png" className="object-cover w-12 h-auto" alt="gpay" />
                            </li>
                            <li>
                                <img src="/assets/images/gpay.png" className="object-cover w-12 h-auto" alt="gpay" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default CustomerFooter;
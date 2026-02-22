import { Button } from "antd";
import CommonInput from "../CommonInput";
import ContactInfo from "./ContactInfo";
import SocialInfo from "./SocialInfo";
import { COMPANY_ADDRESS, SUPPORT_EMAIL, SUPPORT_PHONE } from "../../../constants";

const Contact = () => {
    const handleChange = (e) => {
        // Handle input change logic here       
        console.log(e.target.value);
    };

    return (
        <section className="py-8 sm:py-12 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10">
                    <div className="flex flex-col gap-4 md:gap-8">
                        <h2 className="text-2xl md:text-3xl lg:text-[32px] text-black font-medium leading-snug">Contact Us</h2>
                        <p className="text-[#545454] text-base">Have a question? Please contact us using the customer support channels below.</p>
                        <ul className="list-none flex flex-col gap-[10px]">
                            <ContactInfo label="Address:" value={COMPANY_ADDRESS} />
                            <ContactInfo label="Phone number:" value={SUPPORT_PHONE} />
                            <ContactInfo label="Email:" value={SUPPORT_EMAIL} />
                            <ContactInfo label="Open:" value="8am - 7pm, Mon - Sat" />
                        </ul>

                        {/* <ul className="flex items-center gap-4">
                            <SocialInfo />
                            <SocialInfo />
                            <SocialInfo />
                            <SocialInfo />
                        </ul> */}
                    </div>

                    <div className="flex flex-col gap-4 md:gap-8">
                        <h2 className="text-2xl md:text-3xl lg:text-[32px] text-black font-medium leading-snug">Get In Touch</h2>
                        <p className="text-[#545454] text-base">Please submit all general enquiries in the contact form below and we look forward to hearing from you soon.</p>
                        <form className="grid grid-cols-12 gap-4" action="">
                            <div className="col-span-12 md:col-span-6">
                                <label className="text-black text-base font-normal mb-[10px] block" htmlFor="name">Name *</label>
                                <CommonInput
                                    name="name"
                                    id="name"
                                    placeholder="Enter name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="text-black text-base font-normal mb-[10px] block" htmlFor="email">Email *</label>
                                <CommonInput
                                    name="email"
                                    id="email"
                                    placeholder="Enter email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="text-black text-base font-normal mb-[10px] block" htmlFor="phone">Phone Number *</label>
                                <CommonInput
                                    name="phone"
                                    id="phone"
                                    placeholder="Enter phone number"
                                    type="tel"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="text-black text-base font-normal mb-[10px] block" htmlFor="subject">Subject *</label>
                                <CommonInput
                                    name="subject"
                                    id="subject"
                                    placeholder="Enter subject"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-12">
                                <label className="text-black text-base font-normal mb-[10px] block" htmlFor="message">Message *</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    placeholder="Enter message"
                                    onChange={handleChange}
                                    className="w-full border border-[#ebebeb] px-4 py-3 rounded-lg text-base font-normal text-[#545454] outline-none focus:border-[#000c] transition-all duration-300 resize-none"
                                />
                            </div>
                            <div className="col-span-12">
                                <Button type="submit" size="large" className="bg-black text-white rounded-lg w-full text-center">Send</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;
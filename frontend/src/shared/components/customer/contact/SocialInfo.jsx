import { IoLocationOutline } from "react-icons/io5";

const SocialInfo = () => {
    return (
        <li className="flex items-center gap-[10px]">
            <a href="/" className="group bg-white hover:bg-[#ff6f61] border border-[#ebebeb] rounded-full p-2">
                <IoLocationOutline className="text-black group-hover:text-white" />
            </a>
        </li>
    )
}

export default SocialInfo;
const ContactInfo = ({ label, value }) => {
    return (
        <li>
            <span className="text-black text-base font-medium">{label}</span>
            <span className="text-[#545454] text-base font-normal">{" "}{value}</span>
        </li>
    )
}

export default ContactInfo
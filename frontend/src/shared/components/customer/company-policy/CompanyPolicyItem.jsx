const CompanyPolicyItem = ({ title, descriptions }) => {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl text-black font-medium">{title}</h2>
            {descriptions.map((description, index) => (
                <p className="text-black text-base font-normal" key={index}>{description}</p>
            ))}
        </div>
    )
}

export default CompanyPolicyItem;
import { useEffect } from "react";
import CompanyPolicyItem from "./CompanyPolicyItem";

const CompanyPolicy = ({ policies }) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [policies]);

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col gap-8">
                    {policies.map(policy => (
                        <CompanyPolicyItem key={policy.id} title={policy.title} descriptions={policy.descriptions} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CompanyPolicy;
import CommonBanner from "../../shared/components/customer/banner/CommonBanner";
import CompanyPolicy from "../../shared/components/customer/company-policy/CompanyPolicy";

const policies = [
    {
        id: 1,
        title: "1. Information We Collect",
        descriptions: [
            "We collect personally identifiable information such as your full name, email address, contact number, delivery address, billing address, and payment information when you register, place orders, or interact with our services.",
            "We also gather non-personally identifiable information like your device type, IP address, browser version, pages visited, and session duration to understand user behavior and improve website performance.",
            "By using our services, you agree to the collection and use of this data to fulfill contractual and legal obligations."
        ]
    },
    {
        id: 2,
        title: "2. How We Use Your Information",
        descriptions: [
            "We use your personal data to process transactions, deliver orders, send order-related updates, and offer customer support. This helps ensure smooth order fulfillment and efficient service.",
            "We also use data for analytics, personalization of content, targeted marketing (if opted in), fraud prevention, and compliance with applicable laws.",
            "User preferences and behavioral trends help us optimize the user interface and enhance overall customer experience."
        ]
    },
    {
        id: 3,
        title: "3. Sharing Your Personal Information",
        descriptions: [
            "We may share your data with third-party logistics partners, payment gateways, and customer service tools, solely to complete your transaction or resolve queries. All vendors are contractually required to maintain data security and confidentiality.",
            "In legal scenarios, your information may be disclosed to law enforcement or regulatory bodies as per jurisdictional mandates.",
            "We do not sell or rent your personal information to any third party for marketing or any other commercial purposes."
        ]
    },
    {
        id: 4,
        title: "4. Data Retention",
        descriptions: [
            "Your personal information is retained for as long as your account is active or as needed to provide you services. We may also retain certain information for legal, tax, or regulatory compliance.",
            "Once your information is no longer required, it is securely deleted, anonymized, or stored in an encrypted archive in accordance with applicable data protection laws."
        ]
    },
    {
        id: 5,
        title: "5. Your Rights",
        descriptions: [
            "You have the right to access, correct, or delete your personal data stored with us. You can also request to restrict or object to certain data processing activities.",
            "Users can unsubscribe from promotional communications at any time by clicking the unsubscribe link or contacting support directly.",
            "We respect your privacy preferences and aim to respond to all data requests within 30 days."
        ]
    },
    {
        id: 6,
        title: "6. Changes to This Policy",
        descriptions: [
            "This Privacy Policy may be updated periodically to reflect changes in technology, laws, or business operations. When we do, we’ll revise the 'Effective Date' at the top of the document.",
            "We encourage users to check this page regularly for updates. Continued use of the website after updates constitutes acceptance of the revised policy."
        ]
    },
    {
        id: 7,
        title: "7. Contact Us",
        descriptions: [
            "If you have any questions, concerns, or complaints about our privacy practices or your data, please contact our Data Protection Officer at support@example.com.",
            "We are committed to ensuring the security of your personal data and will take appropriate measures to address your queries."
        ]
    }
]

const PrivacyPolicy = () => {
    return (
        <>
            <CommonBanner title="Privacy Policy" />
            <CompanyPolicy policies={policies} />
        </>
    )
}

export default PrivacyPolicy;
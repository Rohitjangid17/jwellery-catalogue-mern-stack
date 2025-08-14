import CommonBanner from "../../shared/components/customer/banner/CommonBanner";
import CompanyPolicy from "../../shared/components/customer/company-policy/CompanyPolicy";

const policies = [
    {
        id: 1,
        title: "1. Acceptance of Terms",
        descriptions: [
            "By accessing or using our website and services, you agree to comply with and be legally bound by these Terms and Conditions, as well as all applicable local, national, and international laws and regulations. Your continued use of the platform signifies your acceptance of any updates or changes to these terms.",
            "If you do not agree with any provision of these Terms, your sole remedy is to discontinue use of the website and its services immediately. These Terms create a legally binding agreement between you and our company regarding the use of this platform."
        ]
    },
    {
        id: 2,
        title: "2. Use of the Website",
        descriptions: [
            "You are permitted to access and use our website for personal, non-commercial purposes only. Any misuse of the platform, such as attempts to gain unauthorized access, distribute malware, or engage in fraudulent activities, is strictly prohibited and may lead to termination of access or legal action.",
            "You agree not to use the website in any way that causes or may cause damage to the website or impairs the availability or accessibility of the website. We reserve the right to suspend or terminate your access if we detect suspicious or harmful activities."
        ]
    },
    {
        id: 3,
        title: "3. User Accounts",
        descriptions: [
            "To access features like placing orders, viewing order history, or tracking shipments, you may be required to create an account by providing accurate and complete information. Any incorrect or misleading information may result in suspension or permanent deletion of your account.",
            "You are solely responsible for maintaining the confidentiality of your login credentials. Any actions taken under your account will be deemed your responsibility. In case of a suspected breach, notify our support team immediately."
        ]
    },
    {
        id: 4,
        title: "4. Intellectual Property",
        descriptions: [
            "All content available on the site—including but not limited to images, videos, code, logos, trademarks, and written material—is owned or licensed by us and is protected by national and international intellectual property laws.",
            "You may not use, copy, reproduce, republish, upload, transmit, or distribute any content from the site without prior written consent. Violations may result in civil and/or criminal liabilities."
        ]
    },
    {
        id: 5,
        title: "5. Pricing and Availability",
        descriptions: [
            "All prices are listed in INR and are subject to change without prior notice. We strive to maintain up-to-date and accurate information about product pricing and stock availability but do not guarantee it at all times.",
            "In case of pricing errors, we reserve the right to cancel or adjust any affected orders and notify you accordingly. Product availability may also vary depending on supply chains and demand."
        ]
    },
    {
        id: 6,
        title: "6. Limitation of Liability",
        descriptions: [
            "We are not liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use the website, including but not limited to lost profits, data loss, or interruptions.",
            "Our total liability, under any circumstances, shall not exceed the amount you paid to us in the 30 days preceding the claim. You agree to use the website at your own risk."
        ]
    },
    {
        id: 7,
        title: "7. Third-Party Links",
        descriptions: [
            "Our website may include links to third-party websites for your convenience. These websites are not operated or controlled by us, and we are not responsible for their content, terms, or privacy practices.",
            "We advise users to read the privacy and terms policies of any third-party sites they visit. Any interactions with third-party platforms are solely between you and that provider."
        ]
    },
    {
        id: 8,
        title: "8. Changes to Terms",
        descriptions: [
            "We reserve the right to modify these Terms and Conditions at any time without prior notice. The most recent version will be posted on this page, with the effective date noted at the top.",
            "It is your responsibility to review the Terms periodically. Continued use of our website after any updates implies your acceptance of those changes."
        ]
    },
    {
        id: 9,
        title: "9. Governing Law",
        descriptions: [
            "These Terms shall be governed and interpreted in accordance with the laws of India. Any disputes arising out of or relating to these Terms will be resolved exclusively in the courts of Jaipur, Rajasthan.",
            "You hereby consent to the exclusive jurisdiction and venue of courts in Jaipur for any such legal proceedings."
        ]
    },
    {
        id: 10,
        title: "10. Contact Information",
        descriptions: [
            "For any questions regarding these Terms and Conditions or any other legal concerns, please contact us at support@example.com or reach out through our official communication channels."
        ]
    }
]

const TermCondition = () => {
    return (
        <>
            <CommonBanner title="Terms & Condition" />

            <CompanyPolicy policies={policies} />
        </>
    )
}

export default TermCondition;
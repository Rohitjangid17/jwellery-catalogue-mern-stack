import CommonBanner from "../../shared/components/customer/banner/CommonBanner";
import CompanyPolicy from "../../shared/components/customer/company-policy/CompanyPolicy";

const policies = [
    {
        id: 1,
        title: "1. Return Eligibility",
        descriptions: [
            "You may return most new, unopened items within 7 calendar days of delivery for a full refund, provided the item is in its original condition, including packaging, labels, and accompanying accessories. Items must not show signs of wear, use, or damage.",
            "Items excluded from returns include perishable goods (like food or flowers), personal care items (such as cosmetics or undergarments), digital downloads, and customized/personalized products."
        ]
    },
    {
        id: 2,
        title: "2. Refund Process",
        descriptions: [
            "Once we receive your return, our quality assurance team will inspect it. If your return meets our eligibility criteria, your refund will be initiated within 5–7 business days. You will be notified via email about the status.",
            "Refunds are processed through the original payment method. If there are delays beyond our control (e.g., bank processing issues), we are not responsible for the time taken by third parties."
        ]
    },
    {
        id: 3,
        title: "3. Exchange Policy",
        descriptions: [
            "We accept exchanges for items that are defective, damaged in transit, or different from what you ordered. Requests must be raised within 48 hours of receiving the product and must include photographic evidence.",
            "After inspection, if your exchange is approved, we will ship the replacement product free of charge. If the item is out of stock, a full refund will be issued."
        ]
    },
    {
        id: 4,
        title: "4. Return Shipping",
        descriptions: [
            "Unless the return is due to our fault (wrong, damaged, or defective item), return shipping costs are the customer’s responsibility. We do not offer reverse pickups in all regions, so customers may be required to send items to our warehouse directly.",
            "We recommend using a reputable courier and ensuring the shipment is trackable. We are not responsible for items lost during return transit."
        ]
    },
    {
        id: 5,
        title: "5. Cancellations",
        descriptions: [
            "Order cancellations are only possible before the order has been dispatched. Once shipped, cancellations are not allowed and the standard return process must be followed.",
            "If an order is canceled in time, the full amount will be refunded to the original payment method within 3–5 business days. For prepaid orders, refunds may take longer due to bank timelines."
        ]
    },
    {
        id: 6,
        title: "6. Contact Us",
        descriptions: [
            "For return, refund, exchange, or cancellation assistance, please reach out to our customer support team at support@example.com or via our Contact Us page. Our support team is available Monday to Saturday, 10 AM to 6 PM IST.",
            "We aim to resolve all issues fairly and transparently and value your satisfaction as our top priority."
        ]
    }
]

const ReturnRefund = () => {
    return (
        <>
            <CommonBanner title="Return & Refund" />

            <CompanyPolicy policies={policies} />
        </>
    )
}

export default ReturnRefund;
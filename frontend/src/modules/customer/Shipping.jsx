import CommonBanner from "../../shared/components/customer/banner/CommonBanner";
import CompanyPolicy from "../../shared/components/customer/company-policy/CompanyPolicy";

const policies = [
    {
        id: 1,
        title: "1. Shipping Methods & Carriers",
        descriptions: [
            "We are committed to delivering your orders quickly and efficiently. To achieve this, we work with a network of trusted shipping partners including BlueDart, Delhivery, DTDC, Ecom Express, and India Post, depending on your location and the nature of the product.",
            "Customers may not choose a specific courier partner at checkout, as our system automatically selects the most efficient option based on serviceability, speed, and reliability."
        ]
    },
    {
        id: 2,
        title: "2. Order Processing Time",
        descriptions: [
            "All orders are processed within 1 to 2 business days (Monday to Saturday). Orders placed after 5:00 PM IST or on Sundays/public holidays will be processed the following working day.",
            "Once processed, you will receive an order confirmation email followed by a shipping confirmation email with a tracking ID once your item has been dispatched."
        ]
    },
    {
        id: 3,
        title: "3. Estimated Delivery Time",
        descriptions: [
            "Delivery timelines vary based on your location:",
            "Metro Cities: 2–4 business days",
            "Tier 2 and Tier 3 Cities: 3–6 business days",
            "Remote or Rural Areas: 5–9 business days",
            "Please note that delivery timelines are estimates and may vary due to factors beyond our control, such as weather, natural disasters, political disruptions, or courier delays."
        ]
    },
    {
        id: 4,
        title: "4. Shipping Charges",
        descriptions: [
            "We offer free standard shipping on orders above ₹999 across India.",
            "For orders below ₹999, a nominal shipping charge of ₹49 will be applied at checkout.",
            "Additional surcharges may apply for heavy or oversized items. If applicable, these charges will be clearly mentioned on the product page and during checkout."
        ]
    },
    {
        id: 5,
        title: "5. Cash on Delivery (COD)",
        descriptions: [
            "Cash on Delivery is available for select pin codes within India. We charge an additional fee of ₹50 for COD orders to cover handling costs.",
            "COD is not available for customized products, bulk orders, or international shipments."
        ]
    },
    {
        id: 6,
        title: "6. Shipment Tracking",
        descriptions: [
            "Once your order is shipped, we will send you an email and/or SMS with the tracking number and courier partner details. You can use this information to monitor the status of your shipment in real-time.",
            "You can also visit the Track Order section on our website and enter your order number and email or mobile to get updates instantly."
        ]
    },
    {
        id: 7,
        title: "7. Delivery Attempts and Address Issues",
        descriptions: [
            "Our courier partners will attempt delivery up to three times. If the delivery fails after these attempts due to reasons such as an incorrect address, unavailability of the recipient, or refusal to accept the parcel, the shipment will be returned to us.",
            "If the package is returned due to an error in the shipping address or failure to accept, the customer will be responsible for the re-shipping cost."
        ]
    },
    {
        id: 8,
        title: "8. Undelivered or Delayed Orders",
        descriptions: [
            "In rare situations where an order is delayed beyond the promised delivery date, our support team will proactively reach out to you. You may also raise a support request via email or our helpdesk.",
            "If your package is lost in transit or delivered to the wrong address due to courier error, we will either re-ship the item or provide a full refund after proper investigation with the logistics partner."
        ]
    },
    {
        id: 9,
        title: "9. Shipping During Sales or Holidays",
        descriptions: [
            "During peak periods such as Diwali, Christmas, Independence Day sales, or mega clearance events, you may experience delays in both processing and shipping times due to high order volume.",
            "We appreciate your patience during such times and assure you that we are working diligently with our partners to deliver orders as fast as possible."
        ]
    },
    {
        id: 10,
        title: "10. International Shipping",
        descriptions: [
            "Currently, we do not offer international shipping. All orders placed through our website are delivered only within India.",
            "We are working toward expanding our delivery network globally in the near future. Please stay tuned for updates or contact our support team for specific international requests."
        ]
    },
    {
        id: 11,
        title: "11. Contact and Support",
        descriptions: [
            "If you have any questions, delivery concerns, or issues related to shipping, feel free to contact our customer support team at support@example.com or call us at +91-XXXXXXXXXX.",
            "Our support hours are Monday to Saturday, 10:00 AM to 6:00 PM IST. We are always happy to help and ensure you have a smooth shopping experience."
        ]
    }
]

const Shipping = () => {
    return (
        <>
            <CommonBanner title="Shipping" />

            <CompanyPolicy policies={policies} />
        </>
    )
}

export default Shipping;
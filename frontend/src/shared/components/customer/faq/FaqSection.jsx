import { Collapse } from 'antd';
import { FiChevronDown } from 'react-icons/fi';
import { useEffect } from 'react';

const { Panel } = Collapse;

const faqData = [
    {
        category: 'Shopping Information',
        questions: [
            {
                q: 'How long will it take for my order to ship?',
                a: 'Orders are processed within 1–2 business days and delivered within 3–7 days based on your location.'
            },
            {
                q: 'Do you offer free shipping?',
                a: 'Yes, we offer free shipping on orders above ₹999. Below that, a nominal fee is charged.'
            },
            {
                q: 'Can I change my shipping address after placing an order?',
                a: 'Yes, you can request an address change before the order is shipped by contacting our support.'
            },
            {
                q: 'What if my package is delayed or lost?',
                a: 'If your package is delayed or lost, please contact support. We will resolve it by reshipping or refunding.'
            }
        ]
    },
    {
        category: 'Payment Information',
        questions: [
            {
                q: 'What payment methods do you accept?',
                a: 'We accept UPI, credit/debit cards, net banking, and cash on delivery (for selected areas).'
            },
            {
                q: 'Is my payment information secure?',
                a: 'Yes, we use encrypted and PCI-compliant gateways to ensure complete payment security.'
            },
            {
                q: 'Can I pay using international cards?',
                a: 'Currently, we accept Indian-issued cards and UPI. International payments are not supported.'
            }
        ]
    }
];

const FaqSection = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                {faqData.map((section, index) => (
                    <div key={index} className="mb-10">
                        <h3 className="text-2xl font-semibold mb-4">{section.category}</h3>
                        <Collapse 
                            accordion
                            expandIconPosition="end"
                            className="!bg-white !border-none"
                            expandIcon={({ isActive }) => (
                                <FiChevronDown size={16}
                                    className={`!text-black transition-transform duration-200 ${isActive ? 'rotate-180' : ''
                                        }`}
                                />
                            )}
                        >
                            {section.questions.map((item, idx) => (
                                <Panel
                                    header={item.q}
                                    key={idx}
                                    className="!text-black !text-base !px-0 font-medium [&_.ant-collapse-content]:!border-t-0 [&_.ant-collapse-content]:!border-b [&_.ant-collapse-content]:!border-[#e5e7eb]"
                                >
                                    <p className="text-black text-sm font-normal">{item.a}</p>
                                </Panel>

                            ))}
                        </Collapse>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FaqSection;

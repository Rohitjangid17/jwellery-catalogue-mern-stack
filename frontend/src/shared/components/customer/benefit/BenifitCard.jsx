import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const BenifitCard = ({ icon, title, description }) => {
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="border border-solid border-[#ebebeb] p-5 flex flex-col justify-center items-center gap-6"
        >
            {icon}
            <div className="flex flex-col gap-4">
                <h2 className="text-xl leading-[20px] font-medium uppercase text-center">{title}</h2>
                <p className="text-center text-sm">{description}</p>
            </div>
        </motion.div>
    )
}

export default BenifitCard;

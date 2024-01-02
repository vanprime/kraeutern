import { container, item } from "@/lib/animationProps";
import { motion } from 'framer-motion';
import { MailCheck } from "lucide-react";


const SubscriptionHint = () => {
    return (
        <motion.div className="grid gap-2 w-full" variants={container} initial="hidden" animate="show">
            <motion.div className="flex items-center text-2xl border-b-2" variants={item}>
                <MailCheck className="mr-[1ch]" />
                <h1> Success </h1>
            </motion.div>
            <motion.div className="text-slate-500" variants={item}>
                <p>Check your inbox and spam folder of for an email from <em>Der Kanzler</em>.</p>
                <br />
                <p>Follow the Link to log in and create the Game. You can share the Game ID with your teams to have them buzzer.</p>
            </motion.div>
        </motion.div>
    );
};

export default SubscriptionHint;